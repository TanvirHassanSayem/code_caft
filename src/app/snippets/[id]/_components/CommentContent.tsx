import { Fragment } from 'react';
import CodeBlock from './CodeBlock';

interface CommentContentProps {
  content: string;
}

const CommentContent = ({ content }: CommentContentProps) => {
  // Enhanced regex to handle various code block formats and edge cases
  const codeBlockRegex = /(```[\w-]*\n[\s\S]*?\n```)/g;
  const parts = content.split(codeBlockRegex).filter(Boolean);

  const renderCodeBlock = (part: string, index: number) => {
    const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);
    if (!match) return null;

    const [, language = '', code] = match;
    return (
      <CodeBlock 
        key={`code-${index}`} 
        language={language} 
        code={code.trim()} 
      />
    );
  };

  const renderTextContent = (text: string, index: number) => {
    if (!text.trim()) return null;

    // Split into paragraphs by double newlines
    const paragraphs = text.split(/\n{2,}/);
    
    return (
      <Fragment key={`text-${index}`}>
        {paragraphs.map((paragraph, paraIdx) => {
          const trimmedPara = paragraph.trim();
          if (!trimmedPara) return null;

          return (
            <p 
              key={`para-${index}-${paraIdx}`}
              className="mb-4 text-gray-300 leading-relaxed last:mb-0"
            >
              {trimmedPara.split('\n').map((line, lineIdx, lines) => (
                <Fragment key={`line-${lineIdx}`}>
                  {line}
                  {lineIdx < lines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div className="max-w-none text-white whitespace-pre-wrap break-words space-y-4">
      {parts.map((part, index) => 
        part.startsWith('```') 
          ? renderCodeBlock(part, index)
          : renderTextContent(part, index)
      )}
    </div>
  );
};

export default CommentContent;