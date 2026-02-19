<script lang="ts">
    import type { AutomataStateID } from "$lib/automata-core/automata-state";
    import {
        get_machine_description,
        automata_properties,
        format_type,
    } from "$lib/automata_description.svelte";

    const machine_description = $derived(get_machine_description());
    const machine_props = $derived(
        automata_properties(machine_description.type),
    );

    const num_transitions = $derived(
        machine_props.expected_transitions(machine_description.machine),
    );
    const is_deterministic = $derived(
        machine_props.is_deterministic(machine_description.machine),
    );
    const initial_state = $derived(
        machine_props.state_id_to_state(
            machine_description.machine,
            machine_description.machine.initial_state,
        ),
    );
    const notable_states = $derived(
        machine_props.notable_states(machine_description.machine),
    );
</script>

<div>
    <table>
        <tbody>
            <tr>
                <th>Type</th>
                <td>{format_type(machine_description.type)}</td>
            </tr>
            <tr>
                <th>States</th>
                <td
                    >{machine_description.machine.states
                        .map((state) => state.label)
                        .join(", ")}</td
                >
            </tr>
            <tr>
                <th>Problem alphabet</th>
                <td
                    >{machine_description.machine.problem_alphabet
                        .map((sym) => `'${sym}'`)
                        .join(", ")}</td
                >
            </tr>
            <tr>
                <th>Tape alphabet</th>
                <td
                    >{machine_description.machine.tape_alphabet
                        .concat(machine_description.machine.problem_alphabet)
                        .map((sym) => `'${sym}'`)
                        .join(", ")}</td
                >
            </tr>
            <tr>
                <th>Initial State</th>
                <td>{initial_state ? initial_state.label : "N/A"} </td>
            </tr>
            {#each Object.entries(notable_states) as [label, state]}
                <tr>
                    <th>{label}</th>
                    <td>{state ? state.label : "N/A"}</td>
                </tr>
            {/each}
            <tr>
                <th></th>
            </tr>
            <tr>
                <th>Number of transitions</th>
                <td>{num_transitions}</td>
            </tr>
            <tr>
                <th>Deterministic</th>
                <td>{is_deterministic ? "Yes" : "No"}</td>
            </tr>
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
        margin: 5px 0px;
    }

    table td,
    table th {
        padding: 8px 5px;
        width: fit-content;
        text-align: left;
        border: 1px solid #ccc;
    }
</style>
