# UEX Maps - Desafio técnico

As tecnologias empregadas no desenvolvimento foram:

- React.js
- TypeScript
- Tailwind CSS
- Zustand
- dentre outras ferramentas.

## Instruções para rodar

Para começar, após clonar o repositório, utilize o comando abaixo para instalar todas as dependências necessárias:

```bash
npm install
```

Para que o projeto funcione corretamente, é preciso configurar as variáveis de ambiente. Crie um arquivo chamado `.env.local` na raiz do projeto, utilizando como referência o arquivo `.env.example`.

```bash
VITE_MAPBOX_APIKEY=
```

Depois de configurar as variáveis, inicie o projeto executando o seguinte comando:

```bash
npm run dev
```

O projeto poderá ser acessado em `http://localhost:5173`.

## Estrutura do projeto

A estrutura de pastas adotada no projeto segue o seguinte formato:

- `app`: Arquivos de páginas da aplicação.
- `components/ui`:  Componentes de interface reutilizáveis.
- `components`: Componentes desenvolvidos para necessidades específicas.
- `constants`: Arquivos com dados e informações estáticas.
- `hooks`: Hooks customizados para acessar ações e estados da aplicação.
- `lib/utils`: Funções utilitárias para propósitos específicos.
- `routes`: Arquivos responsáveis pela definição das rotas da aplicação.
- `services`: Integrações com APIs e serviços externos.
- `store`: Gerenciamento do estado da aplicação.

## Google Maps API / Mapbox API

Foi solicitada a integração com a API do Google Maps para obter a latitude e longitude do endereço do contato quando o cadastro é realizado. Como essa API depende de uma conta com faturamento ativo no Google Console, escolhi usar a API do Mapbox para obter o mesmo resultado sem custo inicial.

## Links

Abaixo listei algumas tecnologias, libs e recursos que usei para desenvolver o projeto.

- Fonts: **[Roboto (Google Fonts)](https://fonts.googleapis.com/css2?family=Roboto)**
- Icons: **[Material Symbols Outlined (Google Fonts)](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined)**
- Styles: **[Tailwind CSS](https://tailwindcss.com)**
- Store: **[Zustand + LocalStorage persist/middleware](https://zustand.docs.pmnd.rs/getting-started/introduction)**
- Input Mask: **[React Input Mask](https://www.npmjs.com/package/@react-input/mask)**
- HTTP Requests: **[Axios](https://www.npmjs.com/package/axios)**
- CPF Validator: **[CPF CNPJ Validator](https://www.npmjs.com/package/cpf-cnpj-validator)**
- Map: **[Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/guides)**
- Form: **[React Hook Form](https://react-hook-form.com/)**
- Page Router: **[React Router](https://reactrouter.com/start/declarative/routing)**
- Toast: **[Sonner](https://sonner.emilkowal.ski/)**
- ID Generator: **[UUID](https://www.npmjs.com/package/uuid)**
- Type & Validation: **[Typescript + Zod](https://zod.dev/)**
- Fast Bundler: **[Vite](https://vite.dev/)**
- UI library: **[React](https://react.dev/)**

## Observações

- O principal objetivo deste projeto foi apresentar o domínio sobre as tecnologias aplicadas.
- Fico à disposição para esclarecer quaisquer dúvidas relacionadas ao projeto ou às escolhas realizadas durante seu desenvolvimento.
