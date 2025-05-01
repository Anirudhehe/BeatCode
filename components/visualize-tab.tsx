import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { ArrowDown } from "lucide-react"

interface VisualizeTabProps {
  timeData: {
    current: number
    optimal: number
  }
  memoryData: {
    current: number
    optimal: number
  }
}

export default function VisualizeTab({ timeData, memoryData }: VisualizeTabProps) {
  const chartData = [
    {
      name: "Time (s)",
      "Your Code": timeData.current,
      Optimal: timeData.optimal,
    },
    {
      name: "Memory (MB)",
      "Your Code": memoryData.current,
      Optimal: memoryData.optimal,
    },
  ]

  const calculateImprovement = (current: number, optimal: number) => {
    const percentage = ((current - optimal) / current) * 100
    return percentage.toFixed(0)
  }

  return (
    <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
      <div className="p-4 border-b border-[#1E3A5F]">
        <h2 className="text-sm font-medium text-white">Performance Analysis</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A1929] p-4 rounded-md border border-[#1E3A5F]">
            <h3 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Time Complexity</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">Your solution</span>
              <div className="flex items-center">
                <span className="text-white font-mono">{timeData.current}s</span>
                <span className="ml-2 text-xs bg-[#132F4C] text-[#94A3B8] px-2 py-0.5 rounded">O(n²)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Optimal solution</span>
              <div className="flex items-center">
                <span className="text-white font-mono">{timeData.optimal}s</span>
                <span className="ml-2 text-xs bg-[#132F4C] text-[#94A3B8] px-2 py-0.5 rounded">O(n)</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <ArrowDown className="h-4 w-4 text-[#007FFF]" />
                <span className="text-[#007FFF] font-medium">
                  {calculateImprovement(timeData.current, timeData.optimal)}% faster
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1929] p-4 rounded-md border border-[#1E3A5F]">
            <h3 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Memory Usage</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">Your solution</span>
              <div className="flex items-center">
                <span className="text-white font-mono">{memoryData.current}MB</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Optimal solution</span>
              <div className="flex items-center">
                <span className="text-white font-mono">{memoryData.optimal}MB</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <ArrowDown className="h-4 w-4 text-[#007FFF]" />
                <span className="text-[#007FFF] font-medium">
                  {calculateImprovement(memoryData.current, memoryData.optimal)}% less memory
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-[#1E3A5F]" />

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A1929",
                  borderColor: "#1E3A5F",
                  color: "#FFFFFF",
                  borderRadius: "4px",
                }}
              />
              <Legend wrapperStyle={{ color: "#94A3B8" }} />
              <Bar dataKey="Your Code" fill="#007FFF" />
              <Bar dataKey="Optimal" fill="#00C853" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-[#0A1929] rounded-md border border-[#1E3A5F]">
          <h3 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-2">Analysis</h3>
          <p className="text-sm text-white">
            Your solution uses a nested loop approach with O(n²) time complexity. The optimal solution uses a hashmap to
            achieve O(1) lookups, resulting in O(n) overall time complexity. This optimization reduces execution time by
            approximately 80%.
          </p>
        </div>
      </div>
    </div>
  )
}
