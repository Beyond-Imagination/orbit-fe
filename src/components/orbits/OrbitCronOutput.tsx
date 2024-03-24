import React from 'react'

function OrbitCronOutput({ cron }: { cron: string }) {
    return (
        <div className="w-44">
            <div className="text-lg font-semibold">cron</div>
            <div className="border rounded text-center p-1">{cron}</div>
        </div>
    )
}

export default OrbitCronOutput
