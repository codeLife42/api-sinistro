import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

export async function uploadRoutes(app: FastifyInstance) {
  const UPLOADS_DIR = path.join(__dirname, "../../uploads");

  console.log(UPLOADS_DIR);

  app.get("/*", async (request, reply) => {
    try {
      const filePath = path.join(UPLOADS_DIR, request.params["*"]);
      console.log(filePath);
      const file = fs.readFileSync(filePath);
      const fileType = path.extname(filePath).slice(1); // Extensão do arquivo
      reply.header("Content-Type", `application/${fileType}`);

      return file;
    } catch (err) {
      request.log.error(err);
      reply.code(500).send("Erro ao servir o arquivo");
    }
  });
}
