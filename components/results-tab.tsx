import { Separator } from "@/components/ui/separator"

interface ResultsTabProps {
  output: string
  optimizedCode: string
}

export default function ResultsTab({ output, optimizedCode }: ResultsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F] flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Output</h2>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#0A1929] text-[#94A3B8]">
            stdout
          </span>
        </div>
        <div className="p-4 font-mono text-sm whitespace-pre-wrap h-[500px] overflow-auto text-white">
          {output || "Run your code to see output..."}
        </div>
      </div>

      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F] flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Optimization</h2>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#0A1929] text-[#94A3B8]">
            suggestions
          </span>
        </div>
        <div className="p-4 font-mono text-sm whitespace-pre-wrap h-[500px] overflow-auto text-white">
          {optimizedCode ? (
            <>
              <div className="mb-4 p-3 bg-[#0A1929] rounded-md border border-[#1E3A5F]">
                <p className="text-[#007FFF] font-medium mb-2 text-xs uppercase tracking-wider">Suggestion</p>
                <p className="text-[#94A3B8]">
                  Use a hashmap for O(1) lookup to improve time complexity from O(n²) to O(n).
                </p>
              </div>
              <Separator className="my-4 bg-[#1E3A5F]" />
              <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Optimized Code</p>
              <pre className="bg-[#0A1929] p-3 rounded-md border border-[#1E3A5F]">{optimizedCode}</pre>
            </>
          ) : (
            "Run your code to see optimization suggestions..."
          )}
        </div>
      </div>
    </div>
  )
}
