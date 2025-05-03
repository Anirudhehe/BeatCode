import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import VisualizeTab from "./visualize-tab"

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode }: ResultsTabProps) {
  const [showVisualization, setShowVisualization] = useState(false);

  const handleVisualize = () => {
    // Store the code in localStorage before navigating
    localStorage.setItem('originalCode', originalCode);
    localStorage.setItem('optimizedCode', optimizedCode);
    localStorage.setItem('language', 'python'); // Or get this from props
    
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
          <pre className="text-white font-mono text-sm whitespace-pre-wrap">
            {originalCode}
          </pre>
        </div>
      </div>
      
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-white font-medium">Optimized Solution</h2>
        </div>
        <div className="p-4">
          <pre className="text-white font-mono text-sm whitespace-pre-wrap">
            {optimizedCode}
          </pre>
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
