<script lang="ts">
    import Stats from "stats.js";

    import type { Attachment } from "svelte/attachments";
    import Camera from "$lib/camera";
    import { get_automata_description } from "$lib/automata_description.svelte";
    import { automata_renderer } from "$lib/automata-render/automata-renderer";

    const machine_description = $derived(get_automata_description());
    const machine_renderer = $derived(
        automata_renderer(machine_description.type),
    );

    const attach_diagram_canvas: Attachment = (element: Element) => {
        const canvas = element as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            throw new Error("Failed to load 2D Canvas Context");
        }

        const camera = new Camera(ctx);

        let frame_id: number = 0;
        let needs_redraw = false;
        let frame_pending = false;
        const request_frame = () => {
            if (frame_pending) return;

            frame_pending = true;
            frame_id = requestAnimationFrame(
                (timestamp: DOMHighResTimeStamp) => {
                    frame_pending = false;

                    if (needs_redraw) {
                        needs_redraw = false;
                        draw_diagram(ctx, camera, timestamp);
                    }
                },
            );
        };

        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            canvas.width = width;
            canvas.height = height;
            camera.updateViewport();

            needs_redraw = true;
            request_frame();
        });

        const resize_target = canvas.parentElement ?? canvas;
        observer.observe(resize_target);

        $effect(() => {
            machine_description.automata;
            needs_redraw = true;
            request_frame();
        });

        let camera_panning = false;
        const camera_on_mousedown = (event: MouseEvent) => {
            if (event.button === 2) {
                camera_panning = true;
            }
        };
        const camera_on_mouseup = (event: MouseEvent) => {
            if (event.button === 2) {
                camera_panning = false;
            }
        };
        const camera_on_mouseleave = (event: MouseEvent) => {
            camera_panning = false;
        };
        const camera_on_mousemove = (event: MouseEvent) => {
            if (camera_panning) {
                camera.moveTo(
                    camera.lookAt[0] - event.movementX,
                    camera.lookAt[1] - event.movementY,
                );
                needs_redraw = true;
                request_frame();
            }
        };
        const camera_on_wheel = (event: WheelEvent) => {
            camera.zoomTo(camera.distance + event.deltaY / 2);
            needs_redraw = true;
            request_frame();
        };
        const camera_on_contextmenu = (event: MouseEvent) => {
            event.preventDefault();
        };

        canvas.addEventListener("mousedown", camera_on_mousedown);
        canvas.addEventListener("mouseup", camera_on_mouseup);
        canvas.addEventListener("mouseleave", camera_on_mouseleave);
        canvas.addEventListener("mousemove", camera_on_mousemove);
        canvas.addEventListener("wheel", camera_on_wheel);
        canvas.addEventListener("contextmenu", camera_on_contextmenu);

        return () => {
            canvas.removeEventListener("mousedown", camera_on_mousedown);
            canvas.removeEventListener("mouseup", camera_on_mouseup);
            canvas.removeEventListener("mouseleave", camera_on_mouseleave);
            canvas.removeEventListener("mousemove", camera_on_mousemove);
            canvas.removeEventListener("wheel", camera_on_wheel);
            canvas.removeEventListener("contextmenu", camera_on_contextmenu);

            cancelAnimationFrame(frame_id);
            observer.disconnect();
        };
    };

    const draw_diagram = (
        ctx: CanvasRenderingContext2D,
        camera: Camera,
        timestamp: DOMHighResTimeStamp,
    ) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        camera.begin();

        machine_renderer(ctx, machine_description.automata);

        camera.end();
    };
</script>

<div>
    <canvas {@attach attach_diagram_canvas}></canvas>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
    canvas {
        width: 100%;
        height: 100%;
        outline: 2px solid #ccc;
    }
</style>
