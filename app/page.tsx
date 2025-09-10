"use client";

import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { SearchInput } from "@/components/home/SearchInput";

export default function Home() {
   return (
      <div className='min-h-screen relative'>
         {/* Animated Background */}
         <AnimatedBackground />

         {/* Gradient Overlay - Much lighter to show balls */}
         <div className='fixed inset-0 bg-gradient-to-br from-background/30 via-background/20 to-background/30' />

         {/* Content */}
         <div className='relative z-10'>
            {/* Main Content */}
            <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6'>
               <div className='max-w-4xl mx-auto text-center space-y-8 frosted rounded-3xl p-8 backdrop-blur-md'>
                  {/* Hero Section */}
                  <HeroSection />

                  {/* Feature Cards */}
                  <FeatureCards />

                  {/* Search Input */}
                  <SearchInput />

                  {/* Quick Actions */}
                  <QuickActions />
               </div>
            </div>
         </div>
      </div>
   );
}
