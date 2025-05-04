"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const handleButtonClick = () => {
    if (session) {
      // If already logged in, go straight to editor
      router.push('/editor')
    } else {
      // If not logged in, go to login page
      router.push('/login')
    }
  }
  
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#1a1339] to-[#2d1854] overflow-hidden relative font-['Consolas']"
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-9xl md:text-9xl font-bold text-white mb-6">
            BeatCode
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Practice <span className="font-bold text-white">smarter</span>.
            Visualize <span className="font-bold text-white">better</span>.
            Optimize <span className="font-bold text-white">faster</span> —
            all in one playful coding arena.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleButtonClick}
              className="bg-[#007FFF] hover:bg-[#0072E5] text-white px-8 py-6 text-lg rounded-full transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-[#007FFF]/40 group"
            >
              <span className="flex items-center gap-2">
                <span className="group-hover:text-white">
                  {status === "loading" ? "Loading..." : "Show Me What's Better"}
                </span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 mb-4 mx-auto">
              <Image
                src="/icons/analysis.png"
                alt="Analysis Icon"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Analysis</h3>
            <p className="text-gray-400">Visualize your code performance and get instant feedback on optimization opportunities.</p>
          </div>
          <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 mb-4 mx-auto">
              <Image
                src="/icons/languages.png"
                alt="Languages Icon"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multiple Languages</h3>
            <p className="text-gray-400">Support for Python, C++, Java and more programming languages.</p>
          </div>
          <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 mb-4 mx-auto">
              <Image
                src="/icons/learning.png"
                alt="Learning Icon"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Interactive Learning</h3>
            <p className="text-gray-400">Learn through hands-on coding challenges and real-time performance metrics.</p>
          </div>
        </div>
      </div>
      {/* Background Gradient Pills */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
    </main>
  )
}