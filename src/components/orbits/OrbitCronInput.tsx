import { isValidCron } from 'cron-validator'
import { useFormContext } from 'react-hook-form'

function OrbitCronInput() {
    type Inputs = {
        channelName: string
        type: string
        timezone: string
        cron: string
    }
    const { register } = useFormContext<Inputs>()
    return (
        <label htmlFor="add/CronInput" className="text-lg font-semibold">
            cron
            <div className="w-44">
                <input
                    id="add/CronInput"
                    className="border rounded w-full p-1"
                    placeholder="* * * * *"
                    {...register('cron', { validate: value => isValidCron(value, { alias: true }) || 'invalid cron format' })}
                />
            </div>
        </label>
    )
}

export default OrbitCronInput
