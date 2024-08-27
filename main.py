from app.producer import send_message
from app.consumer import receive_message
import config.mq_config as config

def main():
    print(f"Host: {config.MQ_HOST}")
    print(f"Port: {config.MQ_PORT}")
    print(f"Channel: {config.MQ_CHANNEL}")
    print(f"Queue Manager: {config.MQ_QMGR}")
    print(f"Queue: {config.MQ_QUEUE}")
    print(f"User: {config.MQ_USER}")
    print(f"Password: {config.MQ_PASSWORD}")

    send_message(b'Hello from Python within Docker!')
    message = receive_message()
    print(f"Received message: {message}")

if __name__ == "__main__":
    main()
