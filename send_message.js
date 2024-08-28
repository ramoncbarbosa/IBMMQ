const ibmmq = require('ibmmq');
const readline = require('readline');

const config = {
  qMgr: 'fila',
  qName: 'filaLocal',
  channelName: 'servidorLocal',
  connName: 'localhost(1414)'
};

const MQC = ibmmq.MQC;

const cno = new ibmmq.MQCNO();
const cd = new ibmmq.MQCD();
cd.ChannelName = config.channelName;
cd.ConnectionName = config.connName;
cd.TransportType = MQC.MQXPT_TCP;

cno.ClientConn = cd;

const csp = new ibmmq.MQCSP();
csp.UserId = 'ramon'; 
csp.Password = ''; 
cno.SecurityParms = csp;

function sendMessage(message) {
  ibmmq.Connx(config.qMgr, cno, (err, hConn) => {
    if (err) {
      console.error('Error in connection:', err);
    } else {
      console.log('Connected to MQ');
      const od = new ibmmq.MQOD();
      od.ObjectName = config.qName;
      od.ObjectType = MQC.MQOT_Q;

      ibmmq.Open(hConn, od, MQC.MQOO_OUTPUT, (err, hObj) => {
        if (err) {
          console.error('Error in opening queue:', err);
        } else {
          const mqmd = new ibmmq.MQMD();
          const pmo = new ibmmq.MQPMO();

          ibmmq.Put(hObj, mqmd, pmo, message, (err) => {
            if (err) {
              console.error('Error in putting message:', err);
            } else {
              console.log('Message successfully sent:', message);
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite a mensagem para enviar: ', (message) => {
  sendMessage(message);
  rl.close();
});
