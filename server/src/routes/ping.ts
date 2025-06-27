import { FastifyInstance } from 'fastify'

export default async function pingRoutes(app: FastifyInstance) {
    app.get('/ping', async () => {
        return { pong: true, timestamp: Date.now() }
    })
}
