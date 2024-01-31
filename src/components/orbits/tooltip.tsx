interface TooltipProps {
    message: string
    show: boolean
}

function Tooltip({ message, show }: TooltipProps) {
    return (
        <div
            className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${
                show ? 'opacity-100' : 'opacity-0 invisible'
            } bottom-full mb-3 whitespace-nowrap`}
            style={{ right: '5px' }}
        >
            {message}
            <div className="tooltip-arrow" data-popper-arrow />
        </div>
    )
}

export default Tooltip
