class DecisionComputation {
    constructor(decision_machine, input_string) {
        this.decision_machine = decision_machine;
        this.input_string = input_string;

        this.tape = [];
        this.cursor = 0;
        this.current_state = this.decision_machine.initial_state;
    }

    reset() {
        delete this.tape;
        this.tape = [].concat(
            Array(this.input_string.length).fill(
                this.decision_machine.tape_alphabet[0],
            ),
            this.input_string.split(""),
            Array(this.input_string.length).fill(
                this.decision_machine.tape_alphabet[0],
            ),
        );
        this.cursor = this.input_string.length;
    }

    move_left(num_steps) {
        this.cursor -= num_steps;

        if (this.cursor < 0) {
            const new_tape = Array(this.tape.length).fill(
                this.decision_machine.tape_alphabet[0],
            );
            this.cursor += this.tape.length;
            this.tape = new_tape.concat(this.tape);
        }
    }

    move_right(num_steps) {
        this.cursor += num_steps;

        if (this.cursor >= this.tape.length) {
            this.tape = this.tape.concat(
                Array(this.tape.length).fill(
                    this.decision_machine.tape_alphabet[0],
                ),
            );
        }
    }
}
