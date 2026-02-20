<script lang="ts">
    import {
        get_automata_description,
        set_automata_description,
    } from "$lib/automata_description.svelte";
    import {
        automata_types,
        automata_type_formatted,
        automata_default,
        type AutomataDescription,
    } from "$lib/automata-core/automata-description";

    let new_automata_dialog: HTMLDialogElement;
    let selected_automata_type: string = $derived(
        get_automata_description().type,
    );
    let automata_name: string = $state("New Machine");
</script>

<button onclick={() => new_automata_dialog.showModal()}> New </button>

<dialog bind:this={new_automata_dialog}>
    <div>
        <h2>New Automata Type</h2>

        <label for="new_automata_name">Automata Name</label>
        <input
            type="text"
            name="new_automata_name"
            bind:value={automata_name}
        />

        <label for="new_automata_type">Select the type of Automata</label>
        <select name="new_automata_type" bind:value={selected_automata_type}>
            {#each automata_types as type}
                <option value={type}>{automata_type_formatted(type)}</option>
            {/each}
        </select>

        <span>
            <button
                onclick={() => {
                    const new_automata = automata_default(
                        selected_automata_type,
                    );
                    const new_automata_description: AutomataDescription = {
                        type: selected_automata_type,
                        name: automata_name,
                        machine: new_automata,
                        test_cases: [],
                    };
                    set_automata_description(new_automata_description);
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
        </span>
    </div>
</dialog>

<style>
    dialog {
        padding: 3px;
    }

    h2 {
        margin: 10px 5px;
    }

    div {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        padding: 5px;
    }

    label {
        margin-top: 10px;
        margin-bottom: 5px;
    }

    input {
        width: 90%;
        margin: 10px 0px;
        padding: 3px;

        font-size: medium;
        border-radius: 5px;
        border: solid 2px #000;
    }

    select {
        width: 100%;
        margin: 10px 0px;
        padding: 3px;
        font-size: medium;

        border-radius: 0;
        border: solid 2px #000;
        background: #fff;
    }

    span {
        margin: 10px 0px;
    }

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

        dialog span {
            width: 100%;
            flex-direction: row;
        }

        dialog button {
            font-size: medium;
            margin: 2px 0px;
            width: 100%;
        }
    }
</style>
