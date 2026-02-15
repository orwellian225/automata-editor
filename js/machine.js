class AutomataState {
    static #state_counter = 0;
    constructor(name) {
        this.name = name;
        this.identifier = AutomataState.#state_counter++;

        this.diagram = {
            position: [0, 0],
            radius: 20,
            radius_offset: 5,
            modifiers: [],
        };
    }

    equals(other) {
        return this.identifier === other.identifier;
    }

    add_draw_modifier(modifier_name, border_colour) {
        this.diagram.modifiers.push({
            name: modifier_name,
            color: border_colour,
        });
    }
    remove_draw_modifier(modifier_name) {
        for (const modifier of this.diagram.modifiers) {
            if (modifier.name === modifier_name) {
                this.diagram.modifiers.splice(
                    this.diagram.modifiers.indexOf(modifier),
                    1,
                );
                break;
            }
        }
    }

    draw_state(ctx, state_params = {}) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";

        ctx.beginPath();
        ctx.arc(
            this.diagram.position[0],
            this.diagram.position[1],
            this.diagram.radius,
            0,
            2 * Math.PI,
        );
        ctx.closePath();
        ctx.stroke();

        for (const [index, modifier] of this.diagram.modifiers.entries()) {
            ctx.strokeStyle = modifier.color;
            ctx.beginPath();
            ctx.arc(
                this.diagram.position[0],
                this.diagram.position[1],
                this.diagram.radius - (index + 1) * 3,
                0,
                2 * Math.PI,
            );
            ctx.closePath();
            ctx.stroke();
        }

        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            this.name,
            this.diagram.position[0],
            this.diagram.position[1] + 1,
        );
    }

    draw_transition_to_other(ctx, next_state, transitions) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        const dx = next_state.diagram.position[0] - this.diagram.position[0];
        const dy = next_state.diagram.position[1] - this.diagram.position[1];
        const len = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const origin_point = [
            this.diagram.position[0] +
                (this.diagram.radius + this.diagram.radius_offset) *
                    Math.cos(angle),
            this.diagram.position[1] +
                (this.diagram.radius + this.diagram.radius_offset) *
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

        const mid_x = this.diagram.position[0] + dx / 2;
        const mid_y = this.diagram.position[1] + dy / 2;
        const offset = -13;
        const text_angle = Math.atan2(dy, dx);

        for (const [
            idx,
            [read_symbol, write_symbol, direction],
        ] of transitions.entries()) {
            ctx.font = "12px Arial";
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

    draw_transition_to_self(ctx, transitions, transition_params = {}) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        const origin_angle = 0;
        const terminal_angle = -Math.PI / 4;
        const origin_point = [
            this.diagram.position[0] +
                (this.diagram.radius + this.diagram.radius_offset) *
                    Math.cos(origin_angle),
            this.diagram.position[1] +
                (this.diagram.radius + this.diagram.radius_offset) *
                    Math.sin(origin_angle),
        ];
        const terminal_point = [
            this.diagram.position[0] +
                (this.diagram.radius + this.diagram.radius_offset) *
                    Math.cos(terminal_angle),
            this.diagram.position[1] +
                (this.diagram.radius + this.diagram.radius_offset) *
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
        const to_mid_x = mid_x - this.diagram.position[0];
        const to_mid_y = mid_y - this.diagram.position[1];
        const to_mid_len = Math.hypot(to_mid_x, to_mid_y);
        const offset = -13;
        const offset_x = to_mid_x / to_mid_len;
        const offset_y = to_mid_y / to_mid_len;

        for (const [
            idx,
            [read_symbol, write_symbol, direction],
        ] of transitions.entries()) {
            ctx.font = "12px Arial";
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

    draw_transition(ctx, next_state, transitions, transition_params = {}) {
        if (this.equals(next_state)) {
            this.draw_transition_to_self(ctx, transitions, transition_params);
        } else {
            this.draw_transition_to_other(
                ctx,
                next_state,
                transitions,
                transition_params,
            );
        }
    }
}

class TuringMachine {
    static #initial_state_color = "#5555ff";

    constructor(
        states,
        problem_alphabet,
        tape_alphabet,
        transitions,
        initial_state_idx,
    ) {
        this.states = states;
        this.problem_alphabet = problem_alphabet;
        this.tape_alphabet = tape_alphabet;
        this.transitions = transitions;

        this.initial_state = this.states[initial_state_idx];
        this.initial_state.add_draw_modifier(
            "initial_state",
            TuringMachine.#initial_state_color,
        );
    }

    draw_machine(ctx, state_params) {
        for (const state of this.states) {
            state.draw_state(ctx, state_params);
        }

        for (const [state_idx, state_transitions] of Object.entries(
            this.transitions,
        )) {
            // Want to group transitions together if they go to the same state
            const grouped_transitions = {};

            for (const [
                read_symbol,
                [next_state_idx, write_symbol, direction],
            ] of Object.entries(state_transitions)) {
                if (grouped_transitions[next_state_idx]) {
                    grouped_transitions[next_state_idx].push([
                        read_symbol,
                        write_symbol,
                        direction,
                    ]);
                } else {
                    grouped_transitions[next_state_idx] = [
                        [read_symbol, write_symbol, direction],
                    ];
                }
            }

            for (const [next_state_idx, transitions] of Object.entries(
                grouped_transitions,
            )) {
                this.states[state_idx].draw_transition(
                    ctx,
                    this.states[next_state_idx],
                    transitions,
                );
            }
        }
    }
}

class DecisionTuringMachine extends TuringMachine {
    static #accept_state_color = "#55ff55";
    static #reject_state_color = "#ff5555";

    constructor(
        states,
        problem_alphabet,
        tape_alphabet,
        transitions,
        initial_state,
        accept_state_idx,
        reject_state_idx,
    ) {
        super(
            states,
            problem_alphabet,
            tape_alphabet,
            transitions,
            initial_state,
        );
        this.accept_state = this.states[accept_state_idx];
        this.accept_state.add_draw_modifier(
            "accept_state",
            DecisionTuringMachine.#accept_state_color,
        );
        this.reject_state = this.states[reject_state_idx];
        this.reject_state.add_draw_modifier(
            "reject_state",
            DecisionTuringMachine.#reject_state_color,
        );
    }

    update_accept_state(state_idx) {
        this.accept_state.remove_draw_modifier("accept_state");
        this.accept_state = this.states[state_idx];
        this.accept_state.add_draw_modifier(
            "accept_state",
            DecisionTuringMachine.#accept_state_color,
        );
    }
    update_reject_state(state_idx) {
        this.reject_state.remove_draw_modifier("reject_state");
        this.reject_state = this.states[state_idx];
        this.reject_state.add_draw_modifier(
            "reject_state",
            DecisionTuringMachine.#reject_state_color,
        );
    }

    is_deterministic() {
        return true;
    }
}
