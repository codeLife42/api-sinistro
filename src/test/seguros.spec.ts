import { test, beforeAll, afterAll, describe, beforeEach } from 'vitest';
import { app } from '../app';
import request from "supertest";
import { exec, execSync } from 'node:child_process';

describe("Rotas de seguros", () => {
    //Garante que os testes so serao executados apos o app estar pronto
    beforeAll(async() => {      
        await app.ready();
    })
    //Derruba o servidor
    afterAll(async() => {
        await app.close();
    })

    //Subir e derrubar banco a cada teste
    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all');
        execSync('npm run knex migrate:latest')
    })

    test('o usuario lista os seguros cadastrados', async() => {
        await request(app.server)
                .get('/seguros')
                .expect(200)
    })

    test('o usuario cadastra um novo seguro', async() => {
        await request(app.server)
                .post('/seguros')
                .send({
                    nome: "Novo nome",
                    valor_segurado: 5000,
                    status: "Ativo",
                    id_cliente: "852589b6-c74c-4006-a83f-c86287d46673"
                }).expect(201)
    })
})

