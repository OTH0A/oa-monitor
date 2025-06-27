<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let serverName = '';
    let description = '';
    let maxPlayers = 32;
    let licenseKey = '';
    let dbHost = 'localhost';
    let dbUser = 'root';
    let dbPassword = '';
    let dbName = 'oa_monitor';

    async function handleSubmit() {
        const res = await fetch('http://localhost:3001/api/setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serverName,
                description,
                maxPlayers,
                licenseKey,
                database: {
                    host: dbHost,
                    user: dbUser,
                    password: dbPassword,
                    dbName
                }
            })
        });

        if (res.ok) {
            alert('✅ Configuration enregistrée. Redirection vers le dashboard...');
            goto('/');
        } else {
            alert('❌ Erreur lors de l’enregistrement.');
        }
    }
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-2 gap-4">
        <input bind:value={serverName} placeholder="Nom du serveur" class="input" required />
        <input bind:value={description} placeholder="Description" class="input" />
    </div>

    <div class="grid grid-cols-2 gap-4">
        <input bind:value={maxPlayers} type="number" min="1" placeholder="Max joueurs" class="input" required />
        <input bind:value={licenseKey} placeholder="Clé FiveM" class="input" />
    </div>

    <h2 class="text-white font-semibold mt-4">🎲 Base de données</h2>

    <div class="grid grid-cols-2 gap-4">
        <input bind:value={dbHost} placeholder="Hôte (localhost)" class="input" />
        <input bind:value={dbUser} placeholder="Utilisateur" class="input" />
        <input bind:value={dbPassword} type="password" placeholder="Mot de passe" class="input" />
        <input bind:value={dbName} placeholder="Nom de la base" class="input" />
    </div>

    <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg">
        ✅ Enregistrer & Démarrer
    </button>
</form>

<style>
    .input {
        @apply bg-white/10 text-white placeholder-white/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
</style>
