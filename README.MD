# Trabalho do Brasil

## Descrição
Este projeto é uma aplicação Node.js para gerenciamento de tarefas, utilizando DynamoDB para armazenamento e integrações com AWS S3 e SQS para funcionalidades de upload de arquivos e mensagens assíncronas, respectivamente.

## Pré-requisitos
- Node.js (v14+)
- Docker
- AWS CLI configurado com credenciais adequadas

## Instalação
1. Clone o repositório:
git clone https://github.com/DenisOliveiraaa/Trabalho-do-Brasil.git
cd seu-repositorio

2. Instale as dependências:
npm install


3. Configuração do ambiente:
- Precisa do .env para ter acesso as variaveis de ambiente usadas como o exemplo abaixo

AWS_REGION = sua_aws_region
AWS_ACCESS_KEY_ID = sua_access_key_id
AWS_SECRET_ACCESS_KEY = sua_secret_access_key
DYNAMODB_TABLE = sua_dynamodb_table_name
SQS_QUEUE_URL = sua_sqs_queue_url
S3_BUCKET_NAME = sua_s3_bucket_name
PORT=3000

4. Inicie a aplicação:
docker-compose up --build

## GitHub Actions
Para CI/CD automatizado, este projeto utiliza GitHub Actions. O fluxo de trabalho está configurado para:

- **Deploy Automático**: Ao fazer push para a branch `main`, a aplicação é automaticamente implantada em um servidor EC2.

### Configuração do GitHub Actions
- O fluxo de trabalho pode ser encontrado em `.github/workflows/deploy.yml`.
- Certifique-se de configurar as variáveis de ambiente secretas no GitHub com as credenciais necessárias para acesso ao servidor EC2 e AWS.

## Funcionalidades Principais
- **Gerenciamento de Tarefas**: CRUD completo para tarefas.
- **Upload e Download de Arquivos**: Integração com AWS S3 para armazenamento de arquivos.
- **Mensagens Assíncronas**: Utilização de AWS SQS para comunicação assíncrona.

## Estrutura do Projeto
- `/controllers`: Controladores para lógica de negócios.
- `/models`: Definições de modelos usando DynamoDB.
- `/routes`: Rotas da API para diferentes recursos.
- `/services`: Serviços para integrações externas, como AWS.

## Contribuição
Contribuições são bem-vindas! Para mudanças importantes, abra uma issue primeiro para discutir o que você gostaria de alterar.


