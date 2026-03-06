import { dtm_type } from "./automata-core/decision-turing-machine";
import {
    type AutomataDescription,
    automata_default,
    automata_transition_table,
} from "./automata-core/automata-description";

import { is_odd_desc } from "./automata-examples/is-odd";
// import { same_symbol_count_desc } from "./automata-examples/same-symbol-count";
// import { palindrome_desc } from "./automata-examples/palindrome";
// import { akb2k_desc } from "./automata-examples/akb2k";
// import { mssi_example_desc } from "./automata-examples/mssi-example";
// import { mssi_odd_pos_symbols_are_equal_desc } from "./automata-examples/mssi-odd-pos-symbols-are-equal";
// import { msi_infinite_oscillation_desc } from "./automata-examples/mssi-infinite-oscillation";
import { anbn_desc } from "./automata-examples/anbn";

// let automata_description = $state<AutomataDescription>({
//     name: "Default Decision TM",
//     test_cases: [],
//     type: dtm_type,
//     automata: automata_default(dtm_type),
// });
let automata_description = $state<AutomataDescription>(
    // msi_infinite_oscillation_desc,
    // mssi_example_desc,
    anbn_desc,
);

export function set_automata_description(description: AutomataDescription) {
    automata_description = description;
}
export function get_automata_description(): AutomataDescription {
    return automata_description;
}
