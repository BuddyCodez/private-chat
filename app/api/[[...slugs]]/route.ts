import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api' })
    .get('/', 'Api Route is up!')
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String()
        })
    })

export const GET = app.fetch 
export const POST = app.fetch 

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);