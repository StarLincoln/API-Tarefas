# API de Tarefas - Atividade para Alunos

Este repositório contém a estrutura inicial de uma API de gerenciamento de tarefas, desenvolvida com Node.js, Express e TypeScript. O objetivo desta atividade é que os alunos completem as funcionalidades pendentes, tanto na API RESTful quanto nas páginas renderizadas com EJS.

## Visão Geral do Projeto

O projeto está dividido nas seguintes pastas e arquivos principais:

- `src/app.ts`: Ponto de entrada da aplicação, onde o Express é configurado e as rotas são carregadas.
- `src/controllers/tarefaController.ts`: Contém a lógica de negócio para manipular as tarefas. **Este é o principal arquivo onde vocês irão trabalhar.**
- `src/models/tarefaModel.ts`: Responsável pela persistência dos dados das tarefas em um arquivo JSON (`dados/tarefas.json`). As funções CRUD básicas já estão implementadas aqui.
- `src/routes/tarefaRoutes.ts`: Define as rotas da API e as associa aos métodos do `tarefaController`.
- `src/interfaces/index.ts`: Define as interfaces TypeScript para os objetos de Tarefa e as respostas da API.
- `src/views/`: Contém os arquivos EJS para renderização das páginas HTML. **Esses arquivos precisam ser completados.**
- `public/`: Contém arquivos estáticos como `index.html` e `styles.css`. Atualmente vazios e podem ser desenvolvidos como parte da atividade.
- `dados/tarefas.json`: Arquivo JSON que atua como banco de dados para armazenar as tarefas.

## Configuração e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd api-tarefas
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

## Tarefas a Serem Completadas

Vocês deverão completar as seguintes funcionalidades no projeto:

### 1. `src/controllers/tarefaController.ts`

As seguintes funções precisam ser implementadas ou completadas no `tarefaController.ts`:

#### API RESTful (JSON)

-   **`buscarPorId(req: Request, res: Response)`**: Implementar a lógica para buscar uma tarefa específica pelo `id`. Deve retornar um JSON com a tarefa encontrada ou um erro 404 se não for encontrada.
-   **`atualizar(req: Request, res: Response)`**: Implementar a lógica para atualizar uma tarefa existente pelo `id`. Deve receber os dados atualizados no corpo da requisição (JSON) e retornar a tarefa atualizada. Considerar validações básicas.
-   **`remover(req: Request, res: Response)`**: Implementar a lógica para remover uma tarefa pelo `id`. Deve retornar um status 204 (No Content) em caso de sucesso ou um erro 404 se a tarefa não for encontrada.

#### Páginas (EJS)

-   **`listarPagina(req: Request, res: Response)`**: Renderizar a página `tarefas.ejs` exibindo todas as tarefas. Deve passar os dados das tarefas para o template EJS.
-   **`detalhePagina(req: Request, res: Response)`**: Renderizar a página `detalhe.ejs` exibindo os detalhes de uma tarefa específica pelo `id`. Deve passar os dados da tarefa para o template EJS.
-   **`cadastrarPagina(req: Request, res: Response)`**: Renderizar a página `cadastrar.ejs` com um formulário para criar novas tarefas.
-   **`cadastrarForm(req: Request, res: Response)`**: Processar o envio do formulário de cadastro de tarefas. Após o cadastro, redirecionar para a página de listagem de tarefas ou para a página de detalhes da tarefa recém-criada.
-   **`concluirForm(req: Request, res: Response)`**: Processar a ação de marcar uma tarefa como concluída (ou não concluída) pelo `id`. Após a atualização, redirecionar para a página de listagem ou detalhes.
-   **`excluirForm(req: Request, res: Response)`**: Processar a ação de excluir uma tarefa pelo `id`. Após a exclusão, redirecionar para a página de listagem de tarefas.

### 2. `src/views/*.ejs`

Os arquivos EJS na pasta `src/views/` estão vazios. Vocês deverão criar o HTML e a lógica EJS necessária para:

-   **`tarefas.ejs`**: Exibir uma lista de tarefas, com links para os detalhes, edição (se implementarem) e ações de concluir/excluir.
-   **`detalhe.ejs`**: Exibir os detalhes completos de uma única tarefa.
-   **`cadastrar.ejs`**: Criar um formulário para adicionar novas tarefas.
-   **`erro.ejs`**: Uma página simples para exibir mensagens de erro.

### 3. `public/index.html` e `public/styles.css` (Opcional)

Vocês podem criar um `index.html` inicial e adicionar estilos em `styles.css` para melhorar a apresentação das páginas EJS.

## Dicas e Recomendações

-   Utilizem as funções já existentes em `src/models/tarefaModel.ts` para interagir com os dados.
-   Prestem atenção aos tipos definidos em `src/interfaces/index.ts` para garantir a consistência dos dados.
-   Usem o Thunder Client (ou Postman/Insomnia) para testar os endpoints da API RESTful.
-   Testem as páginas EJS diretamente no navegador.
-   Considerem a validação de entrada para as requisições (já há um exemplo na função `criar`).
-   Tratem os erros de forma adequada, retornando status HTTP apropriados e mensagens claras.

Boa sorte com a atividade!
