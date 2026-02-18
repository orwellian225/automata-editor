<script lang="ts">
    import { get_machine_description } from "$lib/automata_description.svelte";
    import { direction_to_str } from "$lib/automata-core/automata-transition";

    const machine_description = get_machine_description();
    const transitions = machine_description.machine.transitions;
</script>

<div>
    <h1>Transition Table</h1>

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
                {@const current_state = machine_description.machine.states.find(
                    (state) => state.id === curr_state_id,
                )}
                {@const next_state = machine_description.machine.states.find(
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

    table {
        width: 100%;

        border: 1px solid #ccc;
        border-collapse: collapse;

        text-align: center;
    }

    thead {
        border: 2px solid #ccc;
    }

    th,
    td {
        padding: 2px 5px;
    }
</style>
