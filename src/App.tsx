import { LayoutDashboard, Code2, Terminal, Play, Sparkles } from 'lucide-react'
import { generateDashboard } from './lib/groq'
import React, { useState } from 'react'


function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [promptInput, setPromptInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')

  const handleGenerate = async () => {
    if(!jsonInput) return
    setIsLoading(true)

    try{
      const result = await generateDashboard(jsonInput, promptInput)
      if (result) {
        setHtmlContent(result)
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
      <div className='w-[40%] min-w-[450px] flex flex-col border-r border-white/5 bg-zinc-900/50 backdrop-blur-xl relative'>

        <header className='p-6 border-b border-white/5 flex items-center justify-between shrink-0 relative z-10'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-teal-500/10 rounded-lg border border-teal-500/20'>
            <LayoutDashboard className='w-5 h-5 text-teal-400'/>
          </div>
          <div>
            <h1 className='font-bold text-lg tracking-wide text-zinc-100'>Instant<span className='text-teal-400'>Dash</span></h1>
            <p className='text-xs text-zinc-500 font-mono'>Generate interactive dashboards from your data</p>
          </div>
        </div>
        </header>

        {/* Input Area*/}
        <div className='flex-1 overflow-y-auto p-6 space-y-8 relative z-10 custom-scrollbar'>

          {/* JSON Data Input Section */}
          <section className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-bold text-teal-400/80 uppercase tracking-widest flex items-center gap-2'>
              <Code2 className='w-3 h-3'/>
              Input Data (JSON)
            </label>
            <span className='text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/5'>Required</span>  
            </div>

            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none'/>
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
    
          {/* Prompt Input Section */}
          <section className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-bold text-teal-400/80 uppercase tracking-widest flex items-center gap-2'>
                <Terminal className='w-3 h-3'/>
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
            { isLoading ? (
              <>
              <Sparkles className='w-5 h-5 animate-spin'/>
              <span>PROCESSING...</span>
              
              </>
            ): (
              <>
              <Play className='w-5 h-5 fill-current'/>
              <span>GENERATE PREVIEW</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className='flex-1 bg-zinc-100 relative overflow-hidden flex flex-col'>

        {/* Top bar */}
        <div className='h-16 border-b border-zinc-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm z-20'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-zinc-300'></div>
            <span className='text-xs font-medium text-zinc-400 uppercase tracking-wider'>
              Preview Canvas
            </span>
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
            <div className='w-full h-full max-w-5xl bg-white rounded-lg shadow-xl border border-zinc-200 overflow-hidden relative group'>

              {/* Placeholder */}
              { htmlContent ? (
                <iframe
                  srcDoc={htmlContent}
                  title="Dashboard Preview"
                  className='w-full h-full border-none'
                  sandbox='allow-scripts'
                  />
              ) : (
                  <div className='absolute inset-0 flex items-center justify-center text-zinc-400 flex-col gap-6'>
                    <div className='w-24 h-24 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500'>
                      <LayoutDashboard className='w-10 h-10 opacity-20'/>
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
      </div>

  )
}

export default App
