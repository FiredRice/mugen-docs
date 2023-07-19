import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { BrowserOpenURL } from 'wailsjs/runtime/runtime';
import StyleLink from '../StyleLink';
import './style/index.less';

export interface IMarkdownProps extends ReactMarkdownOptions {
    showLineNumbers?: boolean;
    children: string;
}

const Markdown: React.FC<IMarkdownProps> = (props) => {

    const { children, showLineNumbers, components, ...otherProps } = props;

    return (
        <ReactMarkdown
            {...otherProps}
            className='mugen-markdown'
            remarkPlugins={[
                remarkMath,
                remarkBreaks,
                [remarkGfm, { singleTilde: false, tableCellPadding: true }],
            ]}
            rehypePlugins={[
                rehypeKatex,
                rehypeRaw,
                rehypeSlug,
            ]}
            components={{
                script: () => null,
                link: ({ node, ...props }) => (
                    <StyleLink {...props} />
                ),
                a: ({ href, node, ...props }) => {
                    if (!href) {
                        return (
                            <a {...props} />
                        );
                    }
                    if (/^#.*/.test(href)) {
                        return (
                            <a href={href} {...props} />
                        );
                    }
                    return (
                        <a
                            {...props}
                            href='#'
                            onClick={() => BrowserOpenURL(href)}
                        />
                    );
                },
                pre: ({ children, node, ...props }) => {
                    if (node.children.some((c: any) => c.tagName === 'code')) {
                        return (
                            <>{children}</>
                        );
                    }
                    return (
                        <pre {...props}>{children}</pre>
                    );
                },
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                        <SyntaxHighlighter
                            className={className}
                            children={String(children).replace(/\n$/, '')}
                            showLineNumbers={showLineNumbers}
                            language={match?.[1]}
                            customStyle={{ backgroundColor: '#f5f5f5' }}
                        />
                    ) : (
                        <code className={className}>{children}</code>
                    );
                },
                ...components
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;
