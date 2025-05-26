import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeElementProps {
  children: string;
  className?: string;
}

interface CustomCodeBlockProps {
  children: React.ReactElement<CodeElementProps> | string;
  className?: string;
}

const CustomCodeBlock: React.FC<CustomCodeBlockProps> = ({ children, className }) => {
  let codeContent: string;
  let language: string;

  if (typeof children === 'string') {
    codeContent = children.replace(/\n$/, '');
    language = className?.replace(/language-/, '') || 'text';
  } else {
    const rawCodeContent = Array.isArray(children.props.children)
      ? children.props.children.join('')
      : String(children.props.children);
    codeContent = rawCodeContent.replace(/\n$/, '');

    const languageClassName = children.props.className || '';
    language = languageClassName.replace(/language-/, '') || 'text';
  }

  return (
    <SyntaxHighlighter style={dracula} language={language} PreTag="div">
      {codeContent}
    </SyntaxHighlighter>
  );
};

export default CustomCodeBlock;
