<script lang="ts">
    import { get_automata_description } from "$lib/automata_description.svelte";
</script>

<button
    onclick={() => {
        const data = JSON.stringify(get_automata_description(), null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "automata.json";
        a.click();

        URL.revokeObjectURL(url);
        a.remove();
    }}>Download</button
>

<style>
    button {
        width: 120px;
        background: #fff;
        color: #000;
        border: 4px solid #eee;

        padding: 5px 5px 2px 2px;
        font-size: large;
    }

    button:hover {
        border-bottom: 4px solid #888;
    }

    button:active {
        border-bottom: 4px solid #000;
    }

    @media (max-width: 800px) {
        button {
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: small;
        }
    }
</style>
