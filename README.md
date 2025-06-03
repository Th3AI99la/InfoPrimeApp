# InfoPrimeApp 

Projeto de faculdade: app mobile em React Native (Expo) para gerenciar produtos de uma loja de informática, com CRUD completo e tema claro/escuro.

## Funcionalidades

- CRUD completo de produtos (listar, adicionar, editar, excluir).
- Home com carrossel de produtos em destaque.
- Tela detalhada de produto.
- Tema claro/escuro alternável manualmente e conforme sistema.
- Navegação com React Navigation.
- Comunicação com backend via API REST (Axios).
- Feedback visual, animações e “pull to refresh”.

## Tecnologias

- Frontend: React Native + Expo, React Navigation, Axios, React Context API (tema).
- Backend: Java Spring Boot + JPA, PostgreSQL.

## Backend

- API RESTful com endpoints para CRUD de produtos:  
  `GET /api/produtos`  
  `POST /api/produtos`  
  `GET /api/produtos/{id}`  
  `PUT /api/produtos/{id}`  
  `DELETE /api/produtos/{id}`  
- Modelo Produto: id, nome, descrição, quantidade, preço, imagemUrl, disponível online, datas cadastro/atualização.

## Como rodar

1. Instale Node.js, Expo CLI e Git.  
2. Clone o repo:  
   ```bash
   git clone https://github.com/Th3AI99la/InfoPrimeApp
   cd InfoPrimeApp
