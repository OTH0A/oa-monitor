<script lang="ts">
    import { goto } from '$app/navigation';

    let username = '';
    let password = '';
    let error = '';

    async function handleLogin() {
        error = '';
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                goto('/dashboard');
            } else {
                const data = await res.json();
                error = data.message || 'Erreur lors de la connexion.';
            }
        } catch {
            error = 'Erreur réseau.';
        }
    }
</script>

<div class="min-h-screen flex justify-center items-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {#if error}
            <p class="mb-4 text-red-600">{error}</p>
        {/if}
        <input
                type="text"
                placeholder="Nom d'utilisateur"
                bind:value={username}
                class="w-full p-3 mb-4 border rounded"
        />
        <input
                type="password"
                placeholder="Mot de passe"
                bind:value={password}
                class="w-full p-3 mb-6 border rounded"
        />
        <button on:click={handleLogin} class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Se connecter
        </button>
    </div>
</div>
