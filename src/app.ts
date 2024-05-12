import fastify from 'fastify';
import { env } from './env';
import { clientesRoutes } from './routes/clientes';
import { segurosRoutes } from './routes/seguros';
import { sinistrosRoutes } from './routes/sinistros';
import { arquivosRoutes } from './routes/arquivos';

//Cria instancia fastify
export const app = fastify();
app.register(clientesRoutes, {
    prefix: 'clientes',
})
app.register(segurosRoutes, {
    prefix: 'seguros'
})
app.register(sinistrosRoutes, {
    prefix: 'sinistros'
})
app.register(arquivosRoutes, {
    prefix: 'arquivos'
})
