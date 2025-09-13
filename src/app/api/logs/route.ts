import { NextResponse } from 'next/server';

const logMessages = [
  "Navigating to login page...",
  "Typing username into field.",
  "Typing password into field.",
  "Clicking the 'Sign In' button.",
  "Successfully logged in, navigating to dashboard.",
  "Scanning for unread messages.",
  "Found 3 unread messages.",
  "Clicking on the first unread message.",
  "Parsing message content.",
  "Taking a screenshot of the page.",
];

let currentIndex = 0;

export async function GET() {
  // To avoid it running out of messages, we'll loop
  if (currentIndex >= logMessages.length) {
    currentIndex = 0;
  }
  
  const message = logMessages[currentIndex];
  currentIndex++;

  const log = {
    timestamp: Date.now(),
    message: message,
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(log);
}
