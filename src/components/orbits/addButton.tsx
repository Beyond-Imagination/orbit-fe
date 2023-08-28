import { Plus } from '@/icon'

export default function AddButton() {
    return (
        <button type="button" className="w-full h-32 border-2 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16">
                <Plus />
            </div>
        </button>
    )
}
