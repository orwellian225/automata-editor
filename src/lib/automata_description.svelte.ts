import type { DecisionTuringMachine } from "./automata-core/decision-turing-machine";

export const format_type = (type: string): string => {
    if (type === "decision_tm") {
        return "Decision Turing Machine";
    }
};

export type MachineDescription = {
    type: "decision_tm";
    machine: DecisionTuringMachine;
    test_cases: Array<string>;
};

const is_even: MachineDescription = {
    type: "decision_tm",
    test_cases: [],
    machine: {
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

let machine_description = $state<MachineDescription>(is_even);
export function set_machine_description(description: MachineDescription) {
    machine_description = description;
}
export function get_machine_description(): MachineDescription {
    return machine_description;
}
