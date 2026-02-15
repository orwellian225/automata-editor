const diagram_canvas = document.getElementById("diagram_canvas");
const diagram_ctx = diagram_canvas.getContext("2d");
const diagram_div = document.getElementById("tab-diag-win");

document.addEventListener("contextmenu", (event) => {
    if (event.target === diagram_canvas || event.target === diagram.div) {
        event.preventDefault();
    }
});

let camera_drag = false;
const diagram_camera = new Camera(diagram_ctx, {
    distance: diagram_canvas.width * 10,
    initial_position: [0, 0],
});
diagram_camera.updateViewport();

function draw() {
    diagram_ctx.clearRect(0, 0, diagram_canvas.width, diagram_canvas.height);
    diagram_camera.begin();
    machine.draw_machine(diagram_ctx, {});
    diagram_camera.end();
    requestAnimationFrame(draw);
}

diagram_canvas.addEventListener("mousemove", (event) => {
    if (camera_drag) {
        diagram_camera.moveTo(
            diagram_camera.lookAt[0] - event.movementX,
            diagram_camera.lookAt[1] - event.movementY,
        );
    }
});
diagram_canvas.addEventListener("mousedown", (event) => {
    if (event.button === 2) {
        camera_drag = true;
    }
});
diagram_canvas.addEventListener("mouseup", (event) => {
    if (event.button === 2) {
        camera_drag = false;
    }
});
diagram_canvas.addEventListener("wheel", (event) => {
    diagram_camera.zoomTo(diagram_camera.distance + event.deltaY / 2);
});

const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        diagram_canvas.width = entry.contentRect.width;
        diagram_canvas.height = entry.contentRect.height;

        diagram_camera.updateViewport();
        draw();
    }
});
observer.observe(diagram_div);

const states = [
    new AutomataState("0"),
    new AutomataState("1"),
    new AutomataState("2"),
    new AutomataState("3"),
];

states[0].diagram.position = [200, 300];
states[1].diagram.position = [400, 300];
states[2].diagram.position = [600, 250];
states[3].diagram.position = [600, 350];

const machine = new DecisionTuringMachine(
    states,
    ["a", "b"],
    ["_"],
    {
        0: {
            a: [1, "a", +1],
            b: [1, "b", -1],
        },
        1: {
            a: [2, "a", +1],
            b: [3, "b", -1],
        },
        2: {
            a: [2, "a", +1],
            b: [2, "b", -1],
        },
        3: {
            a: [3, "a", +1],
            b: [3, "b", -1],
        },
    },
    0,
    2,
    3,
);

draw();
