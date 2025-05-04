"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import TabNavigation from "@/components/tab-navigation"
import EditorTab from "@/components/editor-tab"
import ResultsTab from "@/components/results-tab"
import VisualizeTab from "@/components/visualize-tab"
import { getUserSolutions } from "@/lib/firestore"
import { Menu, X } from "lucide-react"

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("editor")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [output, setOutput] = useState("")
  const [optimizedCode, setOptimizedCode] = useState("")
  const [hints, setHints] = useState<string[]>([])
  const [timeData, setTimeData] = useState({ current: 0.2, optimal: 0.04 })
  const [memoryData, setMemoryData] = useState({ current: 5.2, optimal: 2.1 })
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userSolutions, setUserSolutions] = useState<any[]>([])

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      getUserSolutions(session.user.email).then(setUserSolutions).catch(console.error)
    }
  }, [session?.user?.email])

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code first")
      return
    }

    setLoading(true)
    setHints([])

    try {
      const response = await fetch("/api/hints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      })

      const responseText = await response.text()

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError)
        throw new Error("Server returned invalid JSON response")
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to get hints")
      }

      const result = data.result
      const hintMatches = result.match(/•(.*?)(?=•|$)/g) || []
      const extractedHints = hintMatches.map((hint: string) => hint.replace(/•\s*/, "").trim())

      if (extractedHints.length > 0) {
        setHints(extractedHints)
      } else {
        const lines = result.split("\n").filter((line: string) => line.trim())
        setHints(lines)
      }
    } catch (error) {
      console.error("Error getting hints:", error)
      alert(error instanceof Error ? error.message : "Failed to get hints. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleViewOptimizedCode = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to optimize code")
      }

      setOptimizedCode(data.result)
      setActiveTab("results")
    } catch (error) {
      console.error("Error optimizing code:", error)
      alert(error instanceof Error ? error.message : "Failed to optimize code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A1929] flex flex-col relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-[#1E293B] text-white shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="space-y-2 overflow-y-auto max-h-[80vh] pr-1">
            {userSolutions.length === 0 && <li className="text-sm text-gray-400">No saved problems.</li>}
            {userSolutions.map((solution) => (
              <li
                key={solution.id}
                className="bg-[#334155] hover:bg-[#475569] p-2 rounded cursor-pointer"
                onClick={() => {
                  setCode(solution.solution || "")
                  setOptimizedCode(solution.optimizedSolution || "")
                  setActiveTab("editor")
                  setSidebarOpen(false)
                }}
              >
                {solution.title || "Untitled Problem"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-50 bg-[#1E293B] text-white p-2 rounded-md hover:bg-[#334155] shadow"
      >
        <Menu className="w-5 h-5" />
      </button>

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
              loading={loading}
              hints={hints}
              onViewOptimizedCode={handleViewOptimizedCode}
            />
          )}

          {activeTab === "results" && (
            <ResultsTab
              output={output}
              optimizedCode={optimizedCode}
              originalCode={code}
            />
          )}

          {activeTab === "visualize" && (
            <VisualizeTab timeData={timeData} memoryData={memoryData} />
          )}
        </div>
      </div>
    </main>
  )
}
