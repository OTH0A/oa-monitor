<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    export let data: { setupComplete: boolean };

    onMount(() => {
        if (!data.setupComplete && window.location.pathname !== '/setup') {
            goto('/setup');
        }
    });
</script>

<slot />
