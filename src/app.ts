// src/app.ts — só COLA os módulos!
import express from "express";
import { logger } from "./middlewares/logger";
import { tarefaRoutes } from "./routes/tarefaRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);

// EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Rotas (TODAS importadas de 1 arquivo!)
app.use(tarefaRoutes);

// Iniciar
app.listen(3000, () => {
  console.log("✅ API Tarefas rodando em http://localhost:3000");
});
