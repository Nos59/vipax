export function set(field) {
    return (state, payload) => state[field] = payload
}

export async function api(url, method = 'get' ) {
    const response = await fetch(url, {
        method: method
    })

    return response.json()
}