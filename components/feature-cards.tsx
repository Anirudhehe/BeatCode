export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
      <div className="bg-[#132F4C] p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">Practice Challenges</h3>
        <p className="text-gray-400">Solve coding problems across different difficulty levels</p>
      </div>
      <div className="bg-[#132F4C] p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">Multiple Languages</h3>
        <p className="text-gray-400">Code in Python, C++, Java and more</p>
      </div>
      <div className="bg-[#132F4C] p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">Real-time Feedback</h3>
        <p className="text-gray-400">Get instant feedback on your solutions</p>
      </div>
    </div>
  )
}