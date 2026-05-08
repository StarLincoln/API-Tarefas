// src/interfaces/index.ts

export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: "alta" | "media" | "baixa";
    concluida: boolean;
    dataCriacao: string;
}

export interface CriarTarefaBody {
    titulo: string;             // obrigatório
    descricao?: string;         // opcional
    prioridade: "alta" | "media" | "baixa";  // obrigatório
}

export interface AtualizarTarefaBody {
    titulo?: string; descricao?: string;
    prioridade?: "alta" | "media" | "baixa";
    concluida?: boolean;
}

export interface TarefaParams {
    id: string;
}
export interface FiltroQuery {
    concluida?: string; 
    prioridade?: string;
}
export interface ApiResponse<T> {
    sucesso: boolean; 
    dados?: T; 
    erro?: string; 
    erros?: string[];
}
