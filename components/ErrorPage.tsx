type ErrorPageProps = {
    serverError: boolean;
}
export default function ErrorPage({serverError}: ErrorPageProps){
    return (
        <div className="flex flex-row items-center justify-center">
            {serverError ? <h1 className="text-red-600 mt-64 text-3xl">Could not fetch data from the server. Please try again later.</h1> : 
            <h1 className="text-red-600 mt-64 text-3xl">This post does not exist.</h1>}
        </div>
    )
}