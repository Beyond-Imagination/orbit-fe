import { Team } from '@/types'

export async function GetTeam(token: string, serverUrl: string): Promise<Team> {
    const url = `${serverUrl}/api/http/team-directory/teams/name:Beyond_Imagination?$fields=id,name,memberships(member(id,username))`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: null,
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return response.json()
}
