<script>
  import { serverStore } from '$lib/stores/server.js';
  import { Package } from 'lucide-svelte';
</script>

<div class="card">
  <div class="flex items-center mb-6">
    <Package class="w-6 h-6 text-primary-600 mr-3" />
    <h2 class="text-2xl font-bold text-gray-800">Resources</h2>
  </div>

  <div class="space-y-3 max-h-80 overflow-y-auto">
    {#each $serverStore.resources as resource}
      <div class="flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
        <span class="font-semibold text-gray-800">{resource.name}</span>
        <span class="px-3 py-1 rounded-full text-sm font-medium {
          resource.status === 'running' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }">
          {resource.status}
        </span>
      </div>
    {/each}
  </div>
</div>