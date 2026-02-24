import { z } from "zod";

import {
    DecisionTuringMachineSchema,
    default_dtm,
    dtm_properties,
    dtm_type,
    dtm_transition_table,
} from "./decision-turing-machine";

import {
    ComputationalTuringMachineSchema,
    default_ctm,
    ctm_properties,
    ctm_type,
    ctm_transition_table,
} from "./computation-turing-machine";

export const AutomatatDescriptionSchema = z.object({
    type: z.string(),
    name: z.string(),
    automata: z.union([
        DecisionTuringMachineSchema,
        ComputationalTuringMachineSchema,
    ]),
    test_cases: z.array(z.string()),
});
export type AutomataDescription = z.infer<typeof AutomatatDescriptionSchema>;

export const automata_types = [dtm_type, ctm_type];

export const automata_default = (type: string) => {
    if (type === dtm_type) {
        return default_dtm;
    } else if (type === ctm_type) {
        return default_ctm;
    }

    return default_dtm;
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

export type AutomataTransitionTableRules = {
    states: "counter" | "symbol";
    symbols: "counter" | "symbol";
    direction: "counter" | "symbol";
    counter_base: number;
    field_seperator: string;
    transition_seperator: string;
};
export const automata_transition_table = (
    automata_desc: AutomataDescription,
    rules: AutomataTransitionTableRules,
    num_transitions: number | undefined,
) => {
    if (automata_desc.type === dtm_type) {
        return dtm_transition_table(
            automata_desc.automata,
            rules,
            num_transitions,
        );
    } else if (automata_desc.type === ctm_type) {
        return ctm_transition_table(
            automata_desc.automata,
            rules,
            num_transitions,
        );
    }

    return "";
};
