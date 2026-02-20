import { ctm_type } from "$lib/automata-core/computation-turing-machine";
import { dtm_type } from "$lib/automata-core/decision-turing-machine";

import { draw_computational_turing_machine } from "./computation-turing-machine";
import { draw_decision_turing_machine } from "./decision-turing-machine";

export const automata_renderer = (type: string) => {
    if (type === dtm_type) {
        return draw_decision_turing_machine;
    } else if (type === ctm_type) {
        return draw_computational_turing_machine;
    }

    return () => {};
};
