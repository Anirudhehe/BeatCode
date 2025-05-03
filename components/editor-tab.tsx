"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Play, Loader2, LightbulbIcon } from "lucide-react"

interface EditorTabProps {
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (language: string) => void
  onRunCode: () => void
  loading?: boolean
  hints?: string[]
  onViewOptimizedCode?: () => void
}

export default function EditorTab({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  onRunCode,
  loading = false,
  hints = [],
  onViewOptimizedCode
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

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Code Editor - Takes 3/4 of the space */}
          <div className="col-span-3 relative">
            <div className="absolute left-0 top-0 h-full w-12 bg-[#0A1929] border-r border-[#1E3A5F] flex flex-col items-center pt-4 text-xs text-[#94A3B8] font-mono">
              {getLineNumbers()}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[500px] pl-12 p-4 font-['Consolas'] text-sm bg-[#0A1929] text-white border-0 focus:outline-none focus:ring-0 resize-none"
              placeholder="  Write your code here..."
              spellCheck="false"
            />
          </div>
          
          {/* Hints Panel - Takes 1/4 of the space */}
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
                className="w-full bg-[#007FFF] hover:bg-[#0072E5] text-white text-sm"
                disabled={!hints.length || loading}
              >
                View Optimized Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
