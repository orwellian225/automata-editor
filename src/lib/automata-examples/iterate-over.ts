import { ctm_type } from "$lib/automata-core/computation-turing-machine";

import type { AutomataDescription } from "$lib/automata-core/automata-description";

export const iterate_over_desc: AutomataDescription = {
    name: "Iterate Over String",
    type: ctm_type,
    test_cases: [],
    automata: {
        states: [
            {
                id: 0,
                label: "q0",
                diagram: {
                    position: { x: -100, y: 0 },
                    out_angle: -Math.PI / 2,
                },
            },
            {
                id: 1,
                label: "qH",
                diagram: {
                    position: { x: 100, y: 0 },
                    out_angle: -Math.PI / 2,
                },
            },
        ],
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 0,
                write_symbol: "0",
                direction: +1,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 0,
                write_symbol: "1",
                direction: +1,
            },
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: -1,
            },
        ],
        initial_state: 0,
        halt_state: 1,
    },
};
