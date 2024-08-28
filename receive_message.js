const ibmmq = require('ibmmq');
const MQC = ibmmq.MQC; // Import MQ constants

const config = {
  qMgr: 'fila',               // Nome do Queue Manager
  qName: 'filaLocal',         // Nome da Fila
  channelName: 'servidorLocal',  // Nome do Canal de Conexão do Servidor
  connName: 'localhost(1414)' // Nome do Host e Porta
};

const cno = new ibmmq.MQCNO();
const cd = new ibmmq.MQCD();
cd.ConnectionName = config.connName;
cd.ChannelName = config.channelName;

cno.ClientConn = cd;

function getMessage() {
  ibmmq.Connx(config.qMgr, cno, (err, hConn) => {
    if (err) {
      console.error('Error in connection:', err);
    } else {
      console.log('Connected to MQ');
      const od = new ibmmq.MQOD();
      od.ObjectName = config.qName;
      od.ObjectType = MQC.MQOT_Q;

      ibmmq.Open(hConn, od, MQC.MQOO_INPUT_AS_Q_DEF, (err, hObj) => {
        if (err) {
          console.error('Error in opening queue:', err);
        } else {
          const mqmd = new ibmmq.MQMD();
          const gmo = new ibmmq.MQGMO();
          gmo.Options = MQC.MQGMO_NO_WAIT | MQC.MQGMO_CONVERT;
          gmo.WaitInterval = 3 * 1000; // Wait for 3 seconds

          // Aqui definimos um buffer onde a mensagem será armazenada
          const buf = Buffer.alloc(1024);

          ibmmq.GetSync(hObj, mqmd, gmo, buf, (err, len) => {
            if (err) {
              if (err.mqrc == MQC.MQRC_NO_MSG_AVAILABLE) {
                console.log('No more messages available.');
              } else {
                console.error('Error in getting message:', err);
              }
            } else {
              console.log('Received message: ', buf.toString('utf8', 0, len));
            }
            ibmmq.Close(hObj, 0, (err) => {
              if (err) console.error('Error in closing queue:', err);
              ibmmq.Disc(hConn, (err) => {
                if (err) console.error('Error in disconnecting:', err);
              });
            });
          });
        }
      });
    }
  });
}

getMessage();
