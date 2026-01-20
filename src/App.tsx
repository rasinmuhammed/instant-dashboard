import { LayoutDashboard } from 'lucide-react'
import React, { useState } from 'react'

function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [promptInput, setPromptInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='flex h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-teal-500/30'>

      {/* Left Sidebar */}
      <div className='w-[40%] min-w-[450px] flex flex-col border-r border-white/5 bg-zinc-900/50 backdrop-blur-xl relative'>

        <header className='p-6 border-b border-white/5 flex items-center justify-between shrink-0 relative z-10'>
          <LayoutDashboard />
          <h1>Instant Dashboard</h1>
        </header>

        {/* Input Area*/}
        <div>
          <section>
            <label>
              <span></span>
              Data Source (JSON)
            </label>
            <textarea/>
          </section>

          <section>
            <label>
              <span></span>
              Your Prompt
            </label>
            <textarea/>
            
          </section>
        </div>

        {/* Footer */}
        <div>
          <button>

          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div>
        <div>
          <label>
            Live Preview
          </label>

          <div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Preview Placeholder */}
            <div>
              <div>
                <LayoutDashboard />
              </div>
              <p>Generated dashboard will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
