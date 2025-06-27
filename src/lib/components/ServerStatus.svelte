<script>
  import { serverStore, serverActions } from '$lib/stores/server.js';
  import { Server, Users, Clock } from 'lucide-svelte';
  
  let loading = '';

  async function handleAction(action) {
    loading = action;
    await serverActions[action]();
    setTimeout(() => loading = '', 2000);
  }
</script>

<div class="card lg:col-span-1">
  <div class="flex items-center mb-6">
    <Server class="w-6 h-6 text-primary-600 mr-3" />
    <h2 class="text-2xl font-bold text-gray-800">Server Status</h2>
  </div>

  <!-- Status Indicator -->
  <div class="flex items-center mb-6">
    <div class="status-dot {$serverStore.online ? 'status-online' : 'status-offline'} mr-3"></div>
    <span class="text-lg font-semibold {$serverStore.online ? 'text-green-600' : 'text-red-600'}">
      {$serverStore.online ? 'Server Online' : 'Server Offline'}
    </span>
  </div>

  <!-- Server Controls -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
    <button 
      class="btn-primary {loading === 'start' ? 'opacity-50 cursor-not-allowed' : ''}"
      on:click={() => handleAction('start')}
      disabled={loading === 'start'}
    >
      {loading === 'start' ? 'Starting...' : 'Start'}
    </button>
    
    <button 
      class="btn-danger {loading === 'stop' ? 'opacity-50 cursor-not-allowed' : ''}"
      on:click={() => handleAction('stop')}
      disabled={loading === 'stop'}
    >
      {loading === 'stop' ? 'Stopping...' : 'Stop'}
    </button>
    
    <button 
      class="btn-warning {loading === 'restart' ? 'opacity-50 cursor-not-allowed' : ''}"
      on:click={() => handleAction('restart')}
      disabled={loading === 'restart'}
    >
      {loading === 'restart' ? 'Restarting...' : 'Restart'}
    </button>
  </div>

  <!-- Server Stats -->
  <div class="space-y-3">
    <div class="flex items-center text-gray-700">
      <Clock class="w-5 h-5 mr-3 text-primary-500" />
      <span><strong>Uptime:</strong> {$serverStore.uptime}</span>
    </div>
    <div class="flex items-center text-gray-700">
      <Users class="w-5 h-5 mr-3 text-primary-500" />
      <span><strong>Players:</strong> {$serverStore.players.current}/{$serverStore.players.max}</span>
    </div>
    <div class="flex items-center text-gray-700">
      <Server class="w-5 h-5 mr-3 text-primary-500" />
      <span><strong>Resources:</strong> {$serverStore.resources.length} loaded</span>
    </div>
  </div>
</div>
