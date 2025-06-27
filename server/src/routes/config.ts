import { FastifyPluginAsync } from 'fastify'
import fs from 'fs'
import path from 'path'

const oaDataPath = path.join(process.cwd(), 'OA_Data')
const configFilePath = path.join(oaDataPath, 'server-config.json')

const configRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/config', async (request, reply) => {
        try {
            const data = fs.readFileSync(configFilePath, 'utf-8')
            return JSON.parse(data)
        } catch {
            reply.code(500).send({ error: 'Erreur de lecture du fichier config' })
        }
    })

    fastify.post('/config', async (request, reply) => {
        try {
            const newConfig = request.body
            if (!newConfig) return reply.code(400).send({ error: 'Config manquante dans le body' })

            fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2), 'utf-8')
            return { message: 'Configuration enregistrée' }
        } catch {
            reply.code(500).send({ error: 'Erreur d\'écriture du fichier config' })
        }
    })
}

export default configRoutes
