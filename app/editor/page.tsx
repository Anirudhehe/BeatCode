"use client"


import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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
  const [hints, setHints] = useState([])
  const [timeData, setTimeData] = useState({ current: 0.2, optimal: 0.04 })
  const [memoryData, setMemoryData] = useState({ current: 5.2, optimal: 2.1 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code first");
      return;
    }

    setLoading(true);
    setHints([]);
    
    try {
      // Call the hints API endpoint
      const response = await fetch('/api/hints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      // Log the raw response text for debugging
      const responseText = await response.text();
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Server returned invalid JSON response");
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get hints');
      }
      
      // Extract hints from the response
      const result = data.result;
      
      // Simple parsing to extract bullet points as hints
      const hintMatches = result.match(/•(.*?)(?=•|$)/gs) || [];
      const extractedHints = hintMatches.map(hint => hint.replace(/•\s*/, '').trim());
      
      if (extractedHints.length > 0) {
        setHints(extractedHints);
      } else {
        // If no bullet points found, try to split by lines
        const lines = result.split('\n').filter(line => line.trim());
        setHints(lines);
      }
      
    } catch (error) {
      console.error("Error getting hints:", error);
      alert(error.message || "Failed to get hints. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleViewOptimizedCode = async () => {
    setLoading(true);
    
    try {
      // Call the optimize API endpoint to get the full solution
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to optimize code');
      }
      
      // Set the optimized code from the API response
      setOptimizedCode(data.result);
      
      // Switch to results tab to show the comparison
      setActiveTab("results");
      
    } catch (error) {
      console.error("Error optimizing code:", error);
      alert(error.message || "Failed to optimize code. Please try again.");
    } finally {
      setLoading(false);
    }
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

          {activeTab === "visualize" && <VisualizeTab timeData={timeData} memoryData={memoryData} />}
        </div>
      </div>
    </main>
  )
}