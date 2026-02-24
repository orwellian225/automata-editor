import { z } from "zod";
import { direction_to_str } from "./automata-transition";
import type { AutomataTransitionTableRules } from "./automata-description";

import {
    AutomataStateSchema,
    AutomataStateIDSchema,
    type AutomataState,
    type AutomataStateID,
} from "./automata-state";
import { QSQSDTransitionSchema } from "./automata-transition";

export const DecisionTuringMachineSchema = z.object({
    states: z.array(AutomataStateSchema),
    problem_alphabet: z.array(z.string()),
    tape_alphabet: z.array(z.string()),
    transitions: z.array(QSQSDTransitionSchema),
    initial_state: AutomataStateIDSchema,
    accept_state: AutomataStateIDSchema,
    reject_state: AutomataStateIDSchema,
});
export type DecisionTuringMachine = z.infer<typeof DecisionTuringMachineSchema>;

export const ConfigDTMSchema = z.object({
    state_id: AutomataStateIDSchema,
    tape: z.array(z.string()),
    pos: z.number(),
    status: z.union([
        z.literal("Running"),
        z.literal("Accepted"),
        z.literal("Rejected"),
    ]),
});
export type ConfigDTM = z.infer<typeof ConfigDTMSchema>;

export const ComputeDTMSchema = z.object({
    active_config: ConfigDTMSchema,

    input: z.string(),
    output: z
        .union([
            z.literal("Accepted"),
            z.literal("Rejected"),
            z.literal("Timeout"),
        ])
        .optional(),

    time_usage: z.number(),
    space_usage: z.number(),

    time_limit: z.number(),
    space_limit: z.number(),
});
export type ComputeDTM = z.infer<typeof ComputeDTMSchema>;
export const computation_dtm_is_stopped = (computation: ComputeDTM) => {
    return computation.active_config.status !== "Running";
};

export const dtm_type = "decision_tm";

export const default_dtm: DecisionTuringMachine = {
    states: [
        {
            id: 0,
            label: "qI",
            diagram: { position: { x: -100, y: 0 }, out_angle: -Math.PI / 2 },
        },
        {
            id: 1,
            label: "qA",
            diagram: { position: { x: 100, y: -75 }, out_angle: -Math.PI / 2 },
        },
        {
            id: 2,
            label: "qR",
            diagram: { position: { x: 100, y: 75 }, out_angle: -Math.PI / 2 },
        },
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
            next_state_id: 2,
            write_symbol: "1",
            direction: +1,
        },
        {
            curr_state_id: 0,
            read_symbol: "_",
            next_state_id: 2,
            write_symbol: "_",
            direction: +1,
        },
    ],
    initial_state: 0,
    accept_state: 1,
    reject_state: 2,
};

export const dtm_properties = {
    state_id_to_state: (
        machine: DecisionTuringMachine,
        id: AutomataStateID,
    ) => {
        return machine.states.find((state) => state.id === id);
    },
    notable_states: (
        machine: DecisionTuringMachine,
    ): { [key: string]: AutomataState | undefined } => {
        return {
            "Accept State": dtm_properties.state_id_to_state(
                machine,
                machine.accept_state,
            ),
            "Reject State": dtm_properties.state_id_to_state(
                machine,
                machine.reject_state,
            ),
        };
    },
    expected_transitions: (machine: DecisionTuringMachine): number => {
        return (
            (machine.states.length - 2) *
            (machine.tape_alphabet.length + machine.problem_alphabet.length)
        );
    },
    is_deterministic: (machine: DecisionTuringMachine) => {
        if (
            dtm_properties.expected_transitions(machine) !==
            machine.transitions.length
        ) {
            return false;
        }

        const alphabet = machine.tape_alphabet.concat(machine.problem_alphabet);
        let state_symbol_counts = {};
        for (const state of machine.states) {
            if (
                state.id === machine.accept_state ||
                state.id === machine.reject_state
            ) {
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

export const dtm_transition_table = (
    machine: DecisionTuringMachine,
    rules: AutomataTransitionTableRules,
    num_transitions: number | undefined,
) => {
    const state_repr = (id: AutomataStateID) => {
        if (rules.states === "counter") {
            return id.toString(rules.counter_base);
        } else {
            return machine.states.find((s) => s.id === id)?.label ?? "qx";
        }
    };

    const symbol_repr = (sym: string, index: number): string => {
        if (rules.symbols === "counter") {
            return index.toString(rules.counter_base);
        } else {
            return sym;
        }
    };

    const direction_repr = (direction: number) => {
        if (rules.direction === "counter") {
            return direction.toString(rules.counter_base);
        } else {
            return direction_to_str(direction);
        }
    };

    const symbol_index = new Map<string, number>();
    machine.transitions.forEach((t) => {
        if (!symbol_index.has(t.read_symbol))
            symbol_index.set(t.read_symbol, symbol_index.size);
        if (!symbol_index.has(t.write_symbol))
            symbol_index.set(t.write_symbol, symbol_index.size);
    });

    const transitions = num_transitions
        ? machine.transitions.slice(0, num_transitions)
        : machine.transitions;

    const represented_transitions = transitions.map((transition) => {
        const fields = [
            state_repr(transition.curr_state_id),
            symbol_repr(
                transition.read_symbol,
                symbol_index.get(transition.read_symbol)!,
            ),
            state_repr(transition.next_state_id),
            symbol_repr(
                transition.write_symbol,
                symbol_index.get(transition.write_symbol)!,
            ),
            direction_repr(transition.direction),
        ];
        return fields.join(rules.field_seperator);
    });

    return represented_transitions.join(rules.transition_seperator);
};
