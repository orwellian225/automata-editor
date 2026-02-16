<script lang="ts">
    let show_description = $state(false);
    let show_table = $state(false);
    let show_diagram = $state(true);
    let show_computation = $state(false);
</script>

<header>
    <div class="menu">
        <button>Download</button>
        <button>Upload</button>
    </div>

    <nav>
        <button
            class:show-tab={show_description}
            onclick={() => (show_description = !show_description)}
            >Description</button
        >
        <button
            class:show-tab={show_table}
            onclick={() => (show_table = !show_table)}>Table</button
        >
        <button
            class:show-tab={show_diagram}
            onclick={() => (show_diagram = !show_diagram)}>Diagram</button
        >
        <button
            class:show-tab={show_computation}
            onclick={() => (show_computation = !show_computation)}
            >Computation</button
        >
    </nav>
</header>

<main>
    <div
        class="tab"
        class:tab-show={show_description}
        class:tab-hide={!show_description}
    >
        <h1>Description</h1>
    </div>

    <div class="tab" class:tab-show={show_table} class:tab-hide={!show_table}>
        <h1>Table</h1>
    </div>
    <div
        class="tab"
        class:tab-show={show_diagram}
        class:tab-hide={!show_diagram}
    >
        <h1>Diagram</h1>
    </div>
    <div
        class="tab"
        class:tab-show={show_computation}
        class:tab-hide={!show_computation}
    >
        <h1>Computation</h1>
    </div>

    <div
        class="tab"
        class:tab-show={!show_description &&
            !show_table &&
            !show_diagram &&
            !show_computation}
        class:tab-hide={show_description ||
            show_table ||
            show_diagram ||
            show_computation}
    >
        There is no thing to see here. Enable one of the other tabs to the view
        the current machine.
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Berkeley Mone", monospace;
    }

    header {
        width: 100vw;
        height: 7vh;

        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: space-evenly;
    }

    main {
        width: 100vw;
        height: 93vh;

        display: flex;
        flex-direction: row;
    }

    .tab-show {
        display: flex;
    }
    .tab-hide {
        display: none;
    }
    .tab {
        width: 100%;
        outline: 2px solid blue;
        margin: 4px;
    }

    button {
        background: #fff;
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

    .menu button {
        width: 120px;
        height: fit-content;
    }

    nav button {
        width: 200px;
        height: fit-content;
    }

    nav button.show-tab {
        border-bottom: 4px solid #000;
    }
</style>
