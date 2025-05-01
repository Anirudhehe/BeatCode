"use client"

import { cn } from "@/lib/utils"
import { Code, BarChart2, Terminal } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "editor", label: "Editor", icon: <Code className="h-4 w-4" /> },
    { id: "results", label: "Results", icon: <Terminal className="h-4 w-4" /> },
    { id: "visualize", label: "Visualize", icon: <BarChart2 className="h-4 w-4" /> },
  ]

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-[#132F4C] rounded-md p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2",
              activeTab === tab.id ? "bg-[#007FFF] text-white" : "text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F]",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
