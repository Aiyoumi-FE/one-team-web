import {
    _post,
    _postPromise
} from '../assets/js/ajax'

/* ================登陆================= */
export const init = (callback) => {
    return _post('/init', null, (data) => {
        callback(data)
    })
}

export const login = (param, callback) => {
    return _post('/user/login', param, (data) => {
        callback(data)
    })
}

export const register = (param, callback) => {
    return _post('/user/register', param, (data) => {
        callback(data)
    })
}

export const signout = (callback) => {
    return _post('/user/signout', null, (data) => {
        callback(data)
    })
}

/* 获取用户信息 */
export const getUsrInfo = (params, callback) => {
    return _postPromise('/user/getUsrInfo', params, (data) => {
        callback(data)
    })
}

/* 个人设置--更新信息 */
export const updateUserInfo = (params, callback) => {
    return _postPromise('/user/updateUserInfo', params, (data) => {
        callback(data)
    })
}
