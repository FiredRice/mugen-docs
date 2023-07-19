import React from 'react';
import { useAsyncEffect, useSafeState } from 'ahooks';
import { ReadFile } from 'wailsjs/go/file/File';
import { LogError } from 'wailsjs/runtime/runtime';

const StyleLink: React.FC<React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>> = (props) => {

    const { rel, href, children, ...otherProps } = props;

    const [styleStr, setstyleStr] = useSafeState<string>('');

    useAsyncEffect(async () => {
        if (!href) return;
        try {
            const str = await ReadFile(href);
            setstyleStr(str);
        } catch (error) {
            console.log(error);
            LogError(JSON.stringify(error));
        }
    }, [href]);

    if (rel === 'stylesheet' && !!href) {
        return (
            <style>
                {styleStr}
            </style>
        );
    }

    return (
        <link rel={rel} href={href} {...otherProps}>
            {children}
        </link>
    );
};

export default StyleLink;