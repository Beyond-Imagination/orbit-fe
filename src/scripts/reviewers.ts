import { GetTeam, AddReviewParticipant } from '@/services/space'
;(async () => {
    try {
        const token = process.env.SPACE_AUTOMATION_AUTHORIZATION
        const projectId = process.env.PROJECT_ID
        const reviewId = process.env.REVIEW_ID
        const serverUrl = 'https://beyond-imagination.jetbrains.space'

        const team = await GetTeam(token!, serverUrl)
        for (const membership of team.memberships) {
            // 스페이스에 동일한 db update 쿼리를 동시에 날리면 너무 많은 시간이 소요됨. 순차적으로 요청
            await AddReviewParticipant(token!, serverUrl, projectId!, reviewId!, membership.member.id)
        }
    } catch (e) {
        console.error('fail to add reviewer', e)
        throw e
    }
})()
