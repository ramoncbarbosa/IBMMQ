from app.producer import send_message
from app.consumer import receive_message

def main():
    # Enviar uma mensagem
    send_message(b'Hello from Python within Docker!')
    
    # Receber uma mensagem
    message = receive_message()
    print(f"Received message: {message}")

if __name__ == "__main__":
    main()
