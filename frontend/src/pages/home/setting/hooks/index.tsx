import { useMemo } from 'react';
import { Form, InputNumber, Typography } from 'antd';
import { OptionSchemaItem } from 'src/service/optionService';
import NumSwitch from '../components/NumSwitch';

function componentRender(schema: OptionSchemaItem) {
    switch (schema.type) {
        case 'int':
            return (
                <InputNumber
                    max={schema.max}
                    min={schema.min}
                    precision={0}
                />
            );
        case 'float':
            return (
                <InputNumber
                    max={schema.max}
                    min={schema.min}
                    precision={2}
                />
            );
        case 'boolean':
            return (
                <NumSwitch {...schema.enum} />
            );
        default:
            return null;
    }
};

function createRule(schema: OptionSchemaItem) {
    if (schema.type === 'boolean') return undefined;
    return [{ required: true, message: `${schema.label}不能为空` }];
}

export function schemaRender(schema: OptionSchemaItem[]) {
    return useMemo(() => schema.map((s, i) => {
        if (!!s.desc) {
            return (
                <Form.Item key={i} label={s.label} tooltip={s.tooltip}>
                    <Form.Item
                        noStyle
                        name={i}
                        rules={createRule(s)}
                    >
                        {componentRender(s)}
                    </Form.Item>
                    <br />
                    <Typography.Text type='secondary'>
                        {s.desc}
                    </Typography.Text>
                </Form.Item>
            );
        }
        return (
            <Form.Item
                key={i}
                label={s.label}
                name={i}
                rules={createRule(s)}
                tooltip={s.tooltip}
            >
                {componentRender(s)}
            </Form.Item>
        );
    }), [schema]);
}