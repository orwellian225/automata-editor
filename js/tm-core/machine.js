class AutomataState {
    static #state_counter = 0;
    constructor(name) {
        this.name = name;
        this.identifier = AutomataState.#state_counter++;
        this.diagram = {
            position: [0, 0],
            radius: 20,
            radius_offset: 5,
            modifiers: {},
        };
    }

    add_modifier(name, colour, inside) {
        this.diagram.modifiers[name] = { colour, inside };
    }
    remove_modifier(name) {
        delete this.diagram.modifiers[name];
    }
}

class TuringMachine {
    constructor(
        states,
        problem_alphabet,
        tape_alphabet,
        transitions,
        initial_state_id,
    ) {
        this.states = states;
        this.problem_alphabet = problem_alphabet;
        this.tape_alphabet = tape_alphabet;
        this.transitions = transitions;
        this.initial_state = this.states.find(
            (state) => state.identifier === initial_state_id,
        );
    }
}

class DecisionTuringMachine extends TuringMachine {
    constructor(
        states,
        problem_alphabet,
        tape_alphabet,
        transitions,
        initial_state,
        accept_state_id,
        reject_state_id,
    ) {
        super(
            states,
            problem_alphabet,
            tape_alphabet,
            transitions,
            initial_state,
        );
        this.accept_state = this.states.find(
            (state) => state.identifier === accept_state_id,
        );
        this.reject_state = this.states.find(
            (state) => state.identifier === reject_state_id,
        );
    }

    static default() {
        const states = [
            new AutomataState("0"),
            new AutomataState("1"),
            new AutomataState("2"),
            new AutomataState("3"),
        ];

        states[0].diagram.position = [-200, 0];
        states[1].diagram.position = [0, 0];
        states[2].diagram.position = [200, -50];
        states[3].diagram.position = [200, 50];

        states[0].add_modifier("initial", "#0000ff", true);
        states[2].add_modifier("accept", "#00ff00", true);
        states[3].add_modifier("reject", "#ff0000", true);

        const transitions = {};
        transitions[states[0].identifier] = {
            a: [states[1].identifier, "a", +1],
            b: [states[1].identifier, "b", -1],
        };
        transitions[states[1].identifier] = {
            a: [states[2].identifier, "a", +1],
            b: [states[3].identifier, "b", -1],
        };
        transitions[states[2].identifier] = {
            a: [states[2].identifier, "a", +1],
            b: [states[2].identifier, "b", -1],
        };
        transitions[states[3].identifier] = {
            a: [states[3].identifier, "a", +1],
            b: [states[3].identifier, "b", -1],
        };

        const machine = new DecisionTuringMachine(
            states,
            ["a", "b"],
            ["_"],
            transitions,
            states[0].identifier,
            states[2].identifier,
            states[3].identifier,
        );

        return machine;
    }
}

class FunctionTuringMachine extends TuringMachine {
    constructor(
        states,
        problem_alphabet,
        tape_alphabet,
        transitions,
        initial_state_id,
        halt_state_id,
    ) {
        super(
            states,
            problem_alphabet,
            tape_alphabet,
            transitions,
            initial_state_id,
        );
        this.halt_state = this.states.find(
            (state) => state.identifier === halt_state_id,
        );
    }
}
