"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { saveUserSolution } from "@/lib/firestore"
import { toast } from "sonner"
import VisualizeTab from "./visualize-tab"
import Editor from '@monaco-editor/react'

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
  language?: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode, language = 'python' }: ResultsTabProps) {
  const [showVisualization, setShowVisualization] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [problemName, setProblemName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { data: session } = useSession()

  const handleVisualize = () => {
    localStorage.setItem('originalCode', originalCode)
    localStorage.setItem('optimizedCode', optimizedCode)
    localStorage.setItem('language', language)
    setShowVisualization(true)
  }

  const handleSave = async () => {
    if (!problemName.trim()) {
      toast.error("Please enter a problem title")
      return
    }

    if (!session?.user?.email) {
      toast.error("You must be logged in to save.")
      return
    }

    setIsSaving(true)
    try {
      await saveUserSolution(
        session.user.email,
        problemName,
        originalCode,
        optimizedCode
      )
      toast.success("Saved successfully!")
      setDialogOpen(false)
      setProblemName("")
    } catch (err) {
      toast.error("Failed to save.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

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
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Original Code */}
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-white font-medium">Original Solution</h2>
        </div>
        <div className="p-4">
          <div className="h-[500px] relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={originalCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Consolas, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingIndent: 'indent'
              }}
            />
          </div>
        </div>
      </div>

      {/* Optimized Code */}
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden relative">
        <div className="p-4 border-b border-[#1E3A5F] flex items-center justify-between">
          <h2 className="text-white font-medium">Optimized Solution</h2>
          <Button
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="text-sm"
          >
            Save
          </Button>
        </div>
        <div className="p-4">
          <div className="h-[500px] relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={optimizedCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Consolas, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingIndent: 'indent'
              }}
            />
          </div>
        </div>

        {/* Save Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1E293B] border border-[#334155]">
            <DialogHeader>
              <DialogTitle className="text-white">Enter Problem Title</DialogTitle>
            </DialogHeader>
            <Input
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
              placeholder="e.g. Longest Palindromic Substring"
              className="mt-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Visualize Button */}
      <div className="col-span-2 flex justify-center mt-4">
        <button 
          onClick={handleVisualize} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Visualize
        </button>
      </div>
    </div>
  )
}
