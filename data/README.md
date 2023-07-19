# 静态配置项

## docs.json

```ts
interface DocsItem {
    // 标签
    label: string;
    // .md 文件相对路径
    path: string;
}
```

`json` 文件中存储 `DocsItem[]` 数组。

## options.json

```ts
interface OptionsType {
    // 界面中开关模块的标题
    title: string;
    // 开关文件存储相对路径
    output: string;
    // 在 Statedef 声名与变量之间的原生代码文件相对路径
    nativeBefore?: string;
    // 在变量之后的原生代码文件相对路径
    nativeAfter?: string;
    // 渲染的表单名 span 值
    // labelSpan + wrapperSpan <= 24
    labelSpan: number;
    // 渲染的表单组件 span 值
    // labelSpan + wrapperSpan <= 24
    wrapperSpan: number;
    // 开关文件状态号
    stateno: number;
    // 开关配置
    schema: {
        // 表单名
        label: string;
        // 变量索引
        var: number;
        // 提示
        tooltip?: string;
        // 额外描述
        desc?: string;
        // 当前变量值
        value: number;
        // 自定义 trigger1 触发器
        trigger?: string;
        // 类型
        // int：整数
        // float：浮点数
        // boolean：二值浮点数
        type: 'int' | 'float' | 'boolean';
        // 最大值
        // 仅在 type 为 'int' | 'float' 时有效
        max?: number;
        // 最小值
        // 仅在 type 为 'int' | 'float' 时有效
        min?: number;
        // 枚举值
        // 仅在 type 为 'boolean' 时有效
        enum?: {
            // 开关关闭时对应的值
            close: number;
            // 开关开启时对应的值
            open: number;
        };
    }[];
}
```