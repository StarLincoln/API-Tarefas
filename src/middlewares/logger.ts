import { Request, Response, NextFunction } from "express"

export default (erro: any, req: Request, res: Response, next: NextFunction) => {
    const err = erro as Error || new Error("Erro desconhecido")

    res.render("erro", {
        nome: err.name || "Error",
        mensagem: err.message || "Algo deu Errado",
        causa: err.cause,
        detalhe: process.env.NODE_ENV === "development"? err.stack: null
    })
}