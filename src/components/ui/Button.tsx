export default function Button({
    label,
    type,
    disabled
}: {
    label: string
    type: "submit" | "reset" | "button" | undefined
    disabled: boolean
}) {
    return <button type={type}
        className="bg-blue-500 py-2 px-3 rounded-3xl my-2 disabled:opacity-75"
        disabled={disabled} >
        {label}
    </button>
}