import { dtm_type } from "./automata-core/decision-turing-machine";
import {
    type AutomataDescription,
    automata_default,
} from "./automata-core/automata-description";

import { same_symbol_count_desc } from "./automata-examples/same-symbol-count";

// let automata_description = $state<AutomataDescription>({
//     name: "Default Decision TM",
//     test_cases: [],
//     type: dtm_type,
//     automata: automata_default(dtm_type),
// });
let automata_description = $state<AutomataDescription>(same_symbol_count_desc);

export function set_automata_description(description: AutomataDescription) {
    automata_description = description;
}
export function get_automata_description(): AutomataDescription {
    return automata_description;
}
