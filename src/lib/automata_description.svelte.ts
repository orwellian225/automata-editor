import type { DecisionTuringMachine } from "./automata-core/decision-turing-machine";

export const format_type = (type: string): string => {
    if (type === "decision_tm") {
        return "Decision Turing Machine";
    }
};

export type MachineDescription = {
    type: "decision_tm";
    machine: DecisionTuringMachine;
};

export let machine_description = $state<MachineDescription>({
    type: "decision_tm",
    machine: {
        states: [
            { id: 0, label: "0", diagram: { position: { x: -200, y: 0 } } },
            { id: 1, label: "1", diagram: { position: { x: 0, y: 0 } } },
            { id: 2, label: "2", diagram: { position: { x: 200, y: -75 } } },
            { id: 3, label: "3", diagram: { position: { x: 200, y: 75 } } },
        ],
        problem_alphabet: ["0", "1"],
        tape_alphabet: ["_"],
        transitions: [
            {
                curr_state_id: 0,
                read_symbol: "0",
                next_state_id: 1,
                write_symbol: "1",
                direction: 2,
            },
            {
                curr_state_id: 0,
                read_symbol: "1",
                next_state_id: 1,
                write_symbol: "0",
                direction: -2,
            },
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 0,
                write_symbol: "_",
                direction: 0,
            },
            {
                curr_state_id: 0,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "1",
                direction: 0,
            },
            {
                curr_state_id: 1,
                read_symbol: "0",
                next_state_id: 2,
                write_symbol: "0",
                direction: 1,
            },
            {
                curr_state_id: 1,
                read_symbol: "1",
                next_state_id: 3,
                write_symbol: "1",
                direction: -1,
            },
            {
                curr_state_id: 1,
                read_symbol: "_",
                next_state_id: 1,
                write_symbol: "_",
                direction: 1,
            },
            {
                curr_state_id: 2,
                read_symbol: "0",
                next_state_id: 2,
                write_symbol: "0",
                direction: 1,
            },
            {
                curr_state_id: 2,
                read_symbol: "1",
                next_state_id: 2,
                write_symbol: "1",
                direction: -1,
            },
            {
                curr_state_id: 2,
                read_symbol: "_",
                next_state_id: 2,
                write_symbol: "_",
                direction: 1,
            },
            {
                curr_state_id: 3,
                read_symbol: "0",
                next_state_id: 3,
                write_symbol: "0",
                direction: 1,
            },
            {
                curr_state_id: 3,
                read_symbol: "1",
                next_state_id: 3,
                write_symbol: "1",
                direction: -1,
            },
            {
                curr_state_id: 3,
                read_symbol: "_",
                next_state_id: 3,
                write_symbol: "_",
                direction: 1,
            },
        ],
        initial_state: 0,
        accept_state: 2,
        reject_state: 3,
    },
});
