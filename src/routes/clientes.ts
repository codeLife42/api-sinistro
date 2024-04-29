import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from 'zod';
import crypto from "node:crypto";

export async function clientesRoutes(app: FastifyInstance){
    app.get('/', async (request, reply) => {

        const clientes = await knex('cliente').select('*');
    
        return { clientes }
    })
    
    //Define rota post para clientes
    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            nome: z.string(),
            cpf: z.string(),
            carteira: z.string()
        })
    
        const { nome, cpf, carteira } = createTransactionBodySchema.parse(request.body);
    
        await knex('cliente').insert({
            id: crypto.randomUUID(),
            nome,
            cpf,
            carteira
        })
    
        return reply.status(201).send();
    })
    
}