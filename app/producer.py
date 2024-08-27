import pymqi
import config.mq_config as config

def send_message(message):
    conn_info = f"{config.MQ_HOST}({config.MQ_PORT})"

    # Configurando o descritor de canal
    cd = pymqi.CD()
    cd.ChannelName = config.MQ_CHANNEL.encode('utf-8')
    cd.ConnectionName = conn_info.encode('utf-8')
    cd.ChannelType = pymqi.CMQC.MQCHT_CLNTCONN
    cd.TransportType = pymqi.CMQC.MQXPT_TCP

    # Debug: Verificando os valores de usuário e senha
    print(f"MQ_USER: {config.MQ_USER}, Tipo: {type(config.MQ_USER)}")
    print(f"MQ_PASSWORD: {config.MQ_PASSWORD}, Tipo: {type(config.MQ_PASSWORD)}")

    try:
        # Conectando ao Queue Manager
        qmgr = pymqi.QueueManager(None)
        qmgr.connectTCPClient(config.MQ_QMGR, cd, conn_info, bytes(config.MQ_USER, 'utf-8'), bytes(config.MQ_PASSWORD, 'utf-8'))

        # Enviando a mensagem
        queue = pymqi.Queue(qmgr, config.MQ_QUEUE)
        queue.put(message)
        print(f"Message sent: {message}")

        queue.close()
        qmgr.disconnect()
    except Exception as e:
        print(f"An error occurred during MQ connection: {e}")

# Se a conexão sem autenticação for uma opção, comente a linha acima e descomente esta:
# qmgr.connectTCPClient(config.MQ_QMGR, cd, conn_info)

