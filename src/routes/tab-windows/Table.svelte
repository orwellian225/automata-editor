<script lang="ts">
    import { get_automata_description } from "$lib/automata_description.svelte";
    import { direction_to_str } from "$lib/automata-core/automata-transition";
    import CopyTable from "$lib/components/table/copy_table.svelte";

    const machine_description = $derived(get_automata_description());
    const transitions = $derived(machine_description.automata.transitions);
</script>

<div>
    <span>
        <CopyTable />
    </span>

    <table>
        <thead>
            <tr>
                <th> Current State </th>
                <th> Read Symbol </th>
                <th> &#10230; </th>
                <th> Next State </th>
                <th> Write Symbol</th>
                <th> Direction </th>
            </tr>
        </thead>
        <tbody>
            {#each transitions as transition}
                {@const {
                    curr_state_id,
                    read_symbol,
                    next_state_id,
                    write_symbol,
                    direction,
                } = transition}
                {@const current_state =
                    machine_description.automata.states.find(
                        (state) => state.id === curr_state_id,
                    )}
                {@const next_state = machine_description.automata.states.find(
                    (state) => state.id === next_state_id,
                )}
                {#if current_state && next_state}
                    <tr>
                        <td>{current_state.label}</td>
                        <td>{`'${read_symbol}'`}</td>
                        <td> &#10230; </td>
                        <td>{next_state.label}</td>
                        <td>{`'${write_symbol}'`}</td>
                        <td>{direction_to_str(direction)}</td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
    div {
        width: 100%;
        height: 100%;

        margin: 0;
        padding: 10px;

        overflow-y: auto;
        overflow-x: hidden;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
    }

    span {
        margin-bottom: 10px;
        padding: 5px;
    }

    table {
        width: 100%;

        border: 1px solid #ccc;
        border-collapse: collapse;

        text-align: center;
    }

    tbody {
        overflow-y: auto;
    }

    thead {
        border: 2px solid #ccc;
    }

    th,
    td {
        padding: 2px 5px;
    }
</style>
