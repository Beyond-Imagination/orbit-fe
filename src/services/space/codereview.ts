export async function AddReviewParticipant(token: string, serverUrl: string, projectId: string, reviewId: string, userId: string): Promise<void> {
    const url = `${serverUrl}/api/http/projects/id:${projectId}/code-reviews/id:${reviewId}/participants/id:${userId}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            role: 'Reviewer',
        }),
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
}
