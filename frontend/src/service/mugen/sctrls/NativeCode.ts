import { LogError } from 'wailsjs/runtime/runtime';
import { currentWrite } from '../core/currentWrite';

/**
 * 原生代码
 * - 应用于 state.appendControllers 中
 * @param code 
 * @param version 匹配版本号
 */
export default function NativeCode(code: string) {
    try {
        currentWrite.append(`${code}\n`);
    } catch (error) {
        console.log(error);
        LogError(JSON.stringify(error));
    }
}