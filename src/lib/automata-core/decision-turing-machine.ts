import type { AutomataState, AutomataStateID } from "./automata-state";
import type { QSQSDTransition } from "./automata-transition";

export type DecisionTuringMachine = {
    states: Array<AutomataState>;
    problem_alphabet: Array<string>;
    tape_alphabet: Array<string>;
    transitions: Array<QSQSDTransition>;
    initial_state: AutomataStateID;
    accept_state: AutomataStateID;
    reject_state: AutomataStateID;
};
