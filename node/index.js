const mq = require('ibmmq');

// Configurações do IBM MQ
const MQC = mq.MQC; // Constantes do MQ

const queueManager = 'YOUR_QUEUE_MANAGER';
const queueName = 'YOUR_QUEUE_NAME';
const channel = 'YOUR_CHANNEL';
const host = 'YOUR_HOST';
const port = 'YOUR_PORT';
const user = 'YOUR_USERNAME';
const password = 'YOUR_PASSWORD';

// Configuração da Conexão
const cno = new mq.MQCNO();
const cd = new mq.MQCD();

cd.ChannelName = channel;
cd.ConnectionName = `${host}(${port})`;

cno.ClientConn = cd;
cno.Options = MQC.MQCNO_CLIENT_BINDING;

if (user && password) {
  const csp = new mq.MQCSP();
  csp.UserId = user;
  csp.Password = password;
  cno.SecurityParms = csp;
}

// Conectar ao Queue Manager
mq.Connx(queueManager, cno, (err, hConn) => {
  if (err) {
    console.error('Erro ao conectar ao MQ:', err);
  } else {
    console.log('Conectado ao Queue Manager');

    // Abrir a Fila
    const od = new mq.MQOD();
    od.ObjectName = queueName;
    od.ObjectType = MQC.MQOT_Q;

    const openOptions = MQC.MQOO_OUTPUT | MQC.MQOO_INPUT_AS_Q_DEF;

    mq.Open(hConn, od, openOptions, (err, hObj) => {
      if (err) {
        console.error('Erro ao abrir a fila:', err);
      } else {
        console.log('Fila aberta com sucesso');

        // Enviar uma Mensagem
        const msg = 'Hello, IBM MQ!';
        const mqmd = new mq.MQMD(); // MQ Message Descriptor
        const pmo = new mq.MQPMO(); // MQ Put Message Options

        mq.Put(hObj, mqmd, pmo, msg, (err) => {
          if (err) {
            console.error('Erro ao enviar a mensagem:', err);
          } else {
            console.log('Mensagem enviada com sucesso');
          }

          // Fechar a Fila
          mq.Close(hObj, 0, (err) => {
            if (err) {
              console.error('Erro ao fechar a fila:', err);
            } else {
              console.log('Fila fechada com sucesso');
            }

            // Desconectar do Queue Manager
            mq.Disc(hConn, (err) => {
              if (err) {
                console.error('Erro ao desconectar:', err);
              } else {
                console.log('Desconectado do Queue Manager');
              }
            });
          });
        });
      }
    });
  }
});
