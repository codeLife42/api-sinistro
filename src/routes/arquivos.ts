import { fastify, FastifyInstance } from "fastify";
import { knex } from "../database";
import fs from "fs";
import multer from "fastify-multer";

export async function arquivosRoutes(app: FastifyInstance) {
  app.register(multer.contentParser);

  //Cria onde sera armazenado o arquivo e sua extensao
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const horario = new Date().getTime();
      const caminhoArquivo = `${horario}_${file.originalname}`;

      cb(null, `${caminhoArquivo}`);
    },
  });

  const upload = multer({ storage });

  app.get("/", async (request, reply) => {
    const arquivos = await knex("arquivo").select("*");

    return { arquivos };
  });

  //Define rota post para arquivo
  app.post(
    "/",
    { preHandler: upload.single("file") },
    async (request, reply) => {
      try {
        const { file, documentType, idSinistro, fileName }: any = request.body;

        const caminhoArquivo = (request?.file as Express.Multer.File).filename;

        if (!upload) {
          return reply.status(400).send("Nenhum arquivo recebido");
        }
        console.log(caminhoArquivo);
        console.log(documentType);
        console.log(idSinistro);
        console.log(fileName);

        await knex("arquivo").insert({
          id: crypto.randomUUID(),
          nome: fileName,
          arquivo: caminhoArquivo,
          tipo: documentType,
          id_sinistro: idSinistro,
        });

        reply.status(201).send("Arquivo carregado!");
      } catch (error) {
        return reply.status(501).send(`Erro no servidor: ` + error);
      }
    }
  );
}
