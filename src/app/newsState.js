import { production } from '../services/userHelper'

export const getCryptos = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/all-cryptos',
        method: 'get',
        baseURL: host,
        headers: config.headers,
        data: details
    }).then(response => {
        !production && (console.log("Get Cryptos Response", response))
        dispatch({
            type: ACTIONS.getCryptos,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Cryptos Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
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
        !production && (console.log("Get Crypto History Response", response))
        dispatch({
            type: ACTIONS.getCryptoHistory,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Crypto History Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
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
        !production && (console.log("Get Crypto Response", response))
        dispatch({
            type: ACTIONS.getCrypto,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Crypto Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
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
        !production && (console.log("Get Crypto News Response", response))
        dispatch({
            type: ACTIONS.getCryptoNews,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Crypto News Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
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
        !production && (console.log("Get Bing News Response", response))
        dispatch({
            type: ACTIONS.getCryptoNews,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Bing News Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Bing News Error (${error.message})`
        })
    })
}
