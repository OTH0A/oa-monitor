import { writable } from 'svelte/store';

export const serverStore = writable({
  online: true,
  uptime: '2h 34m',
  players: { current: 5, max: 32 },
  resources: [
    { name: 'c-scripting-core', status: 'running' },
    { name: 'lifecore', status: 'running' },
    { name: 'lifecore-monitor', status: 'running' }
  ],
  startTime: Date.now()
});

// Actions du serveur
export const serverActions = {
  async start() {
    // API call vers ton serveur FiveM
    console.log('Starting server...');
    serverStore.update(state => ({ ...state, online: true }));
  },
  
  async stop() {
    console.log('Stopping server...');
    serverStore.update(state => ({ ...state, online: false }));
  },
  
  async restart() {
    console.log('Restarting server...');
    serverStore.update(state => ({ 
      ...state, 
      online: true, 
      startTime: Date.now() 
    }));
  }
};
// Update automatique des stats
serverStore.updateStats = function() {
  this.update(state => {
    if (state.online) {
      const uptime = Math.floor((Date.now() - state.startTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      
      return {
        ...state,
        uptime: `${hours}h ${minutes}m`,
        players: {
          ...state.players,
          current: Math.floor(Math.random() * state.players.max)
        }
      };
    }
    return state;
  });
};
// Simuler une mise à jour toutes les 10 secondes