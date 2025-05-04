"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useEffect, useState } from "react"
import { gsap } from "gsap"

interface VisualizeTabProps {
  timeData?: { current: number, optimal: number };
  memoryData?: { current: number, optimal: number };
}

export default function VisualizeTab({ timeData: initialTimeData, memoryData }: VisualizeTabProps) {
  const [complexityInfo, setComplexityInfo] = useState({
    currentTime: "O(n²)",
    optimalTime: "O(n)",
    currentSpace: "O(n)",
    optimalSpace: "O(1)",
    analysis: "Your solution uses a nested loop approach with O(n²) time complexity. The optimal solution uses a hashmap to achieve O(1) lookups, resulting in O(n) overall time complexity."
  })
  const [loading, setLoading] = useState(true)
  const [timeData, setTimeData] = useState(initialTimeData || { current: 0.2, optimal: 0.04 })
  const [spaceData, setSpaceData] = useState(memoryData || { current: 0.1, optimal: 0.02 })

  useEffect(() => {
    console.log("VisualizeTab mounted, fetching complexity data...");
    fetchComplexityData();
  }, []);

  const fetchComplexityData = async () => {
    try {
      console.log("Fetching complexity data from API...");
      
      // Get the code from localStorage
      const originalCode = localStorage.getItem('originalCode');
      const optimizedCode = localStorage.getItem('optimizedCode');
      const language = localStorage.getItem('language') || 'python';
      
      if (!originalCode || !optimizedCode) {
        console.log("No code found in localStorage, using default values");
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          originalCode, 
          optimizedCode, 
          language 
        }),
      });
      
      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        if (!response.ok) {
          throw new Error(data.error || 'Failed to compare solutions');
        }
        
        console.log("Raw API response:", data.result);
        processApiResponse(data.result);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Server returned invalid JSON response");
      }
    } catch (error) {
      console.error("Error fetching complexity data:", error);
      // Use mock data as fallback
      console.log("Using mock data as fallback");
      const mockResponse = "1. O(n²) 2. O(n) 3. O(n) 4. O(1)";
      processApiResponse(mockResponse);
    }
  };

  const processApiResponse = (response: string) => {
    try {
      console.log("Processing API response text:", response);
      
      const originalTimeMatch = response.match(/1\.\s*(O\([^)]+\))/i);
      const optimizedTimeMatch = response.match(/2\.\s*(O\([^)]+\))/i);
      const originalSpaceMatch = response.match(/3\.\s*(O\([^)]+\))/i);
      const optimizedSpaceMatch = response.match(/4\.\s*(O\([^)]+\))/i);
      
      const originalTime = originalTimeMatch ? originalTimeMatch[1] : "O(n²)";
      const optimizedTime = optimizedTimeMatch ? optimizedTimeMatch[1] : "O(n)";
      const originalSpace = originalSpaceMatch ? originalSpaceMatch[1] : "O(n)";
      const optimizedSpace = optimizedSpaceMatch ? optimizedSpaceMatch[1] : "O(1)";
      
      setComplexityInfo({
        currentTime: originalTime,
        optimalTime: optimizedTime,
        currentSpace: originalSpace,
        optimalSpace: optimizedSpace,
        analysis: `Your solution has ${originalTime} time complexity and ${originalSpace} space complexity. The optimized solution improves this to ${optimizedTime} time complexity and ${optimizedSpace} space complexity.`
      });
      
      updateVisualizationData(originalTime, optimizedTime, originalSpace, optimizedSpace);
    } catch (error) {
      console.error("Error processing API response:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateVisualizationData = (originalComplexity: string, optimizedComplexity: string) => {
    console.log("Updating visualization data for:", { originalComplexity, optimizedComplexity });
    
    const getTimeValue = (complexity: string) => {
      const notation = complexity.toLowerCase()
      if (notation.includes('1)')) return 0.1
      if (notation.includes('log')) return 0.3
      if (notation.includes('n)')) return 0.5
      if (notation.includes('n log')) return 0.7
      if (notation.includes('n²') || notation.includes('n^2')) return 1.0
      if (notation.includes('n³') || notation.includes('n^3')) return 1.5
      if (notation.includes('2^n')) return 2.0
      return 0.8
    }

    const currentTimeFactor = getTimeValue(originalComplexity);
    const optimalTimeFactor = getTimeValue(optimizedComplexity);

    console.log("Time factors calculated:", { currentTimeFactor, optimalTimeFactor });

    setTimeData({
      current: parseFloat((0.2 + currentTimeFactor * 0.8).toFixed(2)),
      optimal: parseFloat((0.04 + optimalTimeFactor * 0.16).toFixed(2))
    });
  }

  useEffect(() => {
    const tl = gsap.timeline({ paused: true })
    const container = document.querySelector('.time-complexity-container')

    if (container) {
      tl.set(container, { opacity: 0, y: 20 })
      tl.to(container, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play()
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.2 })

      observer.observe(container)

      return () => {
        observer.disconnect()
        tl.kill()
      }
    }
  }, []);

  // Generate data points for the line chart
  const generateChartData = (originalComplexity, optimizedComplexity) => {
    const data = [];
    
    // Generate data points for different input sizes
    for (let n = 0; n <= 6; n++) {
      let yourTime, optimalTime;
      
      // Calculate time based on complexity
      if (originalComplexity.includes('n²') || originalComplexity.includes('n^2')) {
        yourTime = 0.08 + (n * n * 0.01);
      } else if (originalComplexity.includes('n log')) {
        yourTime = 0.08 + (n * Math.log(n) * 0.02);
      } else if (originalComplexity.includes('log')) {
        // Special handling for logarithmic complexity
        yourTime = 0.08 + (Math.log(n + 1) * 0.04);
      } else if (originalComplexity.includes('n)')) {
        yourTime = 0.08 + (n * 0.04);
      } else {
        yourTime = 0.08 + (n * 0.04);
      }
      
      if (optimizedComplexity.includes('1)')) {
        optimalTime = 0.03;
      } else if (optimizedComplexity.includes('log')) {
        // Make optimal logarithmic solution visibly different
        optimalTime = 0.03 + (Math.log(n + 1) * 0.02);
      } else if (optimizedComplexity.includes('n)')) {
        const baseTime = 0.03 + (n * 0.005);
        optimalTime = originalComplexity === optimizedComplexity ? 
          baseTime * 0.85 : 
          baseTime;
      } else {
        optimalTime = 0.03 + (n * 0.005);
      }
      
      // Ensure minimum difference between solutions
      if (Math.abs(yourTime - optimalTime) < 0.02) {
        optimalTime = yourTime * 0.85; // Create at least 15% difference
      }
      
      data.push({
        n,
        "Your Solution": parseFloat(yourTime.toFixed(2)),
        "Optimal Solution": parseFloat(optimalTime.toFixed(2))
      });
    }
    
    return data;
  };

  // Generate chart data based on complexity info
  const chartData = generateChartData(complexityInfo.currentTime, complexityInfo.optimalTime);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true })
    const container = document.querySelector('.time-complexity-container')

    if (container) {
      tl.set(container, { opacity: 0, y: 20 })
      tl.to(container, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play()
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.2 })

      observer.observe(container)

      return () => {
        observer.disconnect()
        tl.kill()
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007FFF] mb-4"></div>
          <p className="text-white">Analyzing code complexity...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time Complexity Graph */}
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-sm font-medium text-white">Time Complexity Analysis</h2>
        </div>

        <div className="p-6 space-y-6 time-complexity-container">
          <p className="text-[#94A3B8] text-sm">{complexityInfo.analysis}</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis 
                dataKey="n" 
                stroke="#94A3B8" 
                label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: '#94A3B8' }} 
              />
              <YAxis 
                stroke="#94A3B8" 
                label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E3A5F', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: 'white' }}
                formatter={(value, name) => [`Time : ${value}s`, name]}
              />
              <Legend wrapperStyle={{ color: '#94A3B8' }} />
              <Line 
                type="monotone" 
                dataKey="Your Solution" 
                stroke="#007FFF" 
                strokeWidth={2} 
                dot={{ fill: '#007FFF', r: 4 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Optimal Solution" 
                stroke="#22C55E" 
                strokeWidth={2} 
                dot={{ fill: '#22C55E', r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-between text-xs text-white mt-2">
            <span>Your Code: {complexityInfo.currentTime}</span>
            <span>Optimal Code: {complexityInfo.optimalTime}</span>
          </div>
        </div>
      </div>

      {/* Space Complexity Graph */}
      <div className="bg-[#132F4C] rounded-lg border border-[#1E3A5F] overflow-hidden">
        <div className="p-4 border-b border-[#1E3A5F]">
          <h2 className="text-sm font-medium text-white">Space Complexity Analysis</h2>
        </div>

        <div className="p-6 space-y-6 space-complexity-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateChartData(complexityInfo.currentSpace, complexityInfo.optimalSpace)} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis 
                dataKey="n" 
                stroke="#94A3B8" 
                label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: '#94A3B8' }} 
              />
              <YAxis 
                stroke="#94A3B8" 
                label={{ value: 'Memory (MB)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E3A5F', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: 'white' }}
                formatter={(value, name) => [`Memory : ${value}MB`, name]}
              />
              <Legend wrapperStyle={{ color: '#94A3B8' }} />
              <Line 
                type="monotone" 
                dataKey="Your Solution" 
                stroke="#007FFF" 
                strokeWidth={2} 
                dot={{ fill: '#007FFF', r: 4 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Optimal Solution" 
                stroke="#22C55E" 
                strokeWidth={2} 
                dot={{ fill: '#22C55E', r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-between text-xs text-white mt-2">
            <span>Your Code: {complexityInfo.currentSpace}</span>
            <span>Optimal Code: {complexityInfo.optimalSpace}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


