import { z } from "zod";
import {
    AutomataStateSchema,
    AutomataStateIDSchema,
    type AutomataStateID,
    type AutomataState,
} from "./automata-state";
import { QSQSDTransitionSchema } from "./automata-transition";

export const ComputationalTuringMachineSchema = z.object({
    states: z.array(AutomataStateSchema),
    problem_alphabet: z.array(z.string()),
    tape_alphabet: z.array(z.string()),
    transitions: z.array(QSQSDTransitionSchema),
    initial_state: AutomataStateIDSchema,
    halt_state: AutomataStateIDSchema,
});
export type ComputationalTuringMachine = z.infer<
    typeof ComputationalTuringMachineSchema
>;

export const ctm_type = "computational_tm";

export const default_ctm: ComputationalTuringMachine = {
    states: [
        { id: 0, label: "qI", diagram: { position: { x: -100, y: 0 } } },
        { id: 1, label: "qH", diagram: { position: { x: 100, y: 0 } } },
    ],
    problem_alphabet: ["0", "1"],
    tape_alphabet: ["_"],
    transitions: [
        {
            curr_state_id: 0,
            read_symbol: "0",
            next_state_id: 1,
            write_symbol: "0",
            direction: +1,
        },
        {
            curr_state_id: 0,
            read_symbol: "1",
            next_state_id: 1,
            write_symbol: "1",
            direction: +1,
        },
        {
            curr_state_id: 0,
            read_symbol: "_",
            next_state_id: 1,
            write_symbol: "_",
            direction: +1,
        },
    ],
    initial_state: 0,
    halt_state: 1,
};

export const ctm_properties = {
    state_id_to_state: (
        machine: ComputationalTuringMachine,
        id: AutomataStateID,
    ) => {
        return machine.states.find((state) => state.id === id);
    },
    notable_states: (
        machine: ComputationalTuringMachine,
    ): { [key: string]: AutomataState | undefined } => {
        return {
            "Halt State": ctm_properties.state_id_to_state(
                machine,
                machine.halt_state,
            ),
        };
    },
    expected_transitions: (machine: ComputationalTuringMachine): number => {
        return (
            (machine.states.length - 1) *
            (machine.tape_alphabet.length + machine.problem_alphabet.length)
        );
    },
    is_deterministic: (machine: ComputationalTuringMachine) => {
        if (
            ctm_properties.expected_transitions(machine) !==
            machine.transitions.length
        ) {
            return false;
        }

        const alphabet = machine.tape_alphabet.concat(machine.problem_alphabet);
        let state_symbol_counts = {};
        for (const state of machine.states) {
            if (state.id === machine.halt_state) {
                continue;
            }

            state_symbol_counts[state.id] = {};
            for (const symbol of alphabet) {
                state_symbol_counts[state.id][symbol] = 0;
            }
        }

        for (const transition of machine.transitions) {
            state_symbol_counts[transition.curr_state_id][
                transition.read_symbol
            ] += 1;
        }

        for (const [state_id, symbol_counts] of Object.entries(
            state_symbol_counts,
        )) {
            for (const [symbol, count] of Object.entries(symbol_counts)) {
                if (count !== 1) {
                    return false;
                }
            }
        }

        return true;
    },
};
