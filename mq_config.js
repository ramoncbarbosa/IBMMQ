import { MQC, MQCNO, MQCD, MQCSP } from 'ibmmq';

const config = {
  qMgr: 'fila',               // Nome do Queue Manager
  qName: 'filaLocal',         // Nome da Fila
  channelName: 'servidorLocal',  // Nome do Canal de Conexão do Servidor
  connName: 'localhost(1414)' // Nome do Host e Porta
};

export { config, MQC, MQCNO, MQCD, MQCSP };
