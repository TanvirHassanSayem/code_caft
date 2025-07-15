// "use client";

// import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { motion } from "framer-motion";
// import { Loader2, Play } from "lucide-react";
// import { api } from "../../../convex/_generated/api";

// function RunButton() {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const saveExecution = useMutation(api.codeExecutions.saveExecution);

//   const handleRun = async () => {
//     await runCode();
//     const result = getExecutionResult();

//     if (user && result) {
//       await saveExecution({
//         language,
//         code: result.code,
//         output: result.output || undefined,
//         error: result.error || undefined,
//       });
//     }
//   };

//   return (
//     <motion.button
//       onClick={handleRun}
//       disabled={isRunning}
//       whileHover={{ scale: 1.08, rotate: -2 }}
//       whileTap={{ scale: 0.97, rotate: 1 }}
//       className={`
//         group relative inline-flex items-center gap-3 px-7 py-3 font-semibold
//         rounded-xl shadow-2xl overflow-hidden focus:outline-none
//         transition-all duration-300
//         bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
//         text-white
//         disabled:opacity-60 disabled:cursor-not-allowed
//       `}
//       style={{
//         boxShadow: "0 8px 24px 0 rgba(80,90,220,0.16), 0 1.5px 8px 0 rgba(40,50,100,0.08)"
//       }}
//     >
//       {/* Glowing border animation */}
//       <motion.span
//         className="absolute -inset-1 rounded-xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 blur opacity-60"
//         animate={{
//           opacity: [0.7, 1, 0.7],
//           filter: [
//             "blur(8px)",
//             "blur(16px)",
//             "blur(8px)"
//           ]
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 2,
//           ease: "easeInOut"
//         }}
//       />

//       {/* Main button content */}
//       <span className="relative z-10 flex items-center gap-2">
//         {isRunning ? (
//           <Loader2 className="w-5 h-5 animate-spin text-white/90" />
//         ) : (
//           <motion.span
//             initial={{ rotate: 0 }}
//             animate={{ rotate: [0, -12, 12, 0] }}
//             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//           >
//             <Play className="w-5 h-5 text-white drop-shadow" />
//           </motion.span>
//         )}
//         <span className="text-base font-bold tracking-wide drop-shadow">
//           {isRunning ? (
//             <>
//               <span className="animate-pulse">⚡ Running...</span>
//             </>
//           ) : (
//             <>
//               <span className="mr-1">🚀</span>Run with Input
//             </>
//           )}
//         </span>
//       </span>
//     </motion.button>
//   );
// }

// export default RunButton;

// "use client";

// import React from "react";
// import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { motion } from "framer-motion";
// import { Loader2, Play } from "lucide-react";
// import { api } from "../../../convex/_generated/api";

// type RunButtonProps = {
//   children?: React.ReactElement; // <-- children is now optional!
// };

// function RunButton({ children }: RunButtonProps) {
//   const { user } = useUser();
//   const { runCode, language, isRunning } = useCodeEditorStore();
//   const saveExecution = useMutation(api.codeExecutions.saveExecution);

//   const handleRun = async (e?: React.MouseEvent) => {
//     // If children and has onClick, call it first
//     if (children?.props?.onClick) {
//       await children.props.onClick(e);
//     }
//     if (!isRunning) {
//       await runCode();
//       const result = getExecutionResult();

//       if (user && result) {
//         await saveExecution({
//           language,
//           code: result.code,
//           output: result.output || undefined,
//           error: result.error || undefined,
//         });
//       }
//     }
//   };

//   // Handle disabled logic
//   const isDisabled = children?.props?.disabled || isRunning;

//   return (
//     <motion.div
//       whileHover={!isDisabled ? { scale: 1.05, rotate: -2 } : {}}
//       whileTap={!isDisabled ? { scale: 0.97, rotate: 1 } : {}}
//       className={`relative inline-block ${isDisabled ? "opacity-60 pointer-events-none" : ""}`}
//     >
//       {/* Glowing border animation */}
//       <motion.span
//         className="absolute -inset-1 rounded-xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 blur opacity-60 pointer-events-none"
//         animate={{
//           opacity: [0.7, 1, 0.7],
//           filter: [
//             "blur(8px)",
//             "blur(16px)",
//             "blur(8px)"
//           ]
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 2,
//           ease: "easeInOut"
//         }}
//       />
//       <span className="relative z-10">
//         {children ? (
//           React.cloneElement(children, {
//             onClick: handleRun,
//             disabled: isDisabled,
//           })
//         ) : (
//           <motion.button
//             onClick={handleRun}
//             disabled={isDisabled}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm 
//               disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isRunning ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin text-white/70" />
//                 Running...
//               </>
//             ) : (
//               <>
//                 <Play className="w-4 h-4" />
//                 Run with Input
//               </>
//             )}
//           </motion.button>
//         )}
//       </span>
//     </motion.div>
//   );
// }

// export default RunButton;

"use client";

import React from "react";
import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { toast } from "react-hot-toast";

type RunButtonProps = {
  children?: React.ReactElement;
};


function showCodeSuccessToast() {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border border-blue-400/30
        bg-gradient-to-r from-indigo-800 via-blue-700 to-blue-600
        text-white font-semibold
      `}
      style={{ minWidth: 250, maxWidth: 340 }}
    >
      <span className="text-2xl">✅</span>
      <div>
        <div className="text-base font-bold tracking-tight">Success!</div>
        <div className="text-sm text-blue-100">Successfully run the code</div>
      </div>
    </div>
  ), { duration: 2800 });
}

function showCodeErrorToast() {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border border-red-400/30
        bg-gradient-to-r from-red-800 via-pink-700 to-rose-600
        text-white font-semibold
      `}
      style={{ minWidth: 250, maxWidth: 340 }}
    >
      <span className="text-2xl">❌</span>
      <div>
        <div className="text-base font-bold tracking-tight">Error!</div>
        <div className="text-sm text-red-100">Error in your code, fix that</div>
      </div>
    </div>
  ), { duration: 3200 });
}

function RunButton({ children }: RunButtonProps) {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async (e?: React.MouseEvent) => {
    if (children?.props?.onClick) {
      await children.props.onClick(e);
    }
    if (!isRunning) {
      try {
        await runCode();
        const result = getExecutionResult();

        if (user && result) {
          await saveExecution({
            language,
            code: result.code,
            output: result.output || undefined,
            error: result.error || undefined,
          });
        }

        if (result?.error) {
          showCodeErrorToast();
        } else {
          showCodeSuccessToast();
        }
      } catch (err: any) {
        toast.error("Error in your code, fix that");
      }
    }
  };

  const isDisabled = children?.props?.disabled || isRunning;

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.05, rotate: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.97, rotate: 1 } : {}}
      className={`relative inline-block ${isDisabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Glowing border animation */}
      <motion.span
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 blur opacity-60 pointer-events-none"
        animate={{
          opacity: [0.7, 1, 0.7],
          filter: [
            "blur(8px)",
            "blur(16px)",
            "blur(8px)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      />
      <span className="relative z-10">
        {children ? (
          React.cloneElement(children, {
            onClick: handleRun,
            disabled: isDisabled,
          })
        ) : (
          <motion.button
            onClick={handleRun}
            disabled={isDisabled}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run with Input
              </>
            )}
          </motion.button>
        )}
      </span>
    </motion.div>
  );
}

export default RunButton;


