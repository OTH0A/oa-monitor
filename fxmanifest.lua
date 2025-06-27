fx_version 'cerulean'
game 'gta5'


description 'OA Monitor - Serveur Control & Monitoring Panel'


client_scripts {
    'client/*.lua'
}

server_scripts {
    --'@oxmysql/lib/MySQL.lua', -- si tu utilises MySQL plus tard
    'server/*.lua'
}

shared_scripts {
    'shared/*.lua'
}

files {
    'html/**',
}
