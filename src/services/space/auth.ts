export default function getUserAccessToken() {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port1.onmessage = e => resolve(e.data)
        window.parent.postMessage(
            {
                type: 'GetUserTokenRequest',
                permissionScope: 'global:Profile.View',
                askForConsent: true,
            },
            '*',
            [channel.port2],
        )
    })
}
