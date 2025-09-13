"use client";

import { useState } from 'react';
import PromptForm from '@/components/prompt-form';
import AgentView from '@/components/agent-view';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePromptSubmit = (submittedPrompt: string) => {
    setPrompt(submittedPrompt);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAgentRunning(true);
    }, 1200); // Animation duration
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden relative">
        <Image
            src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/03da72234522093.68c4ebbaa1384.png"
            alt="Background"
            fill
            className="object-cover -z-20"
            data-ai-hint="futuristic abstract"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <h1 className="font-headline text-3xl text-white">Promptomation</h1>
            </div>
        </div>

      {!isAgentRunning &&
        <div className={`w-full max-w-2xl relative text-center ${isAnimating ? 'animate-form-out' : 'animate-in fade-in zoom-in-95 duration-500'}`}>
           <h2 className="font-headline text-3xl sm:text-4xl text-white">What will you work today?</h2>
           <p className="text-base text-white/80 mt-2 mb-8 max-w-xl mx-auto">
                vibe work your way to the top. Build AI browser agent that can automate your work so you can sit back and relax and enjoy your day
           </p>
          <PromptForm onSubmit={handlePromptSubmit} isAnimating={isAnimating} />
        </div>
      }
      {isAgentRunning && (
        <AgentView prompt={prompt} />
      )}
    </main>
  );
}
