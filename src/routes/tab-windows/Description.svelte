<script lang="ts">
    import {
        get_machine_description,
        format_type,
    } from "$lib/automata_description.svelte";

    const machine_description = get_machine_description();
    const num_transitions = machine_description.machine.transitions.length;
    const num_expected_transitions =
        machine_description.machine.states.length *
        (machine_description.machine.problem_alphabet.length +
            machine_description.machine.tape_alphabet.length);
    const is_deterministic = num_transitions === num_expected_transitions;
    const num_transition_display =
        num_transitions === num_expected_transitions
            ? `${num_transitions}`
            : num_transitions > num_expected_transitions
              ? `${num_transitions} > ${num_expected_transitions}`
              : `${num_transitions} < ${num_expected_transitions}`;

    const initial_state = machine_description.machine.states.find(
        (state) => state.id === machine_description.machine.initial_state,
    );
    const accept_state = machine_description.machine.states.find(
        (state) => state.id === machine_description.machine.accept_state,
    );
    const reject_state = machine_description.machine.states.find(
        (state) => state.id === machine_description.machine.reject_state,
    );
</script>

<div>
    <h1>Description</h1>

    <table>
        <tbody>
            <tr>
                <th>Type</th>
                <td>{format_type(machine_description.type)}</td>
            </tr>
            <tr>
                <th>Number of states</th>
                <td>{machine_description.machine.states.length}</td>
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
                <th>Number of transitions</th>
                <td>{num_transition_display}</td>
            </tr>
            <tr>
                <th>Initial State</th>
                <td>{initial_state ? initial_state.label : "N/A"}</td>
            </tr>
            <tr>
                <th>Accept State</th>
                <td>{accept_state ? accept_state.label : "N/A"}</td>
            </tr>
            <tr>
                <th>Reject State</th>
                <td>{reject_state ? reject_state.label : "N/A"}</td>
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
    }

    table td,
    table th {
        padding: 8px 5px;
        width: fit-content;
        text-align: left;
        border: 1px solid #ccc;
    }
</style>
