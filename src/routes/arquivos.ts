import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from 'zod';
import crypto from "node:crypto";

export async function arquivosRoutes(app: FastifyInstance){
    app.get('/', async (request, reply) => {

        const arquivos = await knex('arquivo').select('*');
    
        return { arquivos }
    })
    
    //Define rota post para arquivo
    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            nome: z.string(),
            arquivo: z.string(),
            tipo: z.string(),
            id_sinistro: z.string()
        })
    
        const { nome, arquivo, tipo, id_sinistro } = createTransactionBodySchema.parse(request.body);
    
        await knex('arquivo').insert({
            id: crypto.randomUUID(),
            nome,
            arquivo,
            tipo,
            id_sinistro
        })
    
        return reply.status(201).send();
    })
    
}