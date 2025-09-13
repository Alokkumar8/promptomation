# **App Name**: Promptomation

## Core Features:

- Prompt Input: Accept a natural language prompt from the user for browser automation tasks.
- Agent Creation: Upon submission, the app will call the endpoint `https://exampleapi.com/create-agent-from-prompt?prompt={prompt}` to create an agent based on the user's prompt.
- Split Screen Transition: Animate the transition by splitting the prompt window into two sections, left and right panels.
- Live Agent View: The right panel displays a live view of the agent in action using an iframe, updating every 5 seconds with data from `https://exampleapi.com/live-view`, which returns `{"live_view_url": "https://example.com"}`
- Log Feed: The left panel shows a live feed of logs from the agent, updating every 5 seconds from `https://exampleapi.com/logs-api`, which returns `{"timestamp": 534895959354, "message": "click on button"}`

## Style Guidelines:

- Primary color: Vibrant blue (#29ABE2) to represent technology and automation.
- Background color: Light blue (#E0F7FA), a very desaturated tint of the primary, for a clean and modern look.
- Accent color: A turquoise color (#40E0D0) analogous to the primary for interactive elements and highlights.
- Font pairing: 'Space Grotesk' (sans-serif) for headings and 'Inter' (sans-serif) for body text.
- Single-page layout with a prominent prompt input section and split-screen display for live view and logs. Use Next.js and Tailwind.
- Smooth transitions and subtle animations when splitting the screen and updating data feeds.