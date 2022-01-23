const baseUrl = 'http://localhost:7000/api/player';

export function getPlayers() {
    return fetch(baseUrl).then(res => res.json());
}

export function addPlayer(player) {
    return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(player),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json());
}