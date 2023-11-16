import { useEffect, useMemo } from 'react';
import { Button, Card, FloatButton, Form, Spin, message } from 'antd';
import optionService from 'src/service/optionService';
import { schemaRender } from './hooks';
import { useSafeState } from 'ahooks';
import './style/index.less';

const Setting = () => {
    const [form] = Form.useForm();

    const {
        schema,
        labelSpan,
        wrapperSpan,
        title,
        okText,
        message: tipText
    } = useMemo(() => optionService.getValue(), []);

    const [loading, setLoading] = useSafeState<boolean>(false);

    useEffect(() => {
        const values: any = {};
        schema.forEach((s, i) => {
            values[i] = s.value;
        });
        form.setFieldsValue(values);
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        optionService.updateValues(values);
        const ok = await optionService.save();
        setLoading(false);
        if (ok) {
            message.success(tipText.success);
        } else {
            message.error(tipText.error);
        }
    };

    return (
        <Card
            title={title}
            className='setting-card'
        >
            <Form
                form={form}
                className='setting-form'
                labelCol={{ span: labelSpan }}
                wrapperCol={{ span: wrapperSpan }}
                onFinish={onFinish}
                scrollToFirstError
            >
                <div id='setting-form-body' className='setting-form-body'>
                    <Spin spinning={loading}>
                        {schemaRender(schema)}
                    </Spin>
                </div>
                <div className='setting-form-footer'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: 140 }}
                    >
                        {okText}
                    </Button>
                </div>
            </Form>
            <FloatButton.BackTop
                target={() => document.getElementById('setting-form-body') || window}
                visibilityHeight={150}
                type='primary'
            />
        </Card>
    );
};

export default Setting;