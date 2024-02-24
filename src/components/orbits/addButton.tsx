import { Plus } from '@/icon'
import { Dispatch, SetStateAction } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

interface AddButtonProps {
    setAdding: Dispatch<SetStateAction<boolean>>
}

export default function AddButton({ setAdding }: AddButtonProps) {
    return (
        <div className="relative group">
            <button
                type="button"
                onClick={() => setAdding(true)}
                data-tooltip-id="Plus"
                data-tooltip-content="Add new orbit message"
                className="w-full h-32 border-2 rounded-lg flex items-center justify-center"
            >
                <div className="w-16 h-16">
                    <Plus />
                </div>
            </button>
            <Tooltip id="Plus" place="top" border="3px solid purple" />
        </div>
    )
}
