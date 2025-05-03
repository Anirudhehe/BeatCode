"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { saveUserSolution } from "@/lib/firestore"
import { toast } from "sonner" // or use your preferred toast library

interface ResultsTabProps {
  output: string;
  optimizedCode: string;
  originalCode: string;
}

export default function ResultsTab({ output, optimizedCode, originalCode }: ResultsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [problemName, setProblemName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { data: session } = useSession()

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

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Original Code Block */}
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-white font-medium">Original Solution</h2>
        </div>
        <div className="p-4 max-h-[400px] overflow-auto">
          <pre className="text-white font-mono text-sm whitespace-pre-wrap">
            {originalCode}
          </pre>
        </div>
      </div>

      {/* Optimized Code Block + Save */}
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
        <div className="p-4 max-h-[400px] overflow-auto">
          <pre className="text-white font-mono text-sm whitespace-pre-wrap">
            {optimizedCode}
          </pre>
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
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
