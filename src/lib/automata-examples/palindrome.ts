import { dtm_type } from "$lib/automata-core/decision-turing-machine";
import type { AutomataDescription } from "$lib/automata-core/automata-description";

export const palindrome_desc: AutomataDescription = {
    name: "Palindrome",
    type: dtm_type,
    test_cases: [],
    automata: {
        states: [
            {
                id: 0,
                label: "q0",
                diagram: { position: { x: -150, y: 0 }, out_angle: 0 },
            },
            {
                id: 1,
                label: "q1",
                diagram: { position: { x: 0, y: -50 }, out_angle: 0 },
            },
            {
                id: 2,
                label: "q2",
                diagram: { position: { x: 300, y: -50 }, out_angle: 0 },
            },

            {
                id: 3,
                label: "q3",
                diagram: {
                    position: { x: 0, y: -150 },
                    out_angle: -Math.PI / 2,
                },
            },
            {
                id: 4,
                label: "q4",
                diagram: { position: { x: 300, y: -150 }, out_angle: 0 },
            },

            {
                id: 5,
                label: "q5",
                diagram: { position: { x: 0, y: 150 }, out_angle: Math.PI / 2 },
            },
            {
                id: 6,
                label: "q6",
                diagram: { position: { x: 300, y: 150 }, out_angle: 0 },
            },

            {
                id: 7,
                label: "q7",
                diagram: { position: { x: 450, y: 0 }, out_angle: 0 },
            },
        ],
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        initial_state: 0,
        accept_state: 1,
        reject_state: 2,
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: +1,
            },
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 3,
                write_symbol: "_",
                direction: +1,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 5,
                write_symbol: "_",
                direction: +1,
            },

            {
                curr_state_id: 3,
                read_symbol: "_",
                next_state_id: 4,
                write_symbol: "_",
                direction: -1,
            },
            {
                curr_state_id: 3,
                read_symbol: "0",
                next_state_id: 3,
                write_symbol: "0",
                direction: +1,
            },
            {
                curr_state_id: 3,
                read_symbol: "1",
                next_state_id: 3,
                write_symbol: "1",
                direction: +1,
            },
            {
                curr_state_id: 4,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: +1,
            },
            {
                curr_state_id: 4,
                read_symbol: "0",
                next_state_id: 7,
                write_symbol: "_",
                direction: -1,
            },
            {
                curr_state_id: 4,
                read_symbol: "1",
                next_state_id: 2,
                write_symbol: "1",
                direction: +1,
            },

            {
                curr_state_id: 5,
                read_symbol: "_",
                next_state_id: 6,
                write_symbol: "_",
                direction: -1,
            },
            {
                curr_state_id: 5,
                read_symbol: "0",
                next_state_id: 5,
                write_symbol: "0",
                direction: +1,
            },
            {
                curr_state_id: 5,
                read_symbol: "1",
                next_state_id: 5,
                write_symbol: "1",
                direction: +1,
            },
            {
                curr_state_id: 6,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: +1,
            },
            {
                curr_state_id: 6,
                read_symbol: "0",
                next_state_id: 2,
                write_symbol: "0",
                direction: +1,
            },
            {
                curr_state_id: 6,
                read_symbol: "1",
                next_state_id: 7,
                write_symbol: "_",
                direction: -1,
            },

            {
                curr_state_id: 7,
                read_symbol: "_",
                next_state_id: 0,
                write_symbol: "_",
                direction: +1,
            },
            {
                curr_state_id: 7,
                read_symbol: "0",
                next_state_id: 7,
                write_symbol: "0",
                direction: -1,
            },
            {
                curr_state_id: 7,
                read_symbol: "1",
                next_state_id: 7,
                write_symbol: "1",
                direction: -1,
            },
        ],
    },
};
