import { cn } from '@/libs/utils';

export type TLoadingError = {
  error?: string | null
}

export type TContentLoader = {
  children: React.ReactNode,
  error?: string | null
  isLoading: boolean,
  isError: boolean,
  className?: string
}

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn('fixed inset-x-0 inset-y-0 flex justify-center items-center bg-background', className)}>
      <div className="relative inline-flex">
        <div className="size-8 rounded-full bg-foreground"></div>
        <div className="absolute left-0 top-0 size-8 animate-ping rounded-full bg-foreground"></div>
        <div className="absolute left-0 top-0 size-8 animate-pulse rounded-full bg-foreground"></div>
      </div>
    </div>
  );
};

export const LoadingError = ({ error }: TLoadingError) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative inline-flex">
        <div className="text-2xl text-foreground md:text-4xl">{error ?? (<>Une erreur est survenue :(</>)}</div>
      </div>
    </div>
  );
};

export const ContentLoader = ({ error, isLoading, isError, children, className }: TContentLoader) => {
  return (
    isError ? (
      <LoadingError error={error} />
    ) : (
      isLoading ? (
        <Loading className={className} />
      ) : (
        <>
          {children}
        </>
      )
    )
  );
};