export const getCryptos = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/all-cryptos',
        method: 'get',
        baseURL: host,
        headers: config.headers,
        data: details
    }).then(response => {
        dispatch({
            type: ACTIONS.getCryptos,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Cryptos Error (${error.message})`
        })
    })
}

export const getCryptoHistory = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/crypto-history',
        method: 'get',
        baseURL: host,
        headers: config.headers,
        data: details
    }).then(response => {
        dispatch({
            type: ACTIONS.getCryptoHistory,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Crypto History Error (${error.message})`
        })
    })
}

export const getCrypto = (id, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: `/benion-news/api/crypto/${id}`,
        method: 'get',
        baseURL: host,
        headers: config.headers
    }).then(response => {
        dispatch({
            type: ACTIONS.getCrypto,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Crypto Error (${error.message})`
        })
    })
}

export const getCryptoNews = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/crypto-news',
        method: 'get',
        baseURL: host,
        headers: config.headers,
        data: details
    }).then(response => {
        console.log("Cryptos News", response.data.data)
        dispatch({
            type: ACTIONS.getCryptoNews,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Crypto News Error (${error.message})`
        })
    })
}

export const getBingNews = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/bing-news',
        method: 'get',
        baseURL: host,
        headers: config.headers,
        data: details
    }).then(response => {
        console.log("Bing News", response.data.data)
        dispatch({
            type: ACTIONS.getCryptoNews,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Bing News Error (${error.message})`
        })
    })
}
