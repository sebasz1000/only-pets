export default function ErrorMsg({
    error
}: {
    error: string
}) {
    return <p className="text-center my-1 mt-0 p-2 bg-red-900 text-red-300 rounded-md text-xs">{error}</p>
}