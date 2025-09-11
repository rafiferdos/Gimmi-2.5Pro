import { Badge } from "@/components/ui/badge";

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
            <Badge
               key={index}
               variant='secondary'
               className='cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-2'
               onClick={() => {
                  /* Handle quick action */
               }}
            >
               {action}
            </Badge>
         ))}
      </div>
   );
};
