import React from 'react';
import { BrowserOpenURL } from 'wailsjs/runtime/runtime';
import { useRefContext } from '../../hooks/context';

const PageA: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {

    const { href, ...otherProps } = props;

    const refInstance = useRefContext();

    // 普通 a 标签
    if (!href) {
        return (
            <a {...otherProps} />
        );
    }

    // 页面内锚点跳转
    if (/^#.*/.test(href)) {
        return (
            <a href={href} {...otherProps} />
        );
    }

    // 其余文档跳转
    if (/^\d*$/.test(href)) {
        return (
            <a
                {...otherProps}
                href='#'
                onClick={() => refInstance.setValues({ current: href })}
            />
        );
    }

    // 浏览器打开页面
    return (
        <a
            {...otherProps}
            href='#'
            onClick={() => BrowserOpenURL(href)}
        />
    );
};

export default PageA;