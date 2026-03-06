import { dtm_type } from "$lib/automata-core/decision-turing-machine";
import type { AutomataDescription } from "$lib/automata-core/automata-description";

export const mssi_example_desc: AutomataDescription = {
    name: "Multistep-Stationary Example",
    type: dtm_type,
    test_cases: [],
    automata: {
        states: [
            {
                id: 0,
                label: "q0",
                diagram: { position: { x: -100, y: 0 }, out_angle: 0 },
            },
            {
                id: 1,
                label: "q1",
                diagram: { position: { x: 100, y: 75 }, out_angle: 0 },
            },
            {
                id: 2,
                label: "q2",
                diagram: { position: { x: 100, y: -75 }, out_angle: 0 },
            },
        ],
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: 0,
            },
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 1,
                write_symbol: "0",
                direction: +2,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 2,
                write_symbol: "1",
                direction: -2,
            },
        ],
        initial_state: 0,
        accept_state: 1,
        reject_state: 2,
    },
};
