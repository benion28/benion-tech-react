import { production } from '../services/userHelper'

export const getCryptos = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/all-cryptos',
        method: 'post',
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
            payload: `Get Cryptos Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const getCryptoHistory = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/crypto-history',
        method: 'post',
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
            payload: `Get Crypto History Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const getCrypto = (id, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: `/benion-news/api/crypto/${id}`,
        method: 'post',
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
            payload: `Get Crypto Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const getCryptoNews = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/crypto-news',
        method: 'post',
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
            payload: `Get Crypto News Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const getBingNews = (details, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/bing-news',
        method: 'post',
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
            payload: `Get Bing News Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const addPost = (data, axios, host, adminConfig, ACTIONS, dispatch, getPosts) => {
    axios({
        url: '/benion-news/api/add-post',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data
    }).then(response => {
        !production && (console.log("Add Post Response", response))
        getPosts()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Add Post Error", error))
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
            payload: `Add Post Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const getPosts = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-news/api/all-posts',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Posts Response", response))
        dispatch({
            type: ACTIONS.getPosts,
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
        !production && (console.log("Get Posts Error", error))
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
            payload: `Get Posts Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const updatePost = (data, axios, host, adminConfig, ACTIONS, dispatch, getPosts) => {
    axios({
        url: `/benion-news/api/edit-post/${data.$key}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data
    }).then(response => {
        !production && (console.log("Update Post Response", response))
        getPosts()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update Post Error", error))
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
            payload: `Update Post Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const deletePost = (key, axios, host, adminConfig, ACTIONS, dispatch, getPosts) => {
    axios({
        url: `/benion-news/api/delete-post/${ key }`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Post Response", response))
        getPosts()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Post Error", error))
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
            payload: `Delete Post Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}