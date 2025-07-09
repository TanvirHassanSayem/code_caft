"use client";
import { ChevronDown, ChevronUp, Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  maxLines?: number;
  className?: string;
}

const CodeBlock = ({ 
  code, 
  language, 
  title,
  showLineNumbers = true,
  maxLines = 6,
  className = ""
}: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const lines = code.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, maxLines).join("\n");
  const shouldShowToggle = lines.length > maxLines;

  const handleCopy = async () => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageDisplay = (lang: string) => {
    const langMap: { [key: string]: string } = {
      javascript: "JavaScript",
      typescript: "TypeScript",
      jsx: "React JSX",
      tsx: "React TSX",
      python: "Python",
      java: "Java",
      cpp: "C++",
      c: "C",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      yaml: "YAML",
      yml: "YAML",
      xml: "XML",
      sql: "SQL",
      bash: "Bash",
      shell: "Shell",
      powershell: "PowerShell",
      dockerfile: "Dockerfile",
      go: "Go",
      rust: "Rust",
      php: "PHP",
      ruby: "Ruby",
      swift: "Swift",
      kotlin: "Kotlin",
      dart: "Dart",
      scala: "Scala",
      r: "R",
      matlab: "MATLAB",
      markdown: "Markdown",
      md: "Markdown"
    };
    return langMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 rounded-t-lg border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-300">
            {title || getLanguageDisplay(language)}
          </span>
          {!isExpanded && shouldShowToggle && (
            <span className="text-xs text-gray-500">
              ({lines.length} lines)
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={atomOneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            padding: "1.5rem",
            borderRadius: "0 0 0.5rem 0.5rem",
            background: "rgba(0, 0, 0, 0.6)",
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          lineNumberStyle={{
            color: "#6b7280",
            fontSize: "0.75rem",
            minWidth: "2.5rem",
            paddingRight: "1rem",
          }}
        >
          {displayCode}
        </SyntaxHighlighter>

        {/* Expand/Collapse Button */}
        {shouldShowToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-md text-xs font-medium flex items-center gap-1.5 hover:bg-blue-500/30 transition-all duration-200 backdrop-blur-sm border border-blue-500/20"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show More ({lines.length - maxLines} lines) <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}

        {/* Fade overlay when collapsed */}
        {!isExpanded && shouldShowToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-lg" />
        )}
      </div>
    </div>
  );
};

// Example usage component
const CodeBlockDemo = () => {
  const exampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
const fibSequence = [];
for (let i = 0; i < 10; i++) {
  fibSequence.push(fibonacci(i));
}

console.log('Fibonacci sequence:', fibSequence);
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// More efficient iterative approach
function fibonacciIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`;

  const shortCode = `const greeting = "Hello, World!";
console.log(greeting);`;

  return (
    <div className="p-8 bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Enhanced CodeBlock Component</h1>
          <p className="text-gray-400">Features: copy functionality, language display, line numbers, and smooth interactions</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Long Code Example (with expand/collapse)</h2>
            <CodeBlock 
              code={exampleCode} 
              language="javascript" 
              title="fibonacci.js"
              maxLines={6}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Short Code Example</h2>
            <CodeBlock 
              code={shortCode} 
              language="javascript"
              showLineNumbers={false}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Python Example</h2>
            <CodeBlock 
              code={`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(f"Original: {numbers}")
print(f"Sorted: {sorted_numbers}")`}
              language="python"
              title="Quick Sort Algorithm"
              maxLines={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlockDemo;