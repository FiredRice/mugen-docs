import { Triggers } from '../core/util';
import { BaseTrigger } from '../triggers/base';

export declare type BaseValue = string | number;

export type StatedefType = () => void;

export type AttrValue = BaseValue | BaseTrigger | {
    value: BaseValue;
    _setInnerName: (name: BaseValue) => void;
    [x: string]: any;
};

export type StateType = 'S' | 'C' | 'A' | 'L' | 'U';
export type MoveType = 'A' | 'I' | 'H' | 'U';

export type MBoolean = 0 | 1;

export type TriggersType = Triggers | AttrValue;

export interface BaseSctrls {
    /**
     * 控制器
     */
    triggers: TriggersType;
    /**
     * 描述（为控制器添加注释）
     */
    describe?: string;
    /**
     * 如果ignorehitpause设成1,mugen会在打击停顿的时候也检测此控制器.
     * 
     * 否则在打击停顿的时候不会检测.
     * - 默认值是0,推荐使用这个值,除了少数情况(表述一个持续性的参数,详见触发器持续性).
     */
    ignorehitpause?: AttrValue;
    /**
     * 如果你不想在每次条件为真的时候都触发,则你需要加上一个参数persistent.
     * - persistent默认值为1,表示只要触发条件为真控制器每次都能被激活.
     * - persistent设置为0只允许在此状态中激活控制器1次.
     * 
     * 直到p1离开此状态都会保留真.如果p1之后再次进入此状态,此控制器还是只激活1次.
     * 
     * persistent的参数也能取0,1之外的数:
     * - 设置persistent为2表示每2次触发条件为真,控制器被激活1次.
     * - 设置persistent为3表示每3次触发条件为真,控制器被激活1次.等等.
     */
    persistent?: AttrValue;
}