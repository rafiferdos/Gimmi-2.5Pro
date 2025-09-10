"use client";

import { MinimalChat } from "../components/MinimalChat";

export default function Home() {
   return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
         <div className='w-full max-w-2xl mx-auto'>
            <MinimalChat />
         </div>
      </div>
   );
}
