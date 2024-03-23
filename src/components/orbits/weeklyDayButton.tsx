import { MouseEventHandler } from 'react'

interface WeeklyDayButtonProps {
    day: string
    isSelected: boolean
    onClickHandler: MouseEventHandler<HTMLButtonElement>
}

const notClickedBtn = 'font-bold border-2 text-black border-solid border-[#000000] rounded-full p-1 w-9 m-1 bg-[#FFFFFF]'
const clickedBtn = 'font-bold border-2 text-white border-solid border-[#000000] rounded-full p-1 w-9 m-1 bg-[#9C4A98]'

function OrbitWeeklyDayButton({ day, isSelected, onClickHandler }: WeeklyDayButtonProps) {
    return (
        <button
            key={`add/WeeklyInput/${day}`}
            className={isSelected ? clickedBtn : notClickedBtn}
            id={`add/WeeklyInput/${day}`}
            type="button"
            value={day}
            onClick={onClickHandler}
        >
            {day.slice(0, 1)}
        </button>
    )
}

export default OrbitWeeklyDayButton
