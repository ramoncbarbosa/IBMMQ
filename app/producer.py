import pymqi
import config.mq_config as config

def send_message(message):
    # Conexão com o Queue Manager
    qmgr = pymqi.QueueManager(None)
    qmgr.connectTCPClient(config.MQ_QMGR, pymqi.cd(), {
        pymqi.CMQCFC.MQCA_HOST_NAME: config.MQ_HOST,
        pymqi.CMQCFC.MQIA_PORT_NUMBER: config.MQ_PORT,
        pymqi.CMQCFC.MQCA_CHANNEL_NAME: config.MQ_CHANNEL,
        pymqi.CMQCFC.MQCACH_USER_ID: config.MQ_USER,
        pymqi.CMQCFC.MQCACH_PASSWORD: config.MQ_PASSWORD,
    })
    
    # Abrindo a fila para enviar a mensagem
    queue = pymqi.Queue(qmgr, config.MQ_QUEUE)
    queue.put(message)
    print(f"Message sent: {message}")
    
    # Fechando a fila e desconectando do Queue Manager
    queue.close()
    qmgr.disconnect()
