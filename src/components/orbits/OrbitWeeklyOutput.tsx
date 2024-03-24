import WeeklyDayButton from '@/components/orbits/weeklyDayButton'
import React from 'react'

type Weekly = {
    days: number[]
    time: string
}

const weeklyList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
function OrbitWeeklyOutput({ weekly }: { weekly: Weekly }) {
    const { days, time } = weekly

    return (
        <div className="w-fit flex items-start">
            <div className="text-lg font-semibold">Time</div>
            <div className="flex w-fit mt-8 mr-12" key="read/WeeklyOutput/time">
                <input type="time" value={time} readOnly className="w-fit border-2 border-solid" />
            </div>
            <div className="ml-4 text-lg font-semibold">Date</div>
            <div className="w-fit mt-6" key="read/WeeklyOutput">
                {weeklyList.map((value, index) => (
                    <WeeklyDayButton key={value} day={value} isSelected={days.includes(index)} isDisabled onClickHandler={undefined} />
                ))}
            </div>
        </div>
    )
}

export default OrbitWeeklyOutput
