import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute top-10 left-10 opacity-10 text-[#007FFF]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <code>{"function() {"}</code>
      </motion.div>
      {/* Add more animated elements */}
    </div>
  )
}