import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode }: ResultsTabProps) {
  const [loading, setLoading] = useState(false);

  const handleVisualize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          originalCode, 
          optimizedCode, 
          language: 'python' // Adjust language as needed
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to compare solutions');
      }

      // Handle the response data as needed
      console.log('Comparison result:', data.result);
    } catch (error) {
      console.error("Error comparing solutions:", error);
      alert(error.message || "Failed to compare solutions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Visualize'}
        </button>
      </div>
    </div>
  );
}
