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
    let adminUser = '';
    let adminPassword = '';

    async function handleSubmit() {
        const payload = {
            serverName,
            description,
            maxPlayers,
            licenseKey,
            database: {
                host: dbHost,
                user: dbUser,
                password: dbPassword,
                dbName: dbName
            },
            users: [
                {
                    username: adminUser,
                    password: adminPassword
                }
            ]
        };

        try {
            const res = await fetch('http://localhost:3001/api/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('✅ Setup terminé avec succès !');
                goto('/dashboard');
            } else {
                alert('❌ Une erreur est survenue lors du setup.');
            }
        } catch (err) {
            console.error(err);
            alert('❌ Erreur de communication avec le serveur.');
        }
    }
</script>

<main class="p-6 max-w-2xl mx-auto space-y-4">
    <h1 class="text-3xl font-bold">Configuration initiale du serveur</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input bind:value={serverName} placeholder="Nom du serveur" class="input" />
        <input bind:value={description} placeholder="Description" class="input" />
        <input bind:value={maxPlayers} type="number" placeholder="Nombre max de joueurs" class="input" />
        <input bind:value={licenseKey} placeholder="Clé de licence" class="input" />
    </div>

    <h2 class="text-xl font-semibold mt-6">Base de données</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input bind:value={dbHost} placeholder="Hôte DB" class="input" />
        <input bind:value={dbUser} placeholder="Utilisateur DB" class="input" />
        <input bind:value={dbPassword} placeholder="Mot de passe DB" class="input" type="password" />
        <input bind:value={dbName} placeholder="Nom de la DB" class="input" />
    </div>

    <h2 class="text-xl font-semibold mt-6">Compte administrateur</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input bind:value={adminUser} placeholder="Nom d'utilisateur" class="input" />
        <input bind:value={adminPassword} placeholder="Mot de passe" class="input" type="password" />
    </div>

    <button on:click={handleSubmit} class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Lancer le setup
    </button>
</main>

<style>
    .input {
        @apply border p-2 rounded w-full;
    }
</style>
