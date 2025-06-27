<script>
  import ServerStatus from '$lib/components/ServerStatus.svelte';
  import ResourceList from '$lib/components/ResourceList.svelte';
  import ApiInfo from '$lib/components/ApiInfo.svelte';
  import { onMount } from 'svelte';
  import { serverStore } from '$lib/stores/server.js';

  onMount(() => {
    // Démarrer les updates temps réel
    const interval = setInterval(() => {
      serverStore.updateStats();
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>LifeCore Monitor</title>
  <meta name="description" content="Build life, not just servers." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Header -->
  <div class="text-center mb-12">
    <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">
      LifeCore Monitor
    </h1>
    <p class="text-xl text-white/90 font-medium">
      Build life, not just servers.
    </p>
  </div>

  <!-- Dashboard Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
    <ServerStatus />
    <ResourceList />
    <ApiInfo />
  </div>

  <!-- Footer -->
  <div class="text-center text-white/80 mt-12">
    <p>&copy; 2025 LifeCore Framework - Made with ❤️</p>
  </div>
</div>