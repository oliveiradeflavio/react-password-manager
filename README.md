[![LinkedIn][linkedin-shield]][linkedin-url]
![GitHub forks](https://img.shields.io/github/forks/oliveiradeflavio/react-password-managerv?style=for-the-badge)
![GitHub User's stars](https://img.shields.io/github/stars/oliveiradeflavio?style=for-the-badge)
![GitHub followers](https://img.shields.io/github/followers/oliveiradeflavio?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/oliveiradeflavio/react-password-manager/blob/main/LICENSE)


<h3 align="center">REACT PASSWORD MANAGER</h3>

### Sobre o Projeto

Este projeto foi desenvolvido em React para gerenciar especificações e autenticações de serviços. Ele permite que os usuários possam criar, editar e excluir especificações, incluindo informações como login, senha e outras observações relevantes. O projeto faz uso de APIs para buscar, criar e atualizar essas informações de maneira dinâmica.

* ##### Cadastro e Edições de Serviços:

    O usuário pode preencher um formulário para cadastrar um novo serviço, fornecendo informações como especificação, login, senha, e observação.
    O mesmo formulário é utilizado para editar serviços existentes, com a função de editar sendo ativada ao selecionar um serviço buscado.

* ##### Busca de Serviços

    Um campo de busca permite pesquisar serviços já cadastrados na base de dados. Os resultados da busca são exibidos em um modal, onde o usuário pode optar por editar ou excluir o serviço selecionado.

* ##### Autenticação com Token

    O sistema usa autenticação baseada em Bearer Token, obtido a partir do sessionStorage. Esse token é enviado no cabeçalho de requisições para garantir que somente usuários autenticados possam interagir com a API.


#### Construído com

* [ReactJS](https://react.dev/)
* [Axios API](https://axios-http.com)
* [Bootstrap](https://getbootstrap.com/)
* [PHP](https://www.php.net/)
* [MySQL](https://www.mysql.com/)
* [SweetAlert2](https://sweetalert2.github.io/)
* [Google Fonts](https://fonts.google.com/)


#### Como Executar o Projeto

Clone o repositório:

    git clone https://github.com/oliveiradeflavio/react-password-manager.git

Instale as dependências:

    npm install

Defina as variáveis de ambiente:

    Crie um arquivo .env com a variável VITE_API_URL apontando para a URL da sua API.

Execute o projeto:

    npm run dev


Backend

    Versão do PHP 8 ou superior

    Crie o banco de dados com o script SQL

#### Screenshots


![](https://github.com/oliveiradeflavio/react-password-manager/blob/main/src/assets/img/home.png)

![](https://github.com/oliveiradeflavio/react-password-manager/blob/main/src/assets/img/autenticacao.png)

![](https://github.com/oliveiradeflavio/react-password-manager/blob/main/src/assets/img/dashboard.png)

![](https://github.com/oliveiradeflavio/react-password-manager/blob/main/src/assets/img/busca.png)

![](https://github.com/oliveiradeflavio/react-password-manager/blob/main/src/assets/img/edicao.png)









[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/fladoliveira/
[product-screenshot]: https://raw.githubusercontent.com/oliveiradeflavio/horus_pdv/main/screen/dashboard.png
