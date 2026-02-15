const _diagram_font = "12px Berkeley Mono";

function draw_machine(ctx, machine, editable = false) {
    for (const state of machine.states) {
        draw_state(ctx, state);
    }

    for (const [state_id, state_transitions] of Object.entries(
        machine.transitions,
    )) {
        // Want to group transitions together if they go to the same state
        const current_state = machine.states.find(
            (state) => state.identifier === Number.parseInt(state_id),
        );
        const grouped_transitions = {};

        for (const [
            read_symbol,
            [next_state_id, write_symbol, direction],
        ] of Object.entries(state_transitions)) {
            if (grouped_transitions[next_state_id]) {
                grouped_transitions[next_state_id].push([
                    read_symbol,
                    write_symbol,
                    direction,
                ]);
            } else {
                grouped_transitions[next_state_id] = [
                    [read_symbol, write_symbol, direction],
                ];
            }
        }

        for (const [next_state_id, transitions] of Object.entries(
            grouped_transitions,
        )) {
            const next_state = machine.states.find(
                (state) => state.identifier === Number.parseInt(next_state_id),
            );
            draw_transition(ctx, current_state, next_state, transitions);
        }
    }
}

function draw_state(ctx, state) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.arc(
        state.diagram.position[0],
        state.diagram.position[1],
        state.diagram.radius,
        0,
        2 * Math.PI,
    );
    ctx.closePath();
    ctx.stroke();

    let inside_index = 1;
    let outside_index = 1;
    for (const modifier of Object.values(state.diagram.modifiers)) {
        ctx.strokeStyle = modifier.colour;
        const radius =
            state.diagram.radius +
            (modifier.inside ? -inside_index : outside_index) * 3;

        if (modifier.inside) {
            inside_index++;
        } else {
            outside_index++;
        }

        ctx.beginPath();
        ctx.arc(
            state.diagram.position[0],
            state.diagram.position[1],
            radius,
            0,
            2 * Math.PI,
        );
        ctx.closePath();
        ctx.stroke();
    }

    ctx.font = _diagram_font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        state.name,
        state.diagram.position[0],
        state.diagram.position[1] + 1,
    );
}

function draw_transition(ctx, state, next_state, transitions) {
    if (state.identifier === next_state.identifier) {
        draw_transition_to_self(ctx, state, transitions);
    } else {
        this.draw_transition_to_other(ctx, state, next_state, transitions);
    }
}

function draw_transition_to_other(ctx, state, next_state, transitions) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    const dx = next_state.diagram.position[0] - state.diagram.position[0];
    const dy = next_state.diagram.position[1] - state.diagram.position[1];
    const len = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    const origin_point = [
        state.diagram.position[0] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.cos(angle),
        state.diagram.position[1] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.sin(angle),
    ];
    const terminal_point = [
        next_state.diagram.position[0] +
            (next_state.diagram.radius + next_state.diagram.radius_offset) *
                Math.cos(angle - Math.PI),
        next_state.diagram.position[1] +
            (next_state.diagram.radius + next_state.diagram.radius_offset) *
                Math.sin(angle - Math.PI),
    ];

    // Line between states
    ctx.beginPath();
    ctx.moveTo(origin_point[0], origin_point[1]);
    ctx.lineTo(terminal_point[0], terminal_point[1]);
    ctx.closePath();
    ctx.stroke();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(
        terminal_point[0] + 2 * Math.cos(angle),
        terminal_point[1] + 2 * Math.sin(angle),
    );

    ctx.lineTo(
        terminal_point[0] - 9 * Math.cos(angle - Math.PI / 6),
        terminal_point[1] - 9 * Math.sin(angle - Math.PI / 6),
    );
    ctx.lineTo(
        terminal_point[0] - 9 * Math.cos(angle + Math.PI / 6),
        terminal_point[1] - 9 * Math.sin(angle + Math.PI / 6),
    );

    ctx.lineTo(
        terminal_point[0] + 2 * Math.cos(angle),
        terminal_point[1] + 2 * Math.sin(angle),
    );
    ctx.closePath();
    ctx.fill();

    const mid_x = state.diagram.position[0] + dx / 2;
    const mid_y = state.diagram.position[1] + dy / 2;
    const offset = -13;
    const text_angle = Math.atan2(dy, dx);

    for (const [
        idx,
        [read_symbol, write_symbol, direction],
    ] of transitions.entries()) {
        ctx.font = _diagram_font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.translate(mid_x, mid_y);

        ctx.rotate(text_angle);
        if (text_angle > Math.PI / 2 || angle < -Math.PI / 2) {
            ctx.rotate(Math.PI);
        }

        ctx.fillText(
            `${read_symbol}, ${write_symbol}, ${direction}`,
            0,
            (idx + 1) * offset,
        );
        ctx.restore();
    }
}

function draw_transition_to_self(
    ctx,
    state,
    transitions,
    transition_params = {},
) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    const origin_angle = 0;
    const terminal_angle = -Math.PI / 4;
    const origin_point = [
        state.diagram.position[0] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.cos(origin_angle),
        state.diagram.position[1] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.sin(origin_angle),
    ];
    const terminal_point = [
        state.diagram.position[0] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.cos(terminal_angle),
        state.diagram.position[1] +
            (state.diagram.radius + state.diagram.radius_offset) *
                Math.sin(terminal_angle),
    ];

    const control_point_1 = [
        origin_point[0] + 40 * Math.cos(origin_angle),
        origin_point[1] + 40 * Math.sin(origin_angle),
    ];
    const control_point_2 = [
        terminal_point[0] + 40 * Math.cos(terminal_angle),
        terminal_point[1] + 40 * Math.sin(terminal_angle),
    ];

    ctx.beginPath();
    ctx.moveTo(origin_point[0], origin_point[1]);
    ctx.bezierCurveTo(
        control_point_1[0],
        control_point_1[1],
        control_point_2[0],
        control_point_2[1],
        terminal_point[0],
        terminal_point[1],
    );
    ctx.stroke();
    ctx.closePath();

    const t = 0.5;
    const mid_t = 1 - t;
    const mid_x =
        mid_t ** 3 * origin_point[0] +
        3 * mid_t ** 2 * t * control_point_1[0] +
        3 * mid_t * t ** 2 * control_point_2[0] +
        t ** 3 * terminal_point[0];
    const mid_y =
        mid_t ** 3 * origin_point[1] +
        3 * mid_t ** 2 * t * control_point_1[1] +
        3 * mid_t * t ** 2 * control_point_2[1] +
        t ** 3 * terminal_point[1];

    const tangent_x =
        3 * mid_t ** 2 * (control_point_1[0] - origin_point[0]) +
        6 * mid_t * t * (control_point_2[0] - control_point_1[0]) +
        3 * t ** 2 * (terminal_point[0] - control_point_2[0]);
    const tangent_y =
        3 * mid_t ** 2 * (control_point_1[1] - origin_point[1]) +
        6 * mid_t * t * (control_point_2[1] - control_point_1[1]) +
        3 * t ** 2 * (terminal_point[1] - control_point_2[1]);
    const text_angle = Math.atan2(tangent_y, tangent_x);
    const to_mid_x = mid_x - state.diagram.position[0];
    const to_mid_y = mid_y - state.diagram.position[1];
    const to_mid_len = Math.hypot(to_mid_x, to_mid_y);
    const offset = -13;
    const offset_x = to_mid_x / to_mid_len;
    const offset_y = to_mid_y / to_mid_len;

    for (const [
        idx,
        [read_symbol, write_symbol, direction],
    ] of transitions.entries()) {
        ctx.font = _diagram_font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.translate(
            mid_x + offset_x * Math.abs(offset) * (idx + 1),
            mid_y + offset_y * Math.abs(offset) * (idx + 1),
        );
        ctx.rotate(text_angle);
        if (text_angle > Math.PI / 2 || text_angle < -Math.PI / 2) {
            ctx.rotate(Math.PI);
        }
        ctx.fillText(`${read_symbol}, ${write_symbol}, ${direction}`, 0, 0);
        ctx.restore();
    }

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(
        terminal_point[0] + 2 * Math.cos(terminal_angle - Math.PI),
        terminal_point[1] + 2 * Math.sin(terminal_angle - Math.PI),
    );

    ctx.lineTo(
        terminal_point[0] -
            9 * Math.cos(terminal_angle - Math.PI - Math.PI / 6),
        terminal_point[1] -
            9 * Math.sin(terminal_angle - Math.PI - Math.PI / 6),
    );
    ctx.lineTo(
        terminal_point[0] -
            9 * Math.cos(terminal_angle - Math.PI + Math.PI / 6),
        terminal_point[1] -
            9 * Math.sin(terminal_angle - Math.PI + Math.PI / 6),
    );

    ctx.lineTo(
        terminal_point[0] + 2 * Math.cos(terminal_angle - Math.PI),
        terminal_point[1] + 2 * Math.sin(terminal_angle - Math.PI),
    );
    ctx.closePath();
    ctx.fill();
}

// class DiagramState {
//     static #font = "12px Berkeley Mono";

//     constructor(state_id) {
//         this.state_id = state_id;

//         this.position = [0, 0];
//         this.radius = 20;
//         this.radius_offset = 5;

//         this.modifiers = {};
//     }

//     add_modifier(name, colour, inside) {
//         this.modifiers[name] = { colour, inside };
//     }
//     remove_modifier(name) {
//         delete this.modifiers[name];
//     }
// }

// class MachineDiagram {
//     constructor(machine, diagram_states = []) {
//         this.diagram_states = diagram_states;

//         if (this.diagram_states.length === 0) {
//             const num_states = machine.states.length;
//             const initial_pos_radius = num_states * 20;
//             const initial_pos_angle = (2 * Math.PI) / num_states;

//             for (const state of machine.states) {
//                 let diag_state = new DiagramState(state.identifier);
//                 if (machine.initial_state.identifier === state.identifier) {
//                     diag_state.add_modifier("initial", "#0000ff", true);
//                 }
//                 if (
//                     machine.accept_state &&
//                     machine.accept_state.identifier === state.identifier
//                 ) {
//                     diag_state.add_modifier("accept", "#00ff00", true);
//                 }

//                 if (
//                     machine.reject_state &&
//                     machine.accept_state.identifier === state.identifier
//                 ) {
//                     diag_state.add_modifier("reject", "#ff0000", true);
//                 }

//                 diag_state.position = [
//                     initial_pos_radius * Math.cos(initial_pos_angle),
//                     initial_pos_radius * Math.sin(initial_pos_angle),
//                 ];

//                 this.diagram_states.push(diag_state);
//             }
//         }
//     }
// }
