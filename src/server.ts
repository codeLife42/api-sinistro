import fastify from 'fastify';

//Cria instancia fastify
const app = fastify();

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server is Running");
});