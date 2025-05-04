"use client"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import VisualizeTab from "./visualize-tab"
import Editor from '@monaco-editor/react'

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
  language?: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode, language = 'python' }: ResultsTabProps) {
  const [showVisualization, setShowVisualization] = useState(false);

  const handleVisualize = () => {
    localStorage.setItem('originalCode', originalCode);
    localStorage.setItem('optimizedCode', optimizedCode);
    localStorage.setItem('language', language);
    
    setShowVisualization(true);
  };

  if (showVisualization) {
    return (
      <div>
        <button 
          onClick={() => setShowVisualization(false)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Back to Results
        </button>
        <VisualizeTab />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-white font-medium">Original Solution</h2>
        </div>
        <div className="p-4">
          <div className="h-[500px] relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={originalCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Consolas, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingIndent: 'indent'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-white font-medium">Optimized Solution</h2>
        </div>
        <div className="p-4">
          <div className="h-[500px] relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={optimizedCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Consolas, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingIndent: 'indent'
              }}
            />
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-center mt-4">
        <button 
          onClick={handleVisualize} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Visualize
        </button>
      </div>
    </div>
  );
}