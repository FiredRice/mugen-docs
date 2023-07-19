import { StatedefType } from '../types';

export default class Character<T extends StatedefType | string> {
    private states: T[] = [];

    /**
     * 注入 State
     * @param states
     */
    public injectStates(states: T[]) {
        this.states = states;
    }

    /**
     * 获取 State
     * @returns states
     */
    public getStates() {
        return this.states;
    }
}