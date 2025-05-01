export default function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-[#0A1929]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master Your Coding Journey
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Practice coding challenges, ace technical interviews, and elevate your programming skills
          </p>
          <button className="bg-[#007FFF] hover:bg-[#0072E5] text-white px-8 py-4 rounded-lg text-lg font-medium transition-all">
            Start Coding Now
          </button>
        </div>
      </div>
    </div>
  )
}