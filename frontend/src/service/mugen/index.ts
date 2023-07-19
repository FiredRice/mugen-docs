import { StatedefType } from './types';
import Character from './core/character';
import { isString } from 'lodash-es';
import { currentWrite } from './core/currentWrite';

export default class Mugen<T extends StatedefType | string> {
    protected char?: Character<T>;

    /**
     * 注入角色
     * @param char
     */
    public injectCharacter(char: Character<T>) {
        this.char = char;
    }

    /**
     * 输出 bundle 字符串
     */
    public toString() {
        const states = this.char!.getStates();
        let result = '';
        for (const state of states) {
            if (isString(state)) {
                result += `${state}\n`;
            } else {
                state();
                result += currentWrite.getCode();
                currentWrite.clean();
            }
        }
        return result;
    }
}