import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import WeeklyDayButton from '@/components/orbits/weeklyDayButton'

const dayMapper: {
    [Key: string]: number
} = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
}

const weeklyList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function OrbitWeeklyInput() {
    type Inputs = {
        channelName: string
        type: string
        timezone: string
        weekly: {
            days: number[] // ex) SUN,MON,TUE => [0, 1, 2]
            time: string
        }
    }
    const { register, setValue, watch } = useFormContext<Inputs>()

    const [selectedDays, setSelectedDays] = useState<string[]>([])

    useEffect(() => {
        const defaultWeekly = watch('weekly')
        setSelectedDays(defaultWeekly.days?.map(day => weeklyList[day]) ?? [])
    }, []) // 의존성 배열을 이용하여 최초 렌더링 시에만 실행되도록 설정

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
        const { value } = event.target as HTMLButtonElement
        const updatedDays = selectedDays.includes(value) ? selectedDays.filter(day => day !== value) : [...selectedDays, value]
        setSelectedDays(updatedDays)
        const daysList = updatedDays.map(day => dayMapper[day])
        setValue('weekly.days', daysList)
    }
    const isSelected = (value: string) => selectedDays?.includes(value)

    return (
        <div className="w-fit flex items-start">
            <div className="text-lg font-semibold">Time</div>
            <div className="flex w-fit mt-8 mr-12" key="add/WeekInput/time">
                <input type="time" className="w-fit border-2 border-solid" {...register('weekly.time', { required: 'time is required' })} />
            </div>
            <div className="ml-4 text-lg font-semibold">Date</div>
            <div className="w-fit mt-6" key="add/WeekInput">
                {weeklyList.map(value => (
                    <WeeklyDayButton key={value} day={value} isSelected={isSelected(value)} isDisabled={false} onClickHandler={handleButtonClick} />
                ))}
            </div>
        </div>
    )
}

export default OrbitWeeklyInput
