"use client"
import { useState } from "react"
import Editor from '@monaco-editor/react'
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Play, Loader2, Lightbulb as LightbulbIcon, Clock } from "lucide-react"

interface EditorTabProps {
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (language: string) => void
  onRunCode: () => void
  loading?: boolean
  hints?: string[]
  onViewOptimizedCode?: () => void
  timerActive?: boolean
  timeRemaining?: string
  solutionUnlocked?: boolean
}

export default function EditorTab({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  onRunCode, 
  loading = false, 
  hints = [], 
  onViewOptimizedCode,
  timerActive = false,
  timeRemaining = "3:30",
  solutionUnlocked = false
}: EditorTabProps) {
  const languageOptions = [
    { value: "python", label: "Python", icon: "py" },
    { value: "cpp", label: "C++", icon: "cpp" },
    { value: "java", label: "Java", icon: "java" },
    { value: "c", label: "C", icon: "c" },
    { value: "javascript", label: "JavaScript", icon: "js" },
  ]

  const getLineNumbers = () => {
    const lines = code.split('\n').length;
    return Array.from({ length: Math.max(10, lines) }, (_, i) => (
      <div key={i} className="h-6 w-full text-center">
        {i + 1}
      </div>
    ));
  };

  return (
    <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-[#1E3A5F]">
        <div className="w-40">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="rounded-md bg-[#0A1929] border-[#1E3A5F] text-white h-9">
              <div className="flex items-center gap-2">
                <span className="bg-[#007FFF] text-xs font-medium px-1.5 py-0.5 rounded text-white">
                  {languageOptions.find((l) => l.value === language)?.icon}
                </span>
                <span>{languageOptions.find((l) => l.value === language)?.label}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#0A1929] border-[#1E3A5F]">
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#007FFF] text-xs font-medium px-1.5 py-0.5 rounded text-white">
                      {option.icon}
                    </span>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          {timerActive && (
            <div className="flex items-center gap-2 bg-[#0A1929] px-3 py-1.5 rounded-md border border-[#1E3A5F] animate-pulse">
              <Clock className="h-4 w-4 text-[#FF5722]" />
              <span className="text-white font-mono font-bold">{timeRemaining}</span>
            </div>
          )}

          <Button
            onClick={onRunCode}
            disabled={loading}
            className="bg-[#007FFF] hover:bg-[#0072E5] text-white rounded-md h-9 px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Just a min..
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Give me hints!
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 relative h-[500px]">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Consolas, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                theme: {
                  colors: {
                    'editor.background': '#0B1C2D',
                    'editor.lineHighlightBackground': '#132F4C',
                    'editorLineNumber.foreground': '#3E5875',
                    'editorLineNumber.activeForeground': '#007FFF',
                    'editor.selectionBackground': '#132F4C80',
                    'editor.inactiveSelectionBackground': '#132F4C40',
                    'editorGutter.background': '#0B1C2D',
                    'editorWidget.background': '#0B1C2D',
                    'editorSuggestWidget.background': '#0B1C2D',
                    'editorHoverWidget.background': '#0B1C2D',
                    'editor.lineHighlightBorder': '#132F4C00'
                  }
                }
              }}
            />
          </div>

          {/* Hints Panel */}
          <div className="col-span-1 bg-[#0A1929] border border-[#1E3A5F] rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b border-[#1E3A5F] bg-[#132F4C]">
              <h3 className="text-white font-medium flex items-center">
                <LightbulbIcon className="h-4 w-4 mr-2 text-yellow-400" />
                Hints
              </h3>
            </div>
            <div className="p-3 flex-1 overflow-auto">
              {hints.length > 0 ? (
                <ul className="text-white space-y-2 text-sm">
                  {hints.map((hint, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#007FFF] mr-2">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm italic">Run your code to get optimization hints</p>
              )}
            </div>
            <div className="p-3 border-t border-[#1E3A5F]">
              <Button 
                onClick={onViewOptimizedCode}
                className={`w-full text-white text-sm transition-all duration-300 ${
                  solutionUnlocked 
                    ? "bg-[#007FFF] hover:bg-[#0072E5]" 
                    : "bg-[#1E3A5F] cursor-not-allowed filter blur-[1px] hover:blur-0"
                }`}
                disabled={!hints.length || loading || !solutionUnlocked}
              >
                {timerActive && !solutionUnlocked 
                  ? `Wait ${timeRemaining} for solution` 
                  : "View Optimized Solution"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
