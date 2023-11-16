import { ReadFile, WriteFile } from 'wailsjs/go/file/File';
import { getArray } from 'src/utils';
import Mugen from './mugen';
import Character from './mugen/core/character';
import path from 'path-browserify';
import { FVar, Var } from './mugen/sctrls/Var';
import NativeCode from './mugen/sctrls/NativeCode';
import { LogError } from 'wailsjs/runtime/runtime';

interface Values {
    [x: number]: number;
}

interface OptionBaseSchemaItem {
    label: string;
    var: number;
    tooltip?: string;
    value: number;
    trigger?: string;
    desc?: string;
}

export interface OptionNumSchemaItem extends OptionBaseSchemaItem {
    type: 'int' | 'float';
    max?: number;
    min?: number;
}

export interface OptionBoolSchemaItem extends OptionBaseSchemaItem {
    type: 'boolean';
    enum?: {
        close: number;
        open: number;
    };
}

export type OptionSchemaItem = OptionNumSchemaItem | OptionBoolSchemaItem;

export interface OptionsType {
    title: string;
    okText: string;
    message: {
        success: string;
        error: string;
    };
    output: string;
    nativeBefore?: string;
    nativeAfter?: string;
    labelSpan: number;
    wrapperSpan: number;
    schema: OptionSchemaItem[];
}

async function readNativeCode(nativePath: string) {
    try {
        return await ReadFile(path.join('./data', nativePath));
    } catch (error) {
        console.log(error);
        LogError(JSON.stringify(error));
        return '';
    }
}

async function createState(value: OptionsType) {
    const { nativeBefore, nativeAfter, schema } = value;
    const [nativeBeforeCode, nativeAfterCode] = await Promise.all([
        !!nativeBefore ? readNativeCode(nativeBefore) : Promise.resolve(),
        !!nativeAfter ? readNativeCode(nativeAfter) : Promise.resolve()
    ]);
    return function () {
        !!nativeBeforeCode && NativeCode(nativeBeforeCode);

        for (let i = 0; i < schema.length; i++) {
            const s = schema[i];
            if (s.type === 'float') {
                const fv = new FVar(s.var);
                fv.Set({
                    triggers: s.trigger || '1',
                    describe: s.label,
                    value: s.value,
                    ignorehitpause: 1
                });
            } else {
                const sv = new Var(s.var);
                sv.Set({
                    triggers: s.trigger || '1',
                    describe: s.label,
                    value: s.value,
                    ignorehitpause: 1
                });
            }
        }

        !!nativeAfterCode && NativeCode(nativeAfterCode);
    };
}

class OptionService {
    private _value: OptionsType = {} as any;

    public async init() {
        try {
            const json = await ReadFile('./data/options.json') || '{}';
            this._value = JSON.parse(json);
        } catch (error) {
            console.log(error);
            LogError(JSON.stringify(error));
            this._value = {} as any;
        }
    }

    public getValue() {
        return this._value;
    }

    public getSchemas(): OptionSchemaItem[] {
        return getArray(this._value, 'schema');
    }

    public updateValues(values: Values) {
        for (let i = 0; i < this._value.schema.length; i++) {
            const s = this._value.schema[i];
            s.value = values[i];
        }
    }

    public async save(): Promise<boolean> {
        try {
            const char = new Character();
            const { output } = this._value;
            const state = await createState(this._value);
            char.injectStates([state]);
            const mugen = new Mugen();
            mugen.injectCharacter(char);
            await Promise.all([
                WriteFile('./data/options.json', JSON.stringify(this._value)),
                WriteFile(path.join('./data', output), mugen.toString())
            ]);
            return true;
        } catch (error) {
            console.log(error);
            LogError(JSON.stringify(error));
            return false;
        }
    }
}

const optionService = new OptionService();

export default optionService;