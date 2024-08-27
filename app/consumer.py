import pymqi
import config.mq_config as config


def receive_message():
    conn_info = f"{config.MQ_HOST}({config.MQ_PORT})"

    # Configurando o descritor de canal
    cd = pymqi.CD()
    cd.ChannelName = config.MQ_CHANNEL.encode('utf-8')
    cd.ConnectionName = conn_info.encode('utf-8')
    cd.ChannelType = pymqi.CMQC.MQCHT_CLNTCONN
    cd.TransportType = pymqi.CMQC.MQXPT_TCP

    # Conectando ao Queue Manager sem CSP
    qmgr = pymqi.QueueManager(None)
    qmgr.connectTCPClient(config.MQ_QMGR, cd, conn_info, config.MQ_USER.encode('utf-8'),
                          config.MQ_PASSWORD.encode('utf-8'))

    # Recebendo a mensagem
    queue = pymqi.Queue(qmgr, config.MQ_QUEUE)
    message = queue.get()
    print(f"Message received: {message}")

    queue.close()
    qmgr.disconnect()

    return message
