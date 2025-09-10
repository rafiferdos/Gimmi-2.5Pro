"use client";

import ChatPanel from "@/components/ChatPanel";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { SearchInput } from "@/components/home/SearchInput";

export default function Home() {
   return (
      <div className='min-h-screen relative neon-bg overflow-hidden'>
         <div className='absolute inset-0 pointer-events-none neon-noise' />
         <div className='relative z-10 flex flex-col items-center justify-start pt-20 pb-24 px-6'>
            <div className='max-w-5xl w-full text-center space-y-16'>
               <HeroSection />
               <FeatureCards />
               <SearchInput />
               <ChatPanel />
               <QuickActions />
            </div>
         </div>
      </div>
   );
}
