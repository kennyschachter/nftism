export const login = async () => {
    let res = undefined

    res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_HOST}/api/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: process.env.NEXT_PUBLIC_STRAPI_AUTH_IDENTIFIER,
            password: process.env.NEXT_PUBLIC_STRAPI_AUTH_PASSWORD,
        })
    }).then((res) => res.json());

    return res
}

export const createOrder = async (data) => {
    let res = undefined
    let auth = await login()

    if (auth && auth.jwt) {
        res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_HOST}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.jwt}`,
            },
            body: JSON.stringify({ data })
        }).then((r) => r.json())
        return res;
    } else {
        throw new Error("Something went wrong.")
    }
}

export const sendEmail = async (data) => {
    let res = await fetch('/api/confirm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((r) => r.json())
    return res
}