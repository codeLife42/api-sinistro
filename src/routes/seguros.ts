import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from 'zod';
import crypto from "node:crypto";

export async function segurosRoutes(app: FastifyInstance){
    app.get('/', async (request, reply) => {

        const seguros = await knex('seguro').select('*');
    
        return { seguros }
    })
    
    //Define rota post para clientes
    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            nome: z.string(),
            valor_segurado: z.number(),
            status: z.string(),
            id_cliente: z.string()
        })
    
        const { nome, valor_segurado, status, id_cliente } = createTransactionBodySchema.parse(request.body);
    
        await knex('seguro').insert({
            id: crypto.randomUUID(),
            nome,
            valor_segurado,
            status,
            id_cliente
        })
    
        return reply.status(201).send();
    })

}