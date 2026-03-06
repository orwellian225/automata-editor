<script lang="ts">
    import { get_automata_description } from "$lib/automata_description.svelte";

    let cases: Array<string> = $derived(get_automata_description().test_cases);
    let show_resource_usage = $state(false);
</script>

<div>
    <span>
        <button>Run All</button>
        <button onclick={() => (show_resource_usage = !show_resource_usage)}
            >{show_resource_usage ? "Hide" : "Show"} Resource Usage</button
        >
    </span>

    <h2>Test Cases</h2>
    <table>
        <thead>
            <tr>
                <th>Input</th>
                <th>Output</th>
                <th>Status</th>
                <th class:hide={!show_resource_usage}>Time</th>
                <th class:hide={!show_resource_usage}>Space</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each cases as input_str, i}
                <tr>
                    <td>{`'${input_str}'`}</td>
                    <td>None</td>
                    <td>None</td>
                    <td class:hide={!show_resource_usage}>0</td>
                    <td class:hide={!show_resource_usage}>0</td>
                    <td><button>Set Active</button></td>
                    <td><button>Run</button></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <!-- <h2>Visualize Tape</h2> -->
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

    span button {
        width: 200px;
        padding: 5px 2px;
        border: 2px solid #ccc;
        background-color: #fff;
    }

    span button:hover {
        border: 2px solid #888;
    }
    span button:active {
        border: 2px solid #000;
    }

    table {
        width: 100%;
        border: 1px solid #ccc;
        border-collapse: collapse;
        text-align: center;
    }

    tr {
        padding: 0px 5px;
    }

    th,
    td {
        padding: 2px 5px;
    }

    td button {
        width: 100px;
        border: 0;
        border-right: 2px solid #ccc;
        border-left: 2px solid #ccc;
        background-color: #fff;
    }

    td button:hover {
        border-right: 2px solid #888;
        border-left: 2px solid #888;
    }

    td button:active {
        border-right: 2px solid #000;
        border-left: 2px solid #000;
    }

    .hide {
        display: none;
    }
</style>
