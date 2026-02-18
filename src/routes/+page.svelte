<script lang="ts">
    import { encode, decode } from "base64-compressor";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    import {
        get_machine_description,
        set_machine_description,
    } from "$lib/automata_description.svelte";

    import Diagram from "./tab-windows/Diagram.svelte";
    import Description from "./tab-windows/Description.svelte";
    import Table from "./tab-windows/Table.svelte";
    import Computation from "./tab-windows/Computation.svelte";

    let show_description = $state(false);
    let show_table = $state(false);
    let show_diagram = $state(true);
    let show_computation = $state(false);

    onMount(async () => {
        const raw_automata = page.url.searchParams.get("automata_desc");
        if (raw_automata) {
            set_machine_description(await decode(raw_automata));
        }
    });

    $effect(() => {
        encode(get_machine_description()).then((encoded_automata: string) => {
            const url = new URL(page.url);
            url.searchParams.set("automata_desc", encoded_automata);
            goto(url.toString(), {
                replaceState: true,
                noScroll: true,
                keepFocus: true,
            });
        });
    });
</script>

<svelte:window on:wheel|nonpassive={(e: WheelEvent) => e.preventDefault()} />

<header>
    <div class="menu">
        <button onclick={() => alert("TODO")}>Download</button>
        <button onclick={() => alert("TODO")}>Upload</button>
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
        class="tab description"
        class:tab-show={show_description}
        class:tab-hide={!show_description}
    >
        <Description />
    </div>

    <div class="tab" class:tab-show={show_table} class:tab-hide={!show_table}>
        <Table />
    </div>
    <div
        class="tab"
        class:tab-show={show_diagram}
        class:tab-hide={!show_diagram}
    >
        <Diagram />
    </div>
    <div
        class="tab"
        class:tab-show={show_computation}
        class:tab-hide={!show_computation}
    >
        <Computation />
    </div>

    <div
        class="tab background"
        class:tab-show={!show_description &&
            !show_table &&
            !show_diagram &&
            !show_computation}
        class:tab-hide={show_description ||
            show_table ||
            show_diagram ||
            show_computation}
    >
        <p>There is nothing to see here.</p>

        <p>
            <em
                >Created by <a href="https://seagrass.co.za"
                    >Brendan Griffiths</a
                > 2026</em
            >
        </p>
        <p>
            <em
                >Code available on <a
                    href="https://github.com/orwellian225/automata-editor"
                    >Github</a
                ></em
            >
        </p>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overscroll-behavior: contain;
        font-family: "Berkeley Mono", monospace;
    }

    header {
        width: 100vw;
        height: 7vh;
        min-height: fit-content;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        align-items: center;
        justify-content: space-evenly;
    }

    main {
        width: 100vw;
        height: 93vh;

        display: flex;
        flex-direction: row;
        overflow: hidden;
    }

    .tab-show {
        display: flex;
    }
    .tab-hide {
        display: none;
    }
    .tab {
        width: 100%;
        margin: 4px;
    }

    .tab.description {
        width: 100%;
    }

    .tab-show.background {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        padding: 20px;

        font-size: large;
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

    @media (max-width: 800px) {
        .menu button,
        nav button {
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: small;
        }
    }
</style>
