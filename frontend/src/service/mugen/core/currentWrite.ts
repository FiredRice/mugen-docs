import { BaseValue } from '../types';

class CurrentWrite {
    private text: string;
    public currentStateId?: BaseValue;
    private currentState: String;;

    constructor() {
        this.currentState = '';
        this.text = '';
    }

    public append(code: string) {
        this.text = `${this.text}${code}\n`;
    }

    public getCode() {
        return `${this.currentState}${this.text}`;
    }

    public clean() {
        this.currentState = '';
        this.text = '';
    }
}

export const currentWrite = new CurrentWrite();