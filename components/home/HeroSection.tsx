export const HeroSection = () => {
   return (
      <div className='space-y-4'>
         <h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent animate-pulse'>
            Hello, Gimmi
         </h1>
         <p className='text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto'>
            Your intelligent AI companion powered by Gemini. Ask anything,
            explore ideas, and discover new possibilities.
         </p>
      </div>
   );
};
