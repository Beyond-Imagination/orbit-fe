interface ErrorAlertProps {
    message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded relative" role="alert">
            <strong className="font-bold">{message}</strong>
        </div>
    )
}
