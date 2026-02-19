<script lang="ts">
    import {
        set_machine_description,
        automata_types,
        automata_type_formatted,
    } from "$lib/automata_description.svelte";

    let new_automata_dialog: HTMLDialogElement;
</script>

<button onclick={() => new_automata_dialog.showModal()}> New </button>

<dialog bind:this={new_automata_dialog}>
    <h3>New Automata Type</h3>

    <select>
        {#each automata_types as type}
            <option value={type}>{automata_type_formatted(type)}</option>
        {/each}
    </select>

    <button
        onclick={() => {
            new_automata_dialog.close();
        }}
    >
        Confirm
    </button>
    <button
        onclick={() => {
            new_automata_dialog.close();
        }}
    >
        Cancel
    </button>
</dialog>

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
