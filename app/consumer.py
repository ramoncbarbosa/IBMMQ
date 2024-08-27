import pymqi
import config.mq_config as config

def receive_message():
    # Conexão com o Queue Manager
    qmgr = pymqi.QueueManager(None)
    qmgr.connectTCPClient(config.MQ_QMGR, pymqi.cd(), {
        pymqi.CMQCFC.MQCA_HOST_NAME: config.MQ_HOST,
        pymqi.CMQCFC.MQIA_PORT_NUMBER: config.MQ_PORT,
        pymqi.CMQCFC.MQCA_CHANNEL_NAME: config.MQ_CHANNEL,
        pymqi.CMQCFC.MQCACH_USER_ID: config.MQ_USER,
        pymqi.CMQCFC.MQCACH_PASSWORD: config.MQ_PASSWORD,
    })
    
    # Abertura da fila para receber a mensagem
    queue = pymqi.Queue(qmgr, config.MQ_QUEUE)
    message = queue.get()
    print(f"Message received: {message}")
    
    # Fechamento da fila e desconexão do Queue Manager
    queue.close()
    qmgr.disconnect()
    
    return message
