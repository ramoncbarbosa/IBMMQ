# Projeto IBM MQ com Node.js

Este projeto é uma implementação de um sistema de comunicação assíncrona usando IBM MQ com Node.js. Ele demonstra como configurar e utilizar filas de mensagens para enviar e receber dados entre sistemas distribuídos, utilizando a biblioteca `ibmmq` no Node.js. O IBM MQ Explorer foi utilizado para gerenciar as filas e objetos MQ durante o desenvolvimento.

## Funcionalidades

- **Envio e Recebimento de Mensagens:** Permite a comunicação assíncrona entre diferentes componentes de um sistema utilizando filas de mensagens.
- **Conexão com IBM MQ:** Configura e gerencia conexões seguras com o IBM MQ Server.
- **Tratamento de Mensagens:** Processa mensagens enviadas e recebidas através de filas MQ.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução para JavaScript no servidor.
- **IBM MQ:** Middleware para comunicação assíncrona via filas de mensagens.
- **ibmmq (MQI Node.js bindings):** Biblioteca que permite a interação com o IBM MQ através do Node.js.
- **IBM MQ Explorer:** Ferramenta utilizada para gerenciar filas e objetos MQ de forma gráfica.

## Usabilidade

Este projeto pode ser utilizado como uma base para construir sistemas de comunicação distribuída utilizando IBM MQ em aplicações Node.js. Ele é adequado para:

- **Integração de Sistemas:** Conectar diferentes aplicações ou serviços que precisam trocar mensagens de forma assíncrona.
- **Filas de Trabalho:** Gerenciar tarefas de forma assíncrona, distribuindo mensagens entre múltiplos consumidores.
- **Comunicação Segura:** Implementar troca de mensagens segura e confiável em um ambiente corporativo.

## Pré-requisitos

- **IBM MQ Server:** Certifique-se de que o IBM MQ está instalado e configurado no ambiente.
- **IBM MQ Explorer:** Utilizado para configurar e gerenciar as filas e objetos MQ.
- **Node.js:** Instale a versão LTS do Node.js.

## Como Executar

Siga os passos abaixo para clonar o repositório, configurar o ambiente e executar a aplicação:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio.git

# Navegue até o diretório do projeto
cd nome-do-repositorio

# Instale as dependências
npm install

# Configure as variáveis diretamente no código
# Abra o arquivo de configuração no projeto e insira suas credenciais e configurações do IBM MQ

# Inicie a aplicação
node src/index.js
