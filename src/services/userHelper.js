export const initialState = {
    users: [],
    user: {
        firstname: null,
        lastname: null,
        username: null,
        role: null,
        token: null,
        amountBalance: null
    },
    error: null,
    message: null,
    loading: true,
    loggedIn: true
}

export const host = 'http://localhost:8828' || 'https://benion-tech-server.herokuapp.com'

export const formatAmount = (value) => {
    const dollarRate = 512
    let amount = value.toString()
    let inDollar = (Math.floor(value/dollarRate)).toString()

    if (amount.length >= 10 && amount.length <= 12) {
        let first = amount.slice(0, -9)
        let second = amount.slice(amount.length-9, amount.length-6)
        let third = amount.slice(amount.length-6, amount.length-3)
        let fourth = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third+","+fourth
    } else if (amount.length >= 7 && amount.length <= 9) {
        let first = amount.slice(0, -6)
        let second = amount.slice(amount.length-6, amount.length-3)
        let third = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third
    } else if (amount.length >= 4 && amount.length <= 6) {
        let first = amount.slice(0, -3)
        let second = amount.slice(amount.length-3, amount.length)
        amount = first+","+second
    }

    if (inDollar.length >= 10 && inDollar.length <= 12) {
        let first = inDollar.slice(0, -9)
        let second = inDollar.slice(inDollar.length-9, inDollar.length-6)
        let third = inDollar.slice(inDollar.length-6, inDollar.length-3)
        let fourth = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third+","+fourth
    } else if (inDollar.length >= 7 && inDollar.length <= 9) {
        let first = inDollar.slice(0, -6)
        let second = inDollar.slice(inDollar.length-6, inDollar.length-3)
        let third = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third
    } else if (inDollar.length >= 4 && inDollar.length <= 6) {
        let first = inDollar.slice(0, -3)
        let second = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second
    }

    return `${inDollar} (N${amount})`
}