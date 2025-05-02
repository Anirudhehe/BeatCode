import { Separator } from "@/components/ui/separator"

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode }: ResultsTabProps) {
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
    </div>
  );
}
