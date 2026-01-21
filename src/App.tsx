import { LayoutDashboard, Code2, Terminal, Play, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import { generateDashboard } from './lib/llm'
import React, { useState, useEffect } from 'react'


function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [promptInput, setPromptInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [provider, setProvider] = useState<'groq' | 'openai'>('groq')
  const [blobUrl, setBlobUrl] = useState<string>('')

  // Create and cleanup blob URL for iframe
  useEffect(() => {
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setBlobUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [htmlContent])

  const handleGenerate = async () => {
    if (!jsonInput) return
    setIsLoading(true)

    // Validate JSON Input
    try {
      JSON.parse(jsonInput)
    } catch (e) {
      alert("Invalid JSON: please check your syntax. For eg. missing quotes or commas.")
      setIsLoading(false)
      return
    }

    try {
      const result = await generateDashboard(jsonInput, promptInput, provider)
      if (result) {
        setHtmlContent(result)
        setIsSidebarOpen(false)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to generate dashboard. Check console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-teal-500/30'>

      {/* Left Sidebar */}
      <div className={`${isSidebarOpen ? 'w-[40%] min-w-[450px] opacity-100' : 'w-0 min-w-0 opacity-0 overflow-hidden'}
      transition-all duration-500 ease-in-out flex flex-col border-r border-white/5 bg-zinc-900/50 backdrop-blur-xl relative`}>

        <header className='p-6 border-b border-white/5 flex items-center justify-between shrink-0 relative z-10'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-teal-500/10 rounded-lg border border-teal-500/20'>
              <LayoutDashboard className='w-5 h-5 text-teal-400' />
            </div>
            <div>
              <h1 className='font-bold text-lg tracking-wide text-zinc-100'>Instant<span className='text-teal-400'>Dash</span></h1>
              <p className='text-xs text-zinc-500 font-mono'>Generate interactive dashboards from your data</p>
            </div>
          </div>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as 'groq' | 'openai')}
            className="px-2 py-1 bg-zinc-800 border border-white/10 rounded text-xs"
          >
            <option value="groq">Groq (Llama 3.3)</option>
            <option value="openai">OpenAI (GPT-5-mini)</option>
          </select>
        </header>



        {/* Input Area*/}
        <div className='flex-1 overflow-y-auto p-6 space-y-8 relative z-10 custom-scrollbar'>

          {/* JSON Data Input Section */}
          <section className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-bold text-teal-400/80 uppercase tracking-widest flex items-center gap-2'>
                <Code2 className='w-3 h-3' />
                Input Data (JSON)
              </label>
              <span className='text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/5'>Required</span>
            </div>

            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none' />
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='
                  {
                  "revenue": 5000,
                  "growth: "+12%",
                  "items"L [...]
                  }'
                className='w-full h-80 p-5 font-mono text-sm bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all resize-none text-zinc-300 placeholder:text-zinc-700 shadow-inner'
                spellCheck={false}
              />
            </div>
          </section>

          {/* Preset Templates */}
          <section className='space-y-3'>
            <label className='text-xs font-bold text-teal-400/80 uppercase tracking-widest flex items-center gap-2'>
              <Zap className='w-3 h-3' />
              Quick Start Templates
            </label>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => {
                  setJsonInput(JSON.stringify({
                    "company": "TechCorp Analytics",
                    "period": "Q4 2024",
                    "kpis": {
                      "totalRevenue": 2450000,
                      "revenueGrowth": 34.5,
                      "activeUsers": 125430,
                      "userGrowth": 12.8
                    },
                    "monthlyRevenue": [
                      { "month": "Jan", "revenue": 180000, "expenses": 120000 },
                      { "month": "Feb", "revenue": 195000, "expenses": 125000 },
                      { "month": "Mar", "revenue": 210000, "expenses": 130000 },
                      { "month": "Apr", "revenue": 225000, "expenses": 135000 },
                      { "month": "May", "revenue": 240000, "expenses": 140000 },
                      { "month": "Jun", "revenue": 265000, "expenses": 145000 }
                    ],
                    "usersByPlan": [
                      { "plan": "Free", "users": 45000 },
                      { "plan": "Starter", "users": 35000 },
                      { "plan": "Professional", "users": 30000 },
                      { "plan": "Enterprise", "users": 15430 }
                    ]
                  }, null, 2))
                  setPromptInput('Create a premium SaaS analytics dashboard with modern design. Include KPI cards at the top showing revenue, growth %, active users, and user growth with appropriate icons. Add a dual-axis line chart comparing monthly revenue vs expenses trends. Include a colorful donut chart showing user distribution by plan (Free, Starter, Professional, Enterprise). Use a professional color scheme with gradients, shadows, and smooth animations. Make it visually impressive.')
                }}
                className='px-3 py-1.5 text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all text-purple-300'
              >
                SaaS Analytics
              </button>
              <button
                onClick={() => {
                  setJsonInput(JSON.stringify({
                    "store": "E-Shop Pro",
                    "sales": {
                      "today": 45200,
                      "week": 312000,
                      "month": 1250000
                    },
                    "topProducts": [
                      { "name": "Wireless Headphones", "sold": 245, "revenue": 24500 },
                      { "name": "Smart Watch", "sold": 189, "revenue": 56700 },
                      { "name": "Laptop Stand", "sold": 156, "revenue": 7800 }
                    ],
                    "orders": [
                      { "id": "ORD-1234", "customer": "John Doe", "amount": 299, "status": "shipped" },
                      { "id": "ORD-1235", "customer": "Jane Smith", "amount": 599, "status": "processing" }
                    ]
                  }, null, 2))
                  setPromptInput('Create a modern e-commerce dashboard with a clean card-based layout. Show sales metrics (today, week, month) prominently. Include a horizontal bar chart for top 3 products ranked by revenue. Add a detailed orders table with customer names, amounts, and color-coded status badges (green for shipped, yellow for processing). Use a fresh, commerce-friendly color palette with emerald and blue accents.')
                }}
                className='px-3 py-1.5 text-xs bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all text-green-300'
              >
                E-Commerce
              </button>
              <button
                onClick={() => {
                  setJsonInput(JSON.stringify({
                    "infrastructure": "Production Cluster",
                    "metrics": {
                      "uptime": 99.97,
                      "requests": 1250000,
                      "errors": 234,
                      "avgResponseTime": 145
                    },
                    "services": [
                      { "name": "API Gateway", "status": "healthy", "cpu": 45, "memory": 67 },
                      { "name": "Database", "status": "healthy", "cpu": 72, "memory": 81 },
                      { "name": "Cache", "status": "warning", "cpu": 23, "memory": 91 }
                    ]
                  }, null, 2))
                  setPromptInput('Create a DevOps monitoring dashboard with a dark professional theme. Display system metrics in stat cards (uptime %, total requests, errors, avg response time in ms). Include a services health table with color-coded status indicators: green badges for "healthy", yellow for "warning", red for "critical". Add mini progress bars or gauges showing CPU and memory usage percentages for each service. Use a tech-focused color scheme with blues and cyans.')
                }}
                className='px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all text-blue-300'
              >
                DevOps
              </button>
              <button
                onClick={() => {
                  setJsonInput(JSON.stringify({
                    "report_title": "Monthly Office Spending",
                    "currency": "USD",
                    "expenses": [
                      { "item": "High-speed Internet", "amount": 250 },
                      { "item": "Coffee & Snacks", "amount": 400 },
                      { "item": "Software Subscriptions", "amount": 1200 },
                      { "item": "Office Electricity", "amount": 350 }
                    ]
                  }, null, 2))
                  setPromptInput('Create a clean business dashboard. Show a total spending summary at the top and a simple table below for the items. Use a professional font and light grey background.')
                }}
                className='px-3 py-1.5 text-xs bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-lg hover:border-orange-500/50 transition-all text-orange-300 font-medium'
              >
                Official Test Case
              </button>
            </div>
          </section>

          {/* Prompt Input Section */}
          <section className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-bold text-teal-400/80 uppercase tracking-widest flex items-center gap-2'>
                <Terminal className='w-3 h-3' />
                Directives (Prompt)
              </label>
            </div>
            <div className='relative'>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder='Ex. Create a minimalistic dark-mode dashboard with a line chart showing trend...'
                className='w-full h-32 p-5 text-sm bg-black/40 border border-white/10 rounded-xl focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all resize-none text-zinc-300 placeholder:text-zinc-700 shadow-inner'
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-white/5 bg-zinc-900/80 shrink-0 relative z-10 backdrop-blur-md'>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !jsonInput}
            className='w-full py-4 px-6 bg-teal-500 hover:bg-teal-400 text-zinc-950 rounded-xl font-bold tracking-wide shadow-lg shadow-teal-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group'
          >
            {isLoading ? (
              <>
                <Sparkles className='w-5 h-5 animate-spin' />
                <span>PROCESSING...</span>

              </>
            ) : (
              <>
                <Play className='w-5 h-5 fill-current' />
                <span>GENERATE PREVIEW</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className='flex-1 bg-zinc-100 relative overflow-hidden flex flex-col transition-all duration-500'>

        {/* Top bar */}
        <div className='h-16 border-b border-zinc-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm z-20'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors'
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <div className='h-4 w-[1px] bg-zinc-200'></div>
            <span className='text-xs font-medium text-zinc-500 uppercase tracking-wider'>
              {viewMode === 'preview' ? 'Live Preview' : 'Source Code'}
            </span>
          </div>
          {/* VIEW TOGGLE */}
          <div className='flex bg-zinc-100 rounded-lg p-1 border border-zinc-200'>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'preview' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'code' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Code
            </button>
          </div>


          <div className='flex gap-2'>
            <div className='w-3 h-3 rounded-full bg-zinc-200'></div>
            <div className='w-3 h-3 rounded-full bg-zinc-200'></div>
          </div>
        </div>


        {/* Preview Container */}
        <div className='flex-1 p-8 overflow-hidden bg-zinc-100 flex items-center justify-center relative'>
          <div className='absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px]'>
          </div>

          {/* iFRAME container */}
          <div className='w-full h-full max-w-[1400px] bg-white rounded-lg shadow-xl border border-zinc-200 overflow-hidden relative group transition-all duration-500'>

            {/* Placeholder */}
            {htmlContent ? (
              viewMode === 'preview' ? (
                // Preview mode
                <iframe
                  src={blobUrl}
                  title="Dashboard Preview"
                  className="w-full h-full border-none"
                />
              ) : (
                // Source code
                <div className="w-full h-full bg-zinc-900 overflow-auto p-6 custom-scrollbar">
                  <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap font-thin leading-relaxed">
                    {htmlContent}
                  </pre>
                </div>
              )
            ) : (
              <div className='absolute inset-0 flex items-center justify-center text-zinc-400 flex-col gap-6'>
                <div className='w-24 h-24 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500'>
                  <LayoutDashboard className='w-10 h-10 opacity-20' />
                </div>
                <div className='text-center space-y-1'>
                  <p className='font-medium text-zinc-500'>Ready to Render</p>
                  <p className='text-xs text-zinc-400 max-w-xs mx-auto'>Enter your JSON data and prompt to generate a preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >

  )
}

export default App
