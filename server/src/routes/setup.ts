import { FastifyInstance } from 'fastify'
import fs from 'fs'
import path from 'path'

const oaDataPath = path.join(process.cwd(), 'OA_Data')
const configFilePath = path.join(oaDataPath, 'server-config.json')
const cfgPath = path.join(oaDataPath, 'server.cfg')

export default async function setupRoutes(app: FastifyInstance) {
    // 🔹 GET /api/setup – Récupère la config actuelle
    app.get('/api/setup', async (_, reply) => {
        try {
            if (!fs.existsSync(configFilePath)) {
                return reply.status(404).send({ error: 'server-config.json not found' })
            }

            const configRaw = fs.readFileSync(configFilePath, 'utf-8')
            const config = JSON.parse(configRaw)

            return reply.send(config)
        } catch (error) {
            return reply.status(500).send({ error: 'Error reading config' })
        }
    })

    // 🔹 POST /api/setup – Enregistre une nouvelle configuration + génère server.cfg
    app.post('/api/setup', async (request, reply) => {
        try {
            const body = request.body as any

            // Création du dossier OA_Data s'il n'existe pas
            if (!fs.existsSync(oaDataPath)) fs.mkdirSync(oaDataPath)

            // Sauvegarde de la config JSON
            fs.writeFileSync(configFilePath, JSON.stringify(body, null, 2), 'utf-8')

            // Création du server.cfg
            const cfgContent = `
# OA-Monitor generated config
sv_hostname "${body.serverName}"
maxplayers ${body.maxPlayers}
licensekey ${body.licenseKey}
start mysql-async
set mysql_connection_string "server=${body.database.host};uid=${body.database.user};password=${body.database.password};database=${body.database.dbName}"
# autres lignes à compléter...
            `.trim()

            fs.writeFileSync(cfgPath, cfgContent, 'utf-8')

            reply.code(200).send({ success: true, message: 'Configuration enregistrée avec succès' })
        } catch (error) {
            console.error(error)
            return reply.status(500).send({ error: 'Erreur lors de l\'enregistrement du setup' })
        }
    })
}
