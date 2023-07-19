import path from 'path-browserify';
import { ReadFile } from 'wailsjs/go/file/File';
import { LogError } from 'wailsjs/runtime/runtime';

interface DocsItem {
    label: string;
    content: string;
}

class Docs {
    private _value: DocsItem[] = [];

    public async init() {
        try {
            const json = await ReadFile('./data/docs.json') || '{}';
            const config = JSON.parse(json);
            for (let i = 0; i < config.length; i++) {
                const c = config[i];
                const ext = path.extname(c.path);
                try {
                    if (ext !== '.md') continue;
                    const content = await ReadFile(path.join('./data', c.path));
                    this._value.push({
                        label: c.label,
                        content
                    });
                } catch (error) {
                    console.log(error);
                    LogError(JSON.stringify(error));
                }
            }
        } catch (error) {
            console.log(error);
            LogError(JSON.stringify(error));
        }
    }

    public getMenus() {
        return this._value.map(v => v.label);
    }

    public getContent(index: number | string) {
        return this._value[index] || {};
    }
}

const docs = new Docs();

export default docs;