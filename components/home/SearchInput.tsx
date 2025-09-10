import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export const SearchInput = () => {
   return (
      <div className='max-w-2xl mx-auto mt-8'>
         <Input
            size='lg'
            placeholder='Ask me anything...'
            className='frosted'
            classNames={{
               inputWrapper:
                  "frosted hover:border-primary/50 group-data-[focus=true]:border-primary shadow-lg",
               input: "text-foreground placeholder:text-foreground/50",
            }}
            endContent={
               <Button
                  isIconOnly
                  color='primary'
                  variant='flat'
                  size='sm'
                  className='min-w-8 w-8 h-8'
               >
                  ➤
               </Button>
            }
         />
      </div>
   );
};
