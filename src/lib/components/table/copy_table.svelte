<script lang="ts">
    import { get_automata_description } from "$lib/automata_description.svelte";
    import {
        automata_transition_table,
        type AutomataTransitionTableRules,
    } from "$lib/automata-core/automata-description";

    let copy_table_dialog: HTMLDialogElement;
    const table_rules = $state<AutomataTransitionTableRules>({
        states: "symbol",
        symbols: "symbol",
        direction: "symbol",
        counter_base: 10,
        field_seperator: "#",
        transition_seperator: ";",
    });

    let table_preview = $derived(
        automata_transition_table(get_automata_description(), table_rules, 3),
    );
    let table = $derived(
        automata_transition_table(
            get_automata_description(),
            table_rules,
            undefined,
        ),
    );
</script>

<button onclick={() => copy_table_dialog.showModal()}>Download Table</button>

<dialog bind:this={copy_table_dialog}>
    <div>
        <span class="repr-item">
            <label for="state_repr">State Representation</label>
            <select name="state_repr" bind:value={table_rules.states}>
                <option value="symbol">Symbol</option>
                <option value="counter">Counter</option>
            </select>
        </span>

        <span class="repr-item">
            <label for="sym_repr">Symbol Representation</label>
            <select name="sym_repr" bind:value={table_rules.symbols}>
                <option value="symbol">Symbol</option>
                <option value="counter">Counter</option>
            </select>
        </span>

        <span class="repr-item">
            <label for="dir_repr">Direction Representation</label>
            <select name="dir_repr" bind:value={table_rules.direction}>
                <option value="symbol">Symbol</option>
                <option value="counter">Counter</option>
            </select>
        </span>

        <span class="repr-item">
            <label for="counter_base">Counter base</label>
            <input
                name="counter_base"
                type="number"
                bind:value={table_rules.counter_base}
            />
        </span>

        <span class="repr-item">
            <label for="field_seperator">Field Seperator</label>
            <input
                name="field_seperator"
                type="text"
                value={table_rules.field_seperator.replace(/\n/g, "\\n")}
                oninput={(e) => {
                    table_rules.field_seperator = e.currentTarget.value.replace(
                        /\\n/g,
                        "\n",
                    );
                }}
            />
        </span>

        <span class="repr-item">
            <label for="transition_seperator">Transition Seperator</label>
            <input
                name="transition_seperator"
                type="text"
                value={table_rules.transition_seperator.replace(/\n/g, "\\n")}
                oninput={(e) => {
                    table_rules.transition_seperator =
                        e.currentTarget.value.replace(/\\n/g, "\n");
                }}
            />
        </span>

        <p class="table-preview">{table_preview}</p>

        <span>
            <button
                onclick={() => {
                    const data = table;
                    const blob = new Blob([data], { type: "application/text" });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "automata_transition_table.txt";
                    a.click();

                    URL.revokeObjectURL(url);
                    a.remove();
                }}>Download</button
            >
            <button
                onclick={() => {
                    navigator.clipboard.writeText(table);
                }}>Copy</button
            >
            <button onclick={() => copy_table_dialog.close()}>Cancel</button>
        </span>
    </div>
</dialog>

<style>
    div {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: start;

        padding: 5px;
    }

    div p {
        width: 100%;
        text-align: center;
    }

    .repr-item {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    button {
        width: 180px;
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
