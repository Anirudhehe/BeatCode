"use client"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Separator } from "@/components/ui/separator"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

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

  const timeBarRef = useRef<HTMLDivElement>(null)
  const timeOptimalRef = useRef<HTMLDivElement>(null)
  const memoryBarRef = useRef<HTMLDivElement>(null)
  const memoryOptimalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create a timeline for smoother animations
    const tl = gsap.timeline()

    // Reset bars
    tl.set([timeBarRef.current, timeOptimalRef.current, memoryBarRef.current, memoryOptimalRef.current], {
      height: 0,
    })

    // Animate bars
    tl.to([timeBarRef.current, timeOptimalRef.current], {
      height: (index) => `${(index === 0 ? timeData.current : timeData.optimal) / Math.max(timeData.current, timeData.optimal) * 100}%`,
      duration: 1,
      ease: "power2.out"
    })

    tl.to([memoryBarRef.current, memoryOptimalRef.current], {
      height: (index) => `${(index === 0 ? memoryData.current : memoryData.optimal) / Math.max(memoryData.current, memoryData.optimal) * 100}%`,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")  // Start slightly before previous animation ends

  }, [timeData, memoryData])

  return (
    <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
      <div className="p-4 border-b border-[#1E3A5F]">
        <h2 className="text-sm font-medium text-white">Performance Analysis</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A1929] p-4 rounded-md border border-[#1E3A5F]">
            <h3 className="text-xs uppercase tracking-wider text-[#94A3B8] mb-3">Time Complexity</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Your solution</span>
                <div className="flex items-center gap-4">
                  <div className="h-32 flex items-end">
                    <div ref={timeBarRef} className="w-4 bg-[#007FFF] rounded-t-lg transition-all duration-300" style={{ height: '0%' }} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-mono">{timeData.current}s</span>
                    <span className="text-xs bg-[#132F4C] text-[#94A3B8] px-2 py-0.5 rounded">O(n²)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Optimal solution</span>
                <div className="flex items-center gap-4">
                  <div className="h-32 flex items-end">
                    <div ref={timeOptimalRef} className="w-4 bg-[#00C853] rounded-t-lg transition-all duration-300" style={{ height: '0%' }} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-mono">{timeData.optimal}s</span>
                    <span className="text-xs bg-[#132F4C] text-[#94A3B8] px-2 py-0.5 rounded">O(n)</span>
                  </div>
                </div>
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
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Your solution</span>
                <div className="flex items-center gap-4">
                  <div className="h-32 flex items-end">
                    <div ref={memoryBarRef} className="w-4 bg-[#007FFF] rounded-t-lg transition-all duration-300" style={{ height: '0%' }} />
                  </div>
                  <span className="text-white font-mono">{memoryData.current}MB</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Optimal solution</span>
                <div className="flex items-center gap-4">
                  <div className="h-32 flex items-end">
                    <div ref={memoryOptimalRef} className="w-4 bg-[#00C853] rounded-t-lg transition-all duration-300" style={{ height: '0%' }} />
                  </div>
                  <span className="text-white font-mono">{memoryData.optimal}MB</span>
                </div>
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

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={[
                { size: 0, current: timeData.current * 0.2, optimal: timeData.optimal * 0.2 },
                { size: 1, current: timeData.current * 0.8, optimal: timeData.optimal * 0.4 },
                { size: 2, current: timeData.current * 2.0, optimal: timeData.optimal * 0.6 },
                { size: 3, current: timeData.current * 1.2, optimal: timeData.optimal * 0.8 },
                { size: 4, current: timeData.current * 1.4, optimal: timeData.optimal * 0.7 },
                { size: 5, current: timeData.current * 1.3, optimal: timeData.optimal * 0.9 },
                { size: 6, current: timeData.current * 1.2, optimal: timeData.optimal * 0.85 }
              ]}
              margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis 
                dataKey="size" 
                stroke="#94A3B8"
                label={{ value: 'Input Size (n)', position: 'bottom', fill: '#94A3B8', dy: 25 }}
              />
              <YAxis 
                stroke="#94A3B8"
                label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#94A3B8', dx: -10 }}
                tickFormatter={(value) => `${value.toFixed(1)}s`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A1929",
                  borderColor: "#1E3A5F",
                  color: "#FFFFFF",
                  borderRadius: "4px"
                }}
                formatter={(value: number) => [`${value.toFixed(2)}s`, 'Time']}
              />
              <Legend 
                wrapperStyle={{ color: "#94A3B8" }} 
                verticalAlign="bottom" 
                height={36}
              />
              <Line 
                type="monotone" 
                dataKey="current" 
                name="Your Solution" 
                stroke="#007FFF" 
                strokeWidth={2}
                dot={{ fill: "#007FFF", r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                name="Optimal Solution" 
                stroke="#00C853" 
                strokeWidth={2}
                dot={{ fill: "#00C853", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              {
                name: "Time",
                yourTime: timeData.current,
                optimalTime: timeData.optimal
              },
              {
                name: "Memory",
                yourTime: memoryData.current,
                optimalTime: memoryData.optimal
              }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#0A1929",
                  borderColor: "#1E3A5F",
                  color: "#FFFFFF",
                  borderRadius: "4px"
                }}
              />
              <Legend wrapperStyle={{ color: "#94A3B8" }} />
              <Bar dataKey="yourTime" name="Your Solution" fill="#007FFF" />
              <Bar dataKey="optimalTime" name="Optimal Solution" fill="#00C853" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

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

const complexityData = {
  labels: [0, 10, 20, 30, 40, 50],
  datasets: [
    {
      label: 'O(n)',
      data: [0, 10, 20, 30, 40, 50],
      borderColor: '#00C853',
      tension: 0.4,
    },
    {
      label: 'O(n²)',
      data: [0, 100, 400, 900, 1600, 2500],
      borderColor: '#007FFF',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Input Size (n)',
        color: '#94A3B8',
      },
      grid: {
        color: '#1E3A5F',
      },
      ticks: {
        color: '#94A3B8',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Operations',
        color: '#94A3B8',
      },
      grid: {
        color: '#1E3A5F',
      },
      ticks: {
        color: '#94A3B8',
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: '#94A3B8',
      },
    },
    tooltip: {
      backgroundColor: '#0A1929',
      borderColor: '#1E3A5F',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFFFF',
    },
  },
};

