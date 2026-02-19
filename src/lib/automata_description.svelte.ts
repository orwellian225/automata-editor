import {
    type DecisionTuringMachine,
    default_dtm,
    dtm_properties,
    dtm_type,
} from "./automata-core/decision-turing-machine";
import { draw_decision_turing_machine } from "./automata-render/decision-turing-machine";

import {
    type ComputationalTuringMachine,
    default_ctm,
    ctm_properties,
    ctm_type,
} from "./automata-core/computation-turing-machine";
import { draw_computational_turing_machine } from "./automata-render/computation-turing-machine";

export const automata_types = [dtm_type, ctm_type];

export const automata_default = (type: string) => {
    if (type === dtm_type) {
        return default_dtm;
    } else if (type === ctm_type) {
        return default_ctm;
    }
};

export const automata_renderer = (type: string) => {
    if (type === dtm_type) {
        return draw_decision_turing_machine;
    } else if (type === ctm_type) {
        return draw_computational_turing_machine;
    }

    return () => {};
};

export const automata_properties = (type: string): any => {
    if (type === dtm_type) {
        return dtm_properties;
    } else if (type === ctm_type) {
        return ctm_properties;
    }
};

export const automata_type_formatted = (type: string): string => {
    if (type === dtm_type) {
        return "Decision Turing Machine";
    } else if (type === ctm_type) {
        return "Computational Turing Machine";
    }
};

export type MachineDescription = {
    type: string;
    name: string;
    machine: DecisionTuringMachine | ComputationalTuringMachine;
    test_cases: Array<string>;
};

const iterate_over: MachineDescription = {
    name: "Iterate Over Entire String",
    type: ctm_type,
    test_cases: [],
    machine: {
        states: [
            { id: 0, label: "q0", diagram: { position: { x: -100, y: 0 } } },
            { id: 1, label: "qH", diagram: { position: { x: 100, y: 0 } } },
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
const is_odd: MachineDescription = {
    name: "Is Odd",
    type: dtm_type,
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

let machine_description = $state<MachineDescription>(iterate_over);
export function set_machine_description(description: MachineDescription) {
    machine_description = description;
}
export function get_machine_description(): MachineDescription {
    return machine_description;
}
