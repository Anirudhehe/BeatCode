"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import TabNavigation from "@/components/tab-navigation"
import EditorTab from "@/components/editor-tab"
import ResultsTab from "@/components/results-tab"
import VisualizeTab from "@/components/visualize-tab"


export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("editor")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [output, setOutput] = useState("")
  const [optimizedCode, setOptimizedCode] = useState("")
  const [timeData, setTimeData] = useState({ current: 0.2, optimal: 0.04 })
  const [memoryData, setMemoryData] = useState({ current: 5.2, optimal: 2.1 })

  const handleRunCode = () => {
    // ... existing code ...
  }

  return (
    <main className="min-h-screen bg-[#0A1929] flex flex-col">
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col max-w-7xl">
        <Header />
        
        <div className="mt-10 mb-8">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="flex-1">
          {activeTab === "editor" && (
            <EditorTab
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              onRunCode={handleRunCode}
            />
          )}

          {activeTab === "results" && <ResultsTab output={output} optimizedCode={optimizedCode} />}

          {activeTab === "visualize" && <VisualizeTab timeData={timeData} memoryData={memoryData} />}
        </div>
      </div>
    </main>
  )
}