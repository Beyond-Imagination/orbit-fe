import { Plus } from '@/icon'
import { Dispatch, SetStateAction, useState } from 'react'
import Tooltip from './tooltip'

interface AddButtonProps {
    setAdding: Dispatch<SetStateAction<boolean>>
}

export default function AddButton({ setAdding }: AddButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div className="relative group">
            <button
                type="button"
                onClick={() => setAdding(true)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-full h-32 border-2 rounded-lg flex items-center justify-center"
            >
                <div className="w-16 h-16">
                    <Plus />
                </div>
            </button>
            <Tooltip message="Add new orbit message" show={showTooltip} />
        </div>
    )
}
