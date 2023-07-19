import React, { forwardRef, useCallback, useRef } from 'react';
import classnames from 'classnames';
import './style/index.less';

export type IScrollBoxInstance = {
    dom: HTMLDivElement | null;
    scrollTo: (position: number) => void;
    scrollToBottom: () => void;
};

const ScrollBox: React.ForwardRefRenderFunction<IScrollBoxInstance, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props, ref) => {

    const { children, className, ...otherProps } = props;

    const domRef = useRef<HTMLDivElement>(null);

    const scrollTo = useCallback((position: number) => {
        if (domRef.current) {
            domRef.current.scrollTop = position;
        }
    }, []);

    const scrollToBottom = useCallback(() => {
        scrollTo(domRef.current?.scrollHeight || 0);
    }, []);

    React.useImperativeHandle(ref, () => ({
        dom: domRef.current,
        scrollTo,
        scrollToBottom
    }));

    return (
        <div
            ref={domRef}
            className={classnames('scroll-box', className)}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default forwardRef(ScrollBox);