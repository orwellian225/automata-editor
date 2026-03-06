import { dtm_type } from "$lib/automata-core/decision-turing-machine";
import type { AutomataDescription } from "$lib/automata-core/automata-description";

export const msi_infinite_oscillation_desc: AutomataDescription = {
    name: "MS-Instr Infinite Oscillation",
    type: dtm_type,
    test_cases: [],
    automata: {
        states: [
            {
                id: 0,
                label: "q0",
                diagram: { position: { x: -200, y: 0 }, out_angle: Math.PI },
            },
            {
                id: 1,
                label: "q1",
                diagram: { position: { x: 0, y: -50 }, out_angle: 0 },
            },
            {
                id: 2,
                label: "q2",
                diagram: { position: { x: 0, y: 50 }, out_angle: 0 },
            },
            {
                id: 3,
                label: "q3",
                diagram: { position: { x: 200, y: 0 }, out_angle: 0 },
            },
        ],
        initial_state: 0,
        accept_state: 1,
        reject_state: 2,
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 3,
                write_symbol: "_",
                direction: +2,
            },
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 0,
                write_symbol: "0",
                direction: +2,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 0,
                write_symbol: "1",
                direction: +2,
            },

            {
                curr_state_id: 3,
                read_symbol: "_",
                next_state_id: 0,
                write_symbol: "_",
                direction: -2,
            },
            {
                curr_state_id: 3,
                read_symbol: "0",
                next_state_id: 3,
                write_symbol: "0",
                direction: -2,
            },
            {
                curr_state_id: 3,
                read_symbol: "1",
                next_state_id: 3,
                write_symbol: "1",
                direction: -2,
            },
        ],
    },
};
