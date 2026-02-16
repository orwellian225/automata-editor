import type { AutomataState } from "$lib/automata-core/automata-state";

import { direction_to_str } from "$lib/automata-core/automata-transition";

export type AutomataStateRenderModifier = {
    name: string;
    style: string;
    inside: boolean;
};

const state_rendering_params = {
    font: "12px Berkeley Mono",
    stroke_style: "#000",
    font_style: "#000",
    width: 3,
    radius: 20,
    offset_radius: 5,
    modifier_radius: 4,
};

export function draw_state(
    ctx: CanvasRenderingContext2D,
    state: AutomataState,
    modifiers: Array<AutomataStateRenderModifier>,
) {
    ctx.strokeStyle = state_rendering_params.stroke_style;
    ctx.lineWidth = state_rendering_params.width;
    ctx.beginPath();
    ctx.arc(
        state.diagram.position.x,
        state.diagram.position.y,
        state_rendering_params.radius,
        0,
        Math.PI * 2,
    );
    ctx.closePath();
    ctx.stroke();

    let outside_idx = 1;
    let inside_idx = 1;
    for (const modifier of modifiers) {
        const index = modifier.inside ? inside_idx++ : outside_idx++;

        ctx.strokeStyle = modifier.style;
        ctx.beginPath();
        ctx.arc(
            state.diagram.position.x,
            state.diagram.position.y,
            state_rendering_params.radius +
                (modifier.inside ? -1 : 1) *
                    index *
                    state_rendering_params.modifier_radius,
            0,
            Math.PI * 2,
        );
        ctx.closePath();
        ctx.stroke();
    }

    ctx.font = state_rendering_params.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = state_rendering_params.font_style;
    ctx.strokeStyle = state_rendering_params.font_style;
    ctx.fillText(
        state.label,
        state.diagram.position.x,
        state.diagram.position.y,
    );
}

const transition_rendering_params = {
    font: "12px Berkeley Mono",
    stroke_style: "#000",
    line_width: 2,
    text_offset: -13,
    bezier_control_radius: 40,
};

export function draw_qsqsd_transition(
    ctx: CanvasRenderingContext2D,
    curr_state: AutomataState,
    next_state: AutomataState,
    transition_info: Array<{
        read_symbol: string;
        write_symbol: string;
        direction: number;
    }>,
) {
    if (curr_state.id === next_state.id) {
        draw_qsqsd_transition_to_self(ctx, curr_state, transition_info);
    } else {
        draw_qsqsd_transition_to_other(
            ctx,
            curr_state,
            next_state,
            transition_info,
        );
    }
}

function draw_qsqsd_transition_to_other(
    ctx: CanvasRenderingContext2D,
    curr_state: AutomataState,
    next_state: AutomataState,
    transition_info: Array<{
        read_symbol: string;
        write_symbol: string;
        direction: number;
    }>,
) {
    ctx.strokeStyle = transition_rendering_params.stroke_style;
    ctx.fillStyle = transition_rendering_params.stroke_style;
    ctx.lineWidth = transition_rendering_params.line_width;

    const dx = next_state.diagram.position.x - curr_state.diagram.position.x;
    const dy = next_state.diagram.position.y - curr_state.diagram.position.y;
    const mid_x = curr_state.diagram.position.x + dx / 2;
    const mid_y = curr_state.diagram.position.y + dy / 2;
    const angle = Math.atan2(dy, dx);

    const origin = {
        x:
            curr_state.diagram.position.x +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.cos(angle),
        y:
            curr_state.diagram.position.y +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.sin(angle),
    };

    const terminal = {
        x:
            next_state.diagram.position.x +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.cos(angle - Math.PI),
        y:
            next_state.diagram.position.y +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.sin(angle - Math.PI),
    };

    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(terminal.x, terminal.y);
    ctx.stroke();
    ctx.closePath();

    // Arrow Head
    ctx.beginPath();
    ctx.moveTo(
        terminal.x + 2 * Math.cos(angle),
        terminal.y + 2 * Math.sin(angle),
    );

    ctx.lineTo(
        terminal.x - 9 * Math.cos(angle - Math.PI / 6),
        terminal.y - 9 * Math.sin(angle - Math.PI / 6),
    );
    ctx.lineTo(
        terminal.x - 9 * Math.cos(angle + Math.PI / 6),
        terminal.y - 9 * Math.sin(angle + Math.PI / 6),
    );

    ctx.lineTo(
        terminal.x + 2 * Math.cos(angle),
        terminal.y + 2 * Math.sin(angle),
    );
    ctx.closePath();
    ctx.fill();

    for (const [
        idx,
        { read_symbol, write_symbol, direction },
    ] of transition_info.entries()) {
        ctx.font = transition_rendering_params.font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.translate(mid_x, mid_y);
        ctx.rotate(angle);
        if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
            ctx.rotate(Math.PI);
        }

        ctx.fillText(
            `${read_symbol}, ${write_symbol}, ${direction_to_str(direction)}`,
            0,
            (idx + 1) * transition_rendering_params.text_offset,
        );
        ctx.restore();
    }
}

function draw_qsqsd_transition_to_self(
    ctx: CanvasRenderingContext2D,
    curr_state: AutomataState,
    transition_info: Array<{
        read_symbol: string;
        write_symbol: string;
        direction: number;
    }>,
) {
    ctx.strokeStyle = transition_rendering_params.stroke_style;
    ctx.fillStyle = transition_rendering_params.stroke_style;
    ctx.lineWidth = transition_rendering_params.line_width;

    const origin_angle = -Math.PI / 2;
    const terminal_angle = -Math.PI / 4;

    const origin = {
        x:
            curr_state.diagram.position.x +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.cos(origin_angle),
        y:
            curr_state.diagram.position.y +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.sin(origin_angle),
    };

    const terminal = {
        x:
            curr_state.diagram.position.x +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.cos(terminal_angle),
        y:
            curr_state.diagram.position.y +
            (state_rendering_params.radius +
                state_rendering_params.offset_radius) *
                Math.sin(terminal_angle),
    };

    const control_point_1 = {
        x:
            origin.x +
            transition_rendering_params.bezier_control_radius *
                Math.cos(origin_angle),
        y:
            origin.y +
            transition_rendering_params.bezier_control_radius *
                Math.sin(origin_angle),
    };

    const control_point_2 = {
        x:
            terminal.x +
            transition_rendering_params.bezier_control_radius *
                Math.cos(terminal_angle),
        y:
            terminal.y +
            transition_rendering_params.bezier_control_radius *
                Math.sin(terminal_angle),
    };

    const t = 0.5;
    const mid_t = 1 - t;
    const mid_x =
        mid_t ** 3 * origin.x +
        3 * mid_t ** 2 * t * control_point_1.x +
        3 * mid_t * t ** 2 * control_point_2.x +
        t ** 3 * terminal.x;
    const mid_y =
        mid_t ** 3 * origin.y +
        3 * mid_t ** 2 * t * control_point_1.y +
        3 * mid_t * t ** 2 * control_point_2.y +
        t ** 3 * terminal.y;

    const tangent_x =
        3 * mid_t ** 2 * (control_point_1.x - origin.x) +
        6 * mid_t * t * (control_point_2.x - control_point_1.x) +
        3 * t ** 2 * (terminal.x - control_point_2.x);
    const tangent_y =
        3 * mid_t ** 2 * (control_point_1.y - origin.y) +
        6 * mid_t * t * (control_point_2.y - control_point_1.y) +
        3 * t ** 2 * (terminal.y - control_point_2.y);
    const text_angle = Math.atan2(tangent_y, tangent_x);
    const to_mid_x = mid_x - curr_state.diagram.position.x;
    const to_mid_y = mid_y - curr_state.diagram.position.y;
    const to_mid_len = Math.hypot(to_mid_x, to_mid_y);
    const offset = -13;
    const offset_x = to_mid_x / to_mid_len;
    const offset_y = to_mid_y / to_mid_len;

    // Curve
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.bezierCurveTo(
        control_point_1.x,
        control_point_1.y,
        control_point_2.x,
        control_point_2.y,
        terminal.x,
        terminal.y,
    );
    ctx.stroke();
    ctx.closePath();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(
        terminal.x + 2 * Math.cos(terminal_angle - Math.PI),
        terminal.y + 2 * Math.sin(terminal_angle - Math.PI),
    );

    ctx.lineTo(
        terminal.x - 9 * Math.cos(terminal_angle - Math.PI - Math.PI / 6),
        terminal.y - 9 * Math.sin(terminal_angle - Math.PI - Math.PI / 6),
    );
    ctx.lineTo(
        terminal.x - 9 * Math.cos(terminal_angle - Math.PI + Math.PI / 6),
        terminal.y - 9 * Math.sin(terminal_angle - Math.PI + Math.PI / 6),
    );

    ctx.lineTo(
        terminal.x + 2 * Math.cos(terminal_angle - Math.PI),
        terminal.y + 2 * Math.sin(terminal_angle - Math.PI),
    );
    ctx.closePath();
    ctx.fill();

    // Transition Info
    for (const [
        idx,
        { read_symbol, write_symbol, direction },
    ] of transition_info.entries()) {
        ctx.font = transition_rendering_params.font;
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
}
