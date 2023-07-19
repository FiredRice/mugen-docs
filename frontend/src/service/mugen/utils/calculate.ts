import { isObject } from 'lodash-es';
import { AttrValue } from '../types';

/**
 * 判断是否为 TriggerValue
 */
export function isAttrValue(target: any): target is AttrValue {
    return isObject(target) && Reflect.has(target, 'value') && Reflect.has(target, '_setInnerName');
}

/**
 * TriggerValue 转换
 */
export function transAttrValue(target: AttrValue) {
    if (isObject(target)) {
        if (isAttrValue(target)) {
            return target.value
        } else {
            throw new Error(`[${target} is Not AttrValue]`);
        }
    }
    return target;
}

/**
 * 操作工厂
 */
export function optFactory(values: AttrValue[], opt: string) {
    let result = '';
    for (const value of values) {
        const _value = transAttrValue(value);
        if (!!result) {
            result += ` ${opt} ${_value}`;
        } else {
            result = `${_value}`;
        }
    }
    return result;
}
