"use client";

import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { SearchInput } from "@/components/home/SearchInput";
import { Navbar } from "@/components/navbar";

export default function Home() {
   return (
      <div className='min-h-screen relative'>
         {/* Animated Background */}
         <AnimatedBackground />

         {/* Gradient Overlay */}
         <div className='fixed inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-[1px]' />

         {/* Content */}
         <div className='relative z-10'>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6'>
               <div className='max-w-4xl mx-auto text-center space-y-8'>
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
