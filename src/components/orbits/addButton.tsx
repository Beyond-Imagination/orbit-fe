import { Plus } from '@/icon'
import { Dispatch, SetStateAction } from 'react'

interface AddButtonProps {
    setAdding: Dispatch<SetStateAction<boolean>>
}

export default function AddButton({ setAdding }: AddButtonProps) {
    return (
        <button type="button" onClick={() => setAdding(true)} className="w-full h-32 border-2 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16">
                <Plus />
            </div>
        </button>
    )
}
