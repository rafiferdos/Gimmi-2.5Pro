'use client';

import { MinimalChat } from '../components/MinimalChat';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <MinimalChat />
    </div>
  );
}
