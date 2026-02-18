<script lang="ts">
    import type { Attachment } from "svelte/attachments";
    import Camera from "$lib/camera";
    import { draw_decision_turing_machine } from "$lib/automata-render/decision-turing-machine";
    import { get_machine_description } from "$lib/automata_description.svelte";

    const machine_description = get_machine_description();
    const attach_diagram_canvas: Attachment = (element: Element) => {
        const canvas = element as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            throw new Error("Failed to load 2D Canvas Context");
        }

        const camera = new Camera(ctx);

        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            canvas.width = width;
            canvas.height = height;
            camera.updateViewport();
        });

        const resize_target = canvas.parentElement ?? canvas;
        observer.observe(resize_target);

        let frame_id: number = 0;
        const loop = (timestamp: DOMHighResTimeStamp) => {
            draw_diagram(ctx, camera, timestamp);
            frame_id = requestAnimationFrame(loop);
        };
        frame_id = requestAnimationFrame(loop);

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
            }
        };
        const camera_on_wheel = (event: WheelEvent) => {
            camera.zoomTo(camera.distance + event.deltaY / 2);
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

        switch (machine_description.type) {
            case "decision_tm":
                draw_decision_turing_machine(ctx, machine_description.machine);
                break;
        }

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
