import { dtm_type } from "$lib/automata-core/decision-turing-machine";

import type { AutomataDescription } from "$lib/automata-core/automata-description";

export const is_odd_desc: AutomataDescription = {
    name: "Is Odd",
    type: dtm_type,
    test_cases: [],
    automata: {
        states: [
            { id: 0, label: "q0", diagram: { position: { x: -200, y: 0 } } },
            { id: 1, label: "q1", diagram: { position: { x: 0, y: 0 } } },
            { id: 2, label: "qA", diagram: { position: { x: 200, y: -75 } } },
            { id: 3, label: "qR", diagram: { position: { x: 200, y: 75 } } },
        ],
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: -1,
            },
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 0,
                write_symbol: "0",
                direction: 1,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 0,
                write_symbol: "1",
                direction: 1,
            },
            {
                curr_state_id: 1,
                read_symbol: "_",
                next_state_id: 3,
                write_symbol: "_",
                direction: 1,
            },
            {
                curr_state_id: 1,
                read_symbol: "0",
                next_state_id: 3,
                write_symbol: "0",
                direction: 1,
            },
            {
                curr_state_id: 1,
                read_symbol: "1",
                next_state_id: 2,
                write_symbol: "1",
                direction: 1,
            },
        ],
        initial_state: 0,
        accept_state: 2,
        reject_state: 3,
    },
};
