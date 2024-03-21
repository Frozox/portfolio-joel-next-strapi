export type TLoadingError = {
    error: string | null
}

export type TContentLoader = {
    children: React.ReactNode,
    error: string | null
    isLoading: boolean,
    isError: boolean
}

export const Loading = () => {
    return (
        <div className="fixed inset-x-0 inset-y-0 flex justify-center items-center bg-background">
            <div className="relative inline-flex">
                <div className="w-8 h-8 bg-foreground rounded-full"></div>
                <div className="w-8 h-8 bg-foreground rounded-full absolute top-0 left-0 animate-ping"></div>
                <div className="w-8 h-8 bg-foreground rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
        </div>
    )
}

export const LoadingError = ({ error }: TLoadingError) => {
    return (
        <div className="fixed inset-x-0 inset-y-0 flex justify-center items-center bg-background">
            <div className="relative inline-flex">
                <div className="text-foreground text-2xl md:text-4xl">{error ?? (<>Une erreur est survenue :(</>)}</div>
            </div>
        </div>
    )
}

export const ContentLoader = ({ error, isLoading, isError, children }: TContentLoader) => {
    return (
        isError ? (
            <LoadingError error={error} />
        ) : (
            isLoading ? (
                <Loading />
            ) : (
                <>
                    {children}
                </>
            )
        )
    )
}