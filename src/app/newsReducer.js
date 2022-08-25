export const getCryptos = (state, action) => {
    return {
        ...state,
        cryptos: action.payload,
        loading: false
    }
}

export const getCrypto = (state, action) => {
    return {
        ...state,
        crypto: action.payload,
        loading: false
    }
}

export const getCryptoHistory = (state, action) => {
    return {
        ...state,
        cryptoHistory: action.payload,
        loading: false
    }
}

export const getCryptoNews = (state, action) => {
    return {
        ...state,
        news: {
            ...state.news,
            cryptoNews: action.payload,
        },
        loading: false
    }
}

export const getBingNews = (state, action) => {
    return {
        ...state,
        news: {
            ...state.news,
            bingNews: action.payload,
        },
        loading: false
    }
}

export const getPosts = (state, action) => {
    return {
        ...state,
        posts: action.payload,
        loading: false
    }
}