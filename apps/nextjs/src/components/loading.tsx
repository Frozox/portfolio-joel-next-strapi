export type TContentLoader = {
    children: React.ReactNode,
    loaded: boolean,
    error: boolean
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

export const LoadingError = () => {
    return (
        <div className="fixed inset-x-0 inset-y-0 flex justify-center items-center bg-background">
            <div className="relative inline-flex">
                <div className="text-foreground text-2xl md:text-4xl">Une erreur est survenue :(</div>
            </div>
        </div>
    )
}

export const ContentLoader = ({ loaded, error, children }: TContentLoader) => {
    return (
        !error ? (
            loaded ? (
                <>
                    {children}
                </>
            ) : (
                <Loading />
            )
        ) : (
            <LoadingError />
        )
    )
}