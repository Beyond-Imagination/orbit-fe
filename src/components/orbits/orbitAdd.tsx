import { useState } from 'react'

import { Check, Stop } from '@/icon'
import AddButton from '@/components/orbits/addButton'

export default function OrbitAdd() {
    const [adding, setAdding] = useState<boolean>(false)

    if (!adding) {
        return <AddButton setAdding={setAdding} />
    }

    return (
        <div className=" border-2 border-[#9C4A98] rounded p-2 w-full">
            <div className="flex justify-between">
                <div className="basis-10/12">
                    <form className="flex gap-6">
                        <div className="w-40">
                            <label htmlFor="add/ChannelNameInput" className="text-lg font-semibold">
                                Channel Name
                                <input id="add/ChannelNameInput" className="border rounded w-full p-1" placeholder="your channel name" />
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor="add/FormatSelect" className="text-lg font-semibold">
                                Format
                                <select id="add/FormatSelect" className="border rounded w-full p-1">
                                    <option>cron</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-32">
                            <label htmlFor="add/TimezoneSelect" className="text-lg font-semibold">
                                timezone
                                <select id="add/TimezoneSelect" className="border rounded w-full p-1">
                                    <option>ETC/UTC</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-56">
                            <label htmlFor="add/CronInput" className="text-lg font-semibold">
                                cron
                                <input id="add/CronInput" className="border rounded w-full p-1" placeholder="cron" />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="basis-2/12">
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => setAdding(false)} className="w-6 h-6">
                            <Stop />
                        </button>
                        <button type="button" className="w-6 h-6">
                            <Check />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="add/MessageTextarea" className="flex flex-col text-lg font-semibold">
                    message
                    <textarea id="add/MessageTextarea" className="border rounded p-2" placeholder="write your message" />
                </label>
            </div>
        </div>
    )
}
