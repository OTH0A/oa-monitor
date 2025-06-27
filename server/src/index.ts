import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import pingRoutes from './routes/ping'

dotenv.config()

const app = Fastify({ logger: true })

// 📁 Vérifie le dossier OA_Data
const oaDataPath = path.join(process.cwd(), 'OA_Data')
const configFilePath = path.join(oaDataPath, 'server-config.json')

// 🧠 Valeurs de config par défaut
const defaultConfig = {
    serverName: "Mon serveur FiveM",
    description: "Description de mon serveur",
    maxPlayers: 32,
    licenseKey: "",
    database: {
        host: "localhost",
        user: "root",
        password: "",
        dbName: "oa_monitor"
    },
    users: []
}

// 🔧 Crée OA_Data + config si absent
function setupOAData() {
    if (!fs.existsSync(oaDataPath)) {
        console.log('🛠️ OA_Data folder missing. Creating it...')
        fs.mkdirSync(oaDataPath)
    }

    if (!fs.existsSync(configFilePath)) {
        console.log('🛠️ server-config.json missing. Creating default config...')
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2), 'utf-8')
    }
}

setupOAData()

app.register(cors)
app.register(pingRoutes)

app.listen({ port: 3001 }, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    console.log(`✅ Backend running at ${address}`)
})
