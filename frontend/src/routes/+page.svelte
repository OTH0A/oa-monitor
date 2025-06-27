<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let setupDone = false;

    // On vérifie si le setup est fait pour rediriger
    onMount(async () => {
        try {
            const res = await fetch('/api/setup');
            if (res.ok) {
                setupDone = true;
                // Si setup fait, on redirige vers login
                goto('/login');
            } else {
                // Sinon vers setup
                goto('/setup');
            }
        } catch {
            // Erreur réseau => on considère que setup pas fait
            goto('/setup');
        }
    });
</script>

<div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
    <h1 class="text-4xl font-bold mb-6">Bienvenue sur OA-Monitor</h1>
    <p class="max-w-xl text-center mb-8">
        La solution ultime pour gérer et monitorer vos serveurs FiveM simplement et efficacement.
    </p>
    <div class="space-x-4">
        <a href="/setup" class="px-6 py-3 bg-white text-blue-700 font-semibold rounded shadow hover:bg-gray-100 transition">
            Configurer mon serveur
        </a>
        <a href="/login" class="px-6 py-3 border border-white font-semibold rounded hover:bg-white hover:text-blue-700 transition">
            Se connecter
        </a>
    </div>
</div>
