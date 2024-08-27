from app.producer import send_message
from app.consumer import receive_message

if __name__ == "__main__":
    send_message("Hello from IBM MQ!")
    receive_message()
