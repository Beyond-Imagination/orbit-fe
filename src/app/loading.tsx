import { MoonLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
            <MoonLoader />
        </div>
    )
}
