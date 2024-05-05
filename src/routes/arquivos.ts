import { fastify,FastifyInstance } from "fastify";
import { knex } from "../database";
import fs from "fs";
import fastifyMultipart from "@fastify/multipart";
import pump from "pump";
import { z } from "zod";


export async function arquivosRoutes(app: FastifyInstance){

    app.register(fastifyMultipart);

    app.get('/', async (request, reply) => {

        const arquivos = await knex('arquivo').select('*');
    
        return { arquivos }
    })
    
    //Define rota post para arquivo
    app.post('/', async (request, reply) => {

        //Espera arquivo via requisicao multipart
        const arquivo = await request.file();
        const horario = new Date().getTime();
        const caminhoArquivo = `${horario}_${arquivo?.filename}`;
        const storedFile = fs.createWriteStream('./uploads/'+caminhoArquivo);
        await pump(arquivo?.file, storedFile);
    
        await knex('arquivo').insert({
            id: crypto.randomUUID(),
            nome: arquivo?.fieldname,
            arquivo: caminhoArquivo,
            tipo: 'request.body.tipo',
            id_sinistro: crypto.randomUUID()
        })



        return reply.status(201).send("Arquivo carregado!")

    })
    
}