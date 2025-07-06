import { cn } from '@/libs/utils';

interface TitleProps {
    className?: string,
    title: string
}


function Title({
  className,
  title
}: TitleProps) {  
  return (
    <div className={cn('sticky inline-flex w-full items-center justify-center', className)}>
      <h1 data-char={title.charAt(0).toUpperCase()} className={cn('after:content-[attr(data-char)] after:absolute after:text-8xl after:left-1/2 after:-translate-x-1/2 after:-translate-y-10 after:-z-[1] after:text-zinc-300 after:dark:text-zinc-500')}><span className='text-4xl before:inline-block before:h-[2px] before:bg-foreground before:align-middle after:inline-block after:h-[2px] after:bg-foreground after:align-middle before:sm:mr-4 before:sm:w-8 after:sm:ml-4 after:sm:w-8'>{title.toUpperCase()}</span></h1>
    </div>
  );
}

export { Title };

