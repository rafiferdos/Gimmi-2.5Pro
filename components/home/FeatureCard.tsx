import { Card, CardBody } from "@heroui/card";

interface FeatureCardProps {
   icon: string;
   title: string;
   description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
   return (
      <Card
         className='frosted hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20'
         isPressable
      >
         <CardBody className='text-center p-6'>
            <div className='text-4xl mb-3'>{icon}</div>
            <h3 className='text-lg font-semibold mb-2 text-foreground'>
               {title}
            </h3>
            <p className='text-sm text-foreground/60'>{description}</p>
         </CardBody>
      </Card>
   );
};
