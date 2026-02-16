import type {
    AutomataState,
    AutomataStateID,
} from "$lib/automata-core/automata-state";

import type { DecisionTuringMachine } from "$lib/automata-core/decision-turing-machine";

import {
    draw_qsqsd_transition,
    draw_state,
    type AutomataStateRenderModifier,
} from "./automata-state";

export const draw_decision_turing_machine = (
    ctx: CanvasRenderingContext2D,
    machine: DecisionTuringMachine,
) => {
    for (const state of machine.states) {
        const state_modifiers: Array<AutomataStateRenderModifier> = [];

        if (state.id === machine.initial_state) {
            state_modifiers.push({
                name: "initial",
                style: "#0000ff",
                inside: true,
            });
        }

        if (state.id === machine.reject_state) {
            state_modifiers.push({
                name: "reject",
                style: "#ff0000",
                inside: true,
            });
        }

        if (state.id === machine.accept_state) {
            state_modifiers.push({
                name: "accept",
                style: "#00ff00",
                inside: true,
            });
        }

        draw_state(ctx, state, state_modifiers);
    }

    const group_by_state_transitions: any = {};
    for (const transition of machine.transitions) {
        if (group_by_state_transitions[transition.curr_state_id]) {
            if (
                group_by_state_transitions[transition.curr_state_id][
                    transition.next_state_id
                ]
            ) {
                group_by_state_transitions[transition.curr_state_id][
                    transition.next_state_id
                ].push({
                    read_symbol: transition.read_symbol,
                    write_symbol: transition.write_symbol,
                    direction: transition.direction,
                });
            } else {
                group_by_state_transitions[transition.curr_state_id][
                    transition.next_state_id
                ] = [
                    {
                        read_symbol: transition.read_symbol,
                        write_symbol: transition.write_symbol,
                        direction: transition.direction,
                    },
                ];
            }
        } else {
            group_by_state_transitions[transition.curr_state_id] = {};
            group_by_state_transitions[transition.curr_state_id][
                transition.next_state_id
            ] = [
                {
                    read_symbol: transition.read_symbol,
                    write_symbol: transition.write_symbol,
                    direction: transition.direction,
                },
            ];
        }
    }

    for (const [curr_state_id, curr_state_transitions] of Object.entries(
        group_by_state_transitions,
    )) {
        const curr_state = machine.states.find(
            (state) => state.id === Number.parseInt(curr_state_id, 10),
        );
        if (!curr_state) {
            continue;
        }

        for (const [next_state_id, next_state_transitions] of Object.entries(
            curr_state_transitions,
        )) {
            const next_state = machine.states.find(
                (state) => state.id === Number.parseInt(next_state_id, 10),
            );
            if (!next_state) {
                continue;
            }

            draw_qsqsd_transition(
                ctx,
                curr_state,
                next_state,
                next_state_transitions,
            );
        }
    }
};
