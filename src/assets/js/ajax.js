import axios from 'axios'

const formatRes = (res) => {
    if (res.success) {
        return Promise.resolve(res.result)
    }
    let url = window.location.href
    if (res.code === -1999) {
        this.$router.push({
            name: 'login',
            query: { url }
        })
        return false
    }
    return Promise.reject(res)
}

// add header
axios.interceptors.request.use((config) => {
    config.withCredentials = true
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}, (error) => {
    console.log('request-error:', error)
    return Promise.reject(error)
})

// format response
axios.interceptors.response.use((response) => {
    return formatRes(response.data)
})

export const _getPromise = (url, data = {}) => {
    return axios.get(url, { params: data }).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

export const _postPromise = (url, data = {}) => {
    return axios.post(url, data).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

export const _putPromise = (url, data = {}) => {
    return axios.put(url, data).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

export const _patchPromise = (url, data = {}) => {
    return axios.patch(url, data).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

export const _deletePromise = (url, data = {}) => {
    return axios.delete(url, data).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}
