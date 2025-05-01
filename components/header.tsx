"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 mx-auto">
        <div className="w-8 h-8 bg-[#007FFF] rounded-md flex items-center justify-center">
          <svg
            fill="#000000"
            width="175px"
            height="175px"
            viewBox="-3.2 -3.2 38.40 38.40"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
              <path
                transform="translate(-3.2, -3.2), scale(2.4)"
                fill="#007FFF"
                d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
                strokeWidth="0"
              ></path>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.128"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>hurt</title>
              <path d="M28 8v8h-8v12h-8v-4h-8v-8h4v4h4v-16h8v8h4v-4h4z"></path>
            </g>
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-white">BeatCode</h1>
      </div>
    </header>
  )
}
