"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/editor"
  const [loading, setLoading] = useState(false)

  const handleGitHubLogin = async () => {
    setLoading(true)
    try {
      await signIn("github", {
        callbackUrl,
      })
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1929] via-[#1a1339] to-[#2d1854] text-white font-['Consolas']">
      <div
        className="bg-black/30 p-10 rounded-3xl shadow-lg backdrop-blur-md w-full max-w-md space-y-6 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center">Log In to BeatCode</h2>
        
        <button
          type="button"
          onClick={handleGitHubLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-[#007FFF] hover:bg-[#0072E5] transition transform hover:scale-105 hover:shadow-lg hover:shadow-[#007FFF]/30"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting...</span>
            </span>
          ) : (
            <>
              <FaGithub size={20} />
              <span>Log in with GitHub</span>
            </>
          )}
        </button>
        
        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="https://github.com/join" target="_blank" rel="noopener noreferrer" className="text-[#007FFF] hover:underline">
            Create a GitHub account
          </a>
        </div>
        
        <div className="text-gray-500 text-xs text-center mt-6">
          By signing in, you agree to the BeatCode Terms of Service and Privacy Policy
        </div>
      </div>
      
      {/* Background Gradient Pills - matching the home page style */}
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
    </div>
  )
}