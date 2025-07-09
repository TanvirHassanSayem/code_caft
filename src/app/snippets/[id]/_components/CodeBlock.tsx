import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

  // Get language display name and icon
  const getLanguageInfo = (lang: string) => {
    const langMap: Record<string, { name: string; color: string }> = {
      javascript: { name: "JavaScript", color: "#f7df1e" },
      typescript: { name: "TypeScript", color: "#3178c6" },
      python: { name: "Python", color: "#3776ab" },
      java: { name: "Java", color: "#ed8b00" },
      cpp: { name: "C++", color: "#00599c" },
      html: { name: "HTML", color: "#e34f26" },
      css: { name: "CSS", color: "#1572b6" },
      json: { name: "JSON", color: "#000000" },
      sql: { name: "SQL", color: "#336791" },
      bash: { name: "Bash", color: "#4eaa25" },
      plaintext: { name: "Plain Text", color: "#6b7280" },
    };
    return langMap[lang] || { name: lang.toUpperCase(), color: "#6b7280" };
  };

  const langInfo = getLanguageInfo(language || "plaintext");

  return (
    <div className="group my-6 relative">
      {/* Animated background gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
      
      {/* Main container */}
      <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
        {/* Header bar with enhanced styling */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#161b22] to-[#1c2128] border-b border-[#30363d]">
          {/* Language indicator with enhanced styling */}
          <div className="flex items-center gap-3">
            {/* Language icon with colored border */}
            <div 
              className="flex items-center justify-center w-6 h-6 rounded-md border-2 bg-opacity-10"
              style={{ 
                borderColor: langInfo.color,
                backgroundColor: langInfo.color + '10'
              }}
            >
              <img 
                src={`/${language}.png`} 
                alt={language} 
                className="w-4 h-4 object-contain opacity-90" 
              />
            </div>
            
            {/* Language name with color accent */}
            <div className="flex flex-col">
              <span 
                className="text-sm font-semibold"
                style={{ color: langInfo.color }}
              >
                {langInfo.name}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langInfo.color }}
                ></div>
                <span>Syntax Highlighted</span>
              </div>
            </div>
          </div>

          {/* Enhanced copy button area */}
          <div className="flex items-center gap-2">
            {/* Line count indicator */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-[#21262d] text-xs text-gray-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>{trimmedCode.split('\n').length} lines</span>
            </div>
            
            {/* Copy button with enhanced styling */}
            <CopyButton code={trimmedCode} />
          </div>
        </div>

        {/* Code block with enhanced styling */}
        <div className="relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Code content */}
          <div className="relative">
            <SyntaxHighlighter
              language={language || "plaintext"}
              style={atomOneDark} // dark theme for the code
              customStyle={{
                padding: "1.5rem",
                background: "transparent",
                margin: 0,
                fontSize: "14px",
                lineHeight: "1.6",
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              }}
              showLineNumbers={true}
              lineNumberStyle={{
                color: "#484f58",
                backgroundColor: "transparent",
                paddingRight: "1rem",
                marginRight: "1rem",
                borderRight: "1px solid #30363d",
                minWidth: "2.5rem",
                textAlign: "right",
                userSelect: "none",
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {trimmedCode}
            </SyntaxHighlighter>
          </div>

          {/* Scroll fade indicators */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#0d1117] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Footer with file info (optional) */}
        <div className="px-5 py-2 bg-[#161b22] border-t border-[#30363d] text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>•</span>
            <span>{new Blob([trimmedCode]).size} bytes</span>
            <span>•</span>
            <span>{trimmedCode.split(/\s+/).length} words</span>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default CodeBlock;