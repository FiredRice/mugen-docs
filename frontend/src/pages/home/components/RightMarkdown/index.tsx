import { useEffect, useRef } from 'react';
import { Card, FloatButton } from 'antd';
import { useWatch } from '../../hooks/context';
import docs from 'src/service/docs';
import { Markdown, ScrollBox } from 'src/components';
import { IScrollBoxInstance } from 'src/components/ScrollBox';
import PageA from '../PageA';
import './style/index.less';

const RightMarkdown = () => {
    const scrollBoxRef = useRef<IScrollBoxInstance>(null);

    const current = useWatch('current');

    const { content } = docs.getContent(current);

    useEffect(() => {
        scrollBoxRef.current?.scrollTo(0);
    }, [current]);

    return (
        <Card className='right-card-view-md'>
            <ScrollBox ref={scrollBoxRef}>
                <Markdown
                    components={{
                        a: ({ node, ...props }) => <PageA {...props} />
                    }}
                >
                    {content}
                </Markdown>
            </ScrollBox>
            <FloatButton.BackTop
                target={() => scrollBoxRef.current?.dom || window}
                visibilityHeight={200}
                type='primary'
            />
        </Card>
    );
};

export default RightMarkdown;