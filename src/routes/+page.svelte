<script lang="ts">
    import { encode, decode } from "base64-compressor";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    import {
        get_automata_description,
        set_automata_description,
        AutomatatDescriptionSchema,
    } from "$lib/automata_description.svelte";

    import Diagram from "./tab-windows/Diagram.svelte";
    import Description from "./tab-windows/Description.svelte";
    import Table from "./tab-windows/Table.svelte";
    import Computation from "./tab-windows/Computation.svelte";

    import NewAutomata from "$lib/components/menu/new_automata.svelte";
    import UploadAutomata from "$lib/components/menu/upload_automata.svelte";
    import DownloadAutomata from "$lib/components/menu/download_automata.svelte";

    let show_description = $state(false);
    let show_table = $state(false);
    let show_diagram = $state(true);
    let show_computation = $state(false);

    onMount(async () => {
        const raw_automata = page.url.searchParams.get("automata_desc");
        if (raw_automata) {
            const parse_res = AutomatatDescriptionSchema.safeParse(
                await decode(raw_automata),
            );
            if (parse_res.success) {
                set_automata_description(parse_res.data);
            }
        }
    });

    $effect(() => {
        encode(get_automata_description()).then((encoded_automata: string) => {
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
        <DownloadAutomata />
        <UploadAutomata />
        <NewAutomata />
    </div>

    <p>{get_automata_description().name}</p>

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

    .menu {
        width: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    nav button {
        width: 200px;
        height: fit-content;
    }

    nav button.show-tab {
        border-bottom: 4px solid #000;
    }

    @media (max-width: 800px) {
        .menu {
            width: 35%;
        }

        header p {
            display: none;
        }

        nav button {
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: small;
        }
    }
</style>
