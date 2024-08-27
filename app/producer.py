import ibm_boto3
import config.mq_config as config
from ibm_boto3 import MQClient

def send_message(message):
    client = MQClient(
        host=config.MQ_HOST,
        port=config.MQ_PORT,
        channel=config.MQ_CHANNEL,
        queue_manager=config.MQ_QMGR,
        queue=config.MQ_QUEUE,
        user=config.MQ_USER,
        password=config.MQ_PASSWORD
    )
    client.send(message)
    print(f"Message sent: {message}")
