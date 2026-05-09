// src/controllers/tarefaController.ts
import { Request, Response } from "express";
import * as TarefaModel from "../models/tarefaModel";
import { ApiResponse, Tarefa, FiltroQuery } from "../interfaces";

export async function listar(req: Request<{},{},{},FiltroQuery>, res: Response) {
  try {
    let tarefas = await TarefaModel.listarTodas();
    if (req.query.concluida === "true") tarefas = tarefas.filter(t => t.concluida);
    if (req.query.concluida === "false") tarefas = tarefas.filter(t => !t.concluida);
    if (req.query.prioridade) tarefas = tarefas.filter(t => t.prioridade === req.query.prioridade);
    res.json({ sucesso: true, dados: tarefas } as ApiResponse<Tarefa[]>);
  } catch { res.status(500).json({ sucesso: false, erro: 'Erro interno' }); }
}

export async function criar(req: Request, res: Response) {
  try {
    const { titulo, descricao, prioridade } = req.body;
    const erros: string[] = [];
    if (!titulo || typeof titulo !== "string") erros.push("titulo é obrigatório");
    if (!["alta","media","baixa"].includes(prioridade)) erros.push("prioridade inválida");
    if (erros.length > 0) { res.status(400).json({ sucesso:false, erros }); return; }
    const nova = await TarefaModel.criar({ titulo, descricao, prioridade });
    res.status(201).json({ sucesso: true, dados: nova });
  } catch { res.status(500).json({ sucesso: false, erro: 'Erro interno' }); }
}

// Minha parte
async function busca(id: number){
  const array = await TarefaModel.listarTodas() 
  return array.find(x => x.id === id)
}

export async function buscarPorId(req: Request, res: Response) {
  try {
    const index = await busca(Number(req.body.id))
    if(!index) return {erro : "Id inexistente"}
    return {...index}
  } catch {
    return {erro : "Erro do servidor"}
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const tarefa = await busca(Number(req.body.id))

    if(!tarefa) return res.status(404).json({erro : "Id inesxistente"})
    const novaTarefa = {...tarefa, ...req.body, id: Number(req.body.id)}
  
    return res.status(200).json(novaTarefa)
  } catch {
    return res.status(500).json({erro: "Erro do servidor"})
  }
}

export async function remover(req: Request, res: Response) {
  try {
    const array = await TarefaModel.listarTodas()
    const index = array.findIndex(x => x.id === Number(req.body.id))

    if (index === -1) return res.status(404).json({erro : "ID inexistente"})
  
    return res.status(204).json(array)
  } catch {
    return res.status(500).json({erro : "Erro do servidor"})
  }
}
export async function listarPagina(req: Request, res: Response) {
    const tarefas = await TarefaModel.listarTodas();
    res.render("tarefas", { tarefas });
}

export async function detalhePagina(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tarefa = await TarefaModel.buscarPorId(id);
    if (!tarefa) return res.render("erro", { mensagem: "Tarefa não encontrada." });
    res.render("detalhe", { tarefa });
}

export async function cadastrarPagina(req: Request, res: Response) {
    res.render("cadastrar");
}

export async function cadastrarForm(req: Request, res: Response) {
    try {
        const { titulo, descricao, prioridade } = req.body;
        // O Model já cuida de criar o ID e definir concluida: false
        await TarefaModel.criar({ titulo, descricao, prioridade });
        res.redirect("/tarefas");
    } catch {
        res.render("erro", { mensagem: "Erro ao cadastrar tarefa." });
    }
}

export async function concluirForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    await TarefaModel.alternarConclusao(id);
    res.redirect("/tarefas");
}

export async function excluirForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    await TarefaModel.remover(id);
    res.redirect("/tarefas");
}