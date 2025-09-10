import { Chip } from "@heroui/chip";

export const QuickActions = () => {
   const actions = [
      "Explain quantum physics",
      "Write a poem",
      "Plan a trip",
      "Solve math problems",
      "Code review",
   ];

   return (
      <div className='flex flex-wrap justify-center gap-3 mt-6'>
         {actions.map((action, index) => (
            <Chip
               key={index}
               variant='flat'
               className='backdrop-blur-md bg-content2/60 hover:bg-primary/20 cursor-pointer transition-all duration-200 hover:scale-105'
               onClick={() => {
                  /* Handle quick action */
               }}
            >
               {action}
            </Chip>
         ))}
      </div>
   );
};
