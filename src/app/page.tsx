"use client";

import { useState } from 'react';
import PromptForm from '@/components/prompt-form';
import AgentView from '@/components/agent-view';

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
      {!isAgentRunning &&
        <div className={`w-full max-w-2xl relative ${isAnimating ? 'animate-form-out' : 'animate-in fade-in zoom-in-95 duration-500'}`}>
          <PromptForm onSubmit={handlePromptSubmit} isAnimating={isAnimating} />
        </div>
      }
      {isAgentRunning && (
        <AgentView prompt={prompt} />
      )}
    </main>
  );
}
