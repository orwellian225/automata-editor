import { dtm_type } from "./automata-core/decision-turing-machine";
import {
    type AutomataDescription,
    automata_default,
} from "./automata-core/automata-description";

let automata_description = $state<AutomataDescription>({
    name: "Default Decision TM",
    test_cases: [],
    type: dtm_type,
    automata: automata_default(dtm_type),
});
export function set_automata_description(description: AutomataDescription) {
    automata_description = description;
}
export function get_automata_description(): AutomataDescription {
    return automata_description;
}
