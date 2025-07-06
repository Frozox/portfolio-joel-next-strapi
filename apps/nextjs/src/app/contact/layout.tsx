import { Title } from '@/components/ui/title';
import { Metadata } from 'next';

type TLayoutProps = {
  children: React.ReactNode
}

export const generateMetadata = (): Metadata => {
  return {
    title: 'Joel Chapeau • Contact',
  };
};

const ContactLayout = ({children} : Readonly<TLayoutProps>) => {
  return (
    <>
      <Title title='contact' className='mb-10 mt-8'/>
      {children}
    </>
  );
};

export default ContactLayout;