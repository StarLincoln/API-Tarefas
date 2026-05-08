import { readFile, writeFile } from "fs/promises";
import { Tarefa } from "../interfaces";

const ARQUIVO = "dados/tarefas.json";
const PRIORIDADES = ["alta", "media", "baixa"];

// Funções internas (NÃO exportadas)
async function carregar(): Promise<Tarefa[]> {
    try { return JSON.parse(await readFile(ARQUIVO, "utf-8")) as Tarefa[]; }
    catch { await writeFile(ARQUIVO, "[]"); return []; }
}
async function salvar(t: Tarefa[]) { await writeFile(ARQUIVO, JSON.stringify(t, null, 2)); }

// Funções EXPORTADAS — o Controller chama estas
export async function listarTodas(): Promise<Tarefa[]> { return carregar(); }

export async function buscarPorId(id: number): Promise<Tarefa | undefined> {
    return (await carregar()).find(t => t.id === id);
}

export async function criar(dados: {
    titulo: string; descricao?: string;
    prioridade: "alta" | "media" | "baixa"
}): Promise<Tarefa> {
    const tarefas = await carregar();
    const nova: Tarefa = {
        id: (tarefas.at(-1)?.id ?? 0) + 1, ...dados,
        descricao: dados.descricao || "", concluida: false,
        dataCriacao: new Date().toISOString()
    };
    tarefas.push(nova); await salvar(tarefas); return nova;
}
export async function atualizar(
    id: number,
    dados: Partial<Tarefa>
): Promise<Tarefa | null> {
    const tarefas = await carregar();

    const index = tarefas.findIndex(t => t.id === id);
    if (index === -1) return null;

    const atual = tarefas[index];
    if (!atual) return null; // 👈 garante pro TypeScript

    const tarefaAtualizada: Tarefa = {
        id,
        titulo: dados.titulo ?? atual.titulo,
        descricao: dados.descricao ?? atual.descricao,
        prioridade: dados.prioridade ?? atual.prioridade,
        concluida: dados.concluida ?? atual.concluida,
        dataCriacao: dados.dataCriacao ?? atual.dataCriacao,
    };

    tarefas[index] = tarefaAtualizada;

    await salvar(tarefas);

    return tarefaAtualizada;
}

export async function alternarConclusao(id: number): Promise<Tarefa | null> {
    const tarefas = await carregar();
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) return null;

    const tarefa = tarefas[index];
    if (!tarefa) return null; // 🛡️ segurança extra

    tarefa.concluida = !tarefa.concluida;

    await salvar(tarefas);
    return tarefa;
}

export async function remover(id: number): Promise<Tarefa | null> {
    const tarefas = await carregar();
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) return null;

    const removida = tarefas.splice(index, 1)[0];

    if (!removida) return null; // 🛡️ garante pro TS

    await salvar(tarefas);
    return removida;
}
