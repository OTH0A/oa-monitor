import fs from 'fs'
import path from 'path'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
    const configPath = path.join(process.cwd(), '..', '..', 'server', 'OA_Data', 'server-config.json')

    const setupComplete = fs.existsSync(configPath)

    return {
        setupComplete
    }
}
