<script lang="ts">
    import {
        AutomatatDescriptionSchema,
        set_automata_description,
    } from "$lib/automata_description.svelte";
</script>

<button
    onclick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                const parse_res = AutomatatDescriptionSchema.safeParse(
                    JSON.parse(reader.result as string),
                );
                if (parse_res.success) {
                    set_automata_description(parse_res.data);
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }}>Upload</button
>

<style>
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
    }
</style>
