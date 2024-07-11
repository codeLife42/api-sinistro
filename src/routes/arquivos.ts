import { fastify, FastifyInstance } from "fastify";
import { knex } from "../database";
import fs from "fs";
import fastifyMultipart from "@fastify/multipart";
import pump from "pump";
import { z } from "zod";

export async function arquivosRoutes(app: FastifyInstance) {
  app.register(fastifyMultipart, { attachFieldsToBody: true });

  app.get("/", async (request, reply) => {
    const arquivos = await knex("arquivo").select("*");

    return { arquivos };
  });

  //Define rota post para arquivo
  app.post("/", async (request, reply) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    await new Promise((resolve, reject) => {
      try {
        const { file, documentType, idSinistro }: any = request.body;
        //Espera arquivo via requisicao multipart
        const arquivo = await request.file();
        const horario = new Date().getTime();
        const caminhoArquivo = `${horario}_${arquivo?.filename}`;
        const storedFile = fs.createWriteStream("./uploads/" + caminhoArquivo);
        /**
      console.log(file);
      console.log(file.filename);
      console.log(documentType.value);
      console.log(idSinistro.value);
      */
        console.log(file);

        await pump(file, storedFile);

        /**
      await knex("arquivo").insert({
        id: crypto.randomUUID(),
        nome: file.filename,
        arquivo: caminhoArquivo,
        tipo: documentType.value,
        id_sinistro: idSinistro.value,
      });

      */
        return reply.status(201).send("Arquivo carregado!");
      } catch (error) {
        resolve(1000);
        console.log("Erro ao carregar arquivo", error);
      }
    });
  });
}
