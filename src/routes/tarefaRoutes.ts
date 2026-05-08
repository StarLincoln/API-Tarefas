import { Router } from "express";
import * as TC from "../controllers/tarefaController";

export const tarefaRoutes = Router();

// API (JSON) — Thunder Client
tarefaRoutes.get("/tarefas",         TC.listar);
tarefaRoutes.get("/tarefas/:id",     TC.buscarPorId);
tarefaRoutes.post("/tarefas",        TC.criar);
tarefaRoutes.put("/tarefas/:id",     TC.atualizar);
tarefaRoutes.delete("/tarefas/:id",  TC.remover);

// Páginas (EJS) — Navegador
tarefaRoutes.get("/pagina/tarefas",         TC.listarPagina);
tarefaRoutes.get("/pagina/tarefas/:id",     TC.detalhePagina);
tarefaRoutes.get("/pagina/cadastrar",        TC.cadastrarPagina);
tarefaRoutes.post("/tarefas/cadastrar",      TC.cadastrarForm);
tarefaRoutes.post("/tarefas/:id/concluir",   TC.concluirForm);
tarefaRoutes.post("/tarefas/:id/excluir",    TC.excluirForm);
