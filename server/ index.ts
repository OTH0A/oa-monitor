import path from 'path'
import { spawn } from 'child_process'
import setupRoutes from './routes/setup'

// Avant tes routes
if (!fs.existsSync(configFilePath)) {
    app.get('*', (_, res) => {
        return res.code(403).send({ error: 'Setup not complete' });
    });
}


app.register(setupRoutes)

// Point d’entrée du backend
require('ts-node').register()
require(path.join(__dirname, 'src', 'index.ts'))

// Tu peux aussi y mettre le lancement auto de FiveM, ou de run.bat plus tard si tu veux :
/*
const runBat = spawn('cmd.exe', ['/c', 'run.bat'], {
  cwd: process.cwd(),
  detached: true,
  stdio: 'ignore'
})
runBat.unref()
*/
