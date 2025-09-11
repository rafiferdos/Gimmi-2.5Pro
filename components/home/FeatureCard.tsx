import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
   icon: string;
   title: string;
   description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
   return (
      <Card className='hover:scale-[1.04] transition-all duration-300 cursor-pointer hover:shadow-lg'>
         <CardContent className='text-center p-6'>
            <div className='text-4xl mb-3'>{icon}</div>
            <h3 className='text-lg font-semibold mb-2 text-gray-900 dark:text-white'>
               {title}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
               {description}
            </p>
         </CardContent>
      </Card>
   );
};
