<h1 align="center">PedePizza 🍕</h1>

<p>PedePizza é uma API para gerenciar pedidos de clientes, voltada para os funcionários. Ela permite aos colaboradores cadastrar, atualizar, excluir e listar pedidos, com informações detalhadas sobre os sabores de pizzas, bebidas, tempo de preparo, preços e muito mais.</p>

<h2>🚀 Tecnologias Utilizadas</h2>

+ Backend: NodeJs, Express
+ Autenticação e Segurança: Bcrypt, JWToken, CORS
+ ORM: Sequelize
+ Banco de Dados: MySQL

<h2>⚙️ Funcionalidades</h2>

✅ Cadastro de clientes

✅ Registro de pedidos ( Pizzas e Bebidas )

✅ Atualização do status do pedido ( Produção, Entrega )

✅ Controle de estoque

✅ Autenticação com JWT

✅ Criação, leitura, atualização e remoção de dados (CRUD completo)

A seguir estão os principais endpoints:

<h3>📚 Endpoints</h3>

**Pedidos**

+ **GET /orders/all:** Retorna todos os pedidos cadastrados.
+ **POST /orders/idCustomer:** Cria um pedido atrelado a um determinado cliente.
+ **DELETE /orders/idOrder:** Deleta um pedido.
+ **GET /orders/idOrder:** Retorna um pedido específico.

 **Exemplo de pedido** 📃

O pedido possui os seguintes atributos: <br>

```json
{
  "id": 24,
  "dt_order": "2025-03-21 11:48:26",
  "status": "Entregue",
  "payment_method": "Cartão de Crédito",
  "order_price": "695.40",
  "OrderPizzas": [
    {
      "id": 24,
      "pizza_name": "Mussarela",
      "quantity": 10
    },
    {
      "id": 25,
      "pizza_name": "4 Queijos",
      "quantity": 5
    }
  ],
  "OrderDrinks": [
    {
      "id": 4,
      "drink_name": "Coca Cola",
      "quantity": 3
    },
    {
      "id": 5,
      "drink_name": "Fanta",
      "quantity": 2
    }
  ]
}
```

<h2>📁 Estrutura do Projeto</h2>
O projeto está organizado da seguinte forma

```
src/
├── config/       # Configurações (Ex: DatabaseConfig)
├── controllers/  # Controladores de API
├── database/     # Migrações, Seeds e Conexão do Sequelize
├── middlewares/  # Interceptações das Rotas
├── models/       # Modelos de Dados
├── routes/       # Rotas de API
├── utils/        # Funcionalidades utéis
└── app.js        
└── server.js     

```

<h2>🛠️ Como Rodar o Projeto</h2>

1. Clone o repositório:

```

https://github.com/devluizgustavo/API-Pizzaria.git

```

2. Acesse o diretório do projeto:

```

cd API-Pizzaria

```

3. Instale as dependências:

```

npm install

```

4. Configure o Ambiente:

```javascript
DATABASE_PORT= sua_porta
DATABASE_HOST= seu_host
DATABASE_USERNAME= seu_username
DATABASE_PASSWORD= senha_de_acesso
DATABASE= nome_base_de_dados
TOKEN_SECRET= seu_token_secret
TOKEN_EXPIRATION= dias_a_expirar

```

<h3>🔄 Rodar Sequelize </h3>

1. Rode as Migrações:

```

npx sequelize db:migrate

```

2. Rode as Seeds:

```

npx sequelize db:seed:all

```

<h3>✅ Inicie o servidor</h3>

```

npm run dev

```

<h2>🧠 Sobre o projeto </h2>
Esse projeto foi desenvolvido com foco em aprendizado prático de back-end com Node.js, boas práticas de arquitetura, autenticação, e integração com banco de dados. Desenvolver esse projeto foi uma experiência muito enriquecedora para mim, tive a oportunidade de colocar em prática diversos conceitos.



