<script>
  import { Bot, Code2 } from 'lucide-svelte';
</script>

<div class="card">
  <div class="flex items-center mb-6">
    <Bot class="w-6 h-6 text-primary-600 mr-3" />
    <h2 class="text-2xl font-bold text-gray-800">Discord Bot API</h2>
  </div>

  <p class="text-gray-600 mb-4">Endpoints disponibles pour ton bot Discord :</p>

  <div class="space-y-4">
    <div>
      <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
        <Code2 class="w-4 h-4 mr-2" />
        Server Control
      </h3>
      <div class="space-y-1 text-sm">
        <div class="bg-gray-800 text-green-400 p-2 rounded font-mono">POST /api/server/start</div>
        <div class="bg-gray-800 text-red-400 p-2 rounded font-mono">POST /api/server/stop</div>
        <div class="bg-gray-800 text-orange-400 p-2 rounded font-mono">POST /api/server/restart</div>
      </div>
    </div>

    <div>
      <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
        <Code2 class="w-4 h-4 mr-2" />
        Server Info
      </h3>
      <div class="space-y-1 text-sm">
        <div class="bg-gray-800 text-blue-400 p-2 rounded font-mono">GET /api/server/status</div>
        <div class="bg-gray-800 text-blue-400 p-2 rounded font-mono">GET /api/server/players</div>
        <div class="bg-gray-800 text-blue-400 p-2 rounded font-mono">GET /api/resources</div>
      </div>
    </div>
  </div>
</div>