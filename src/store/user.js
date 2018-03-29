import {
    _getPromise,
    _postPromise,
    // _putPromise,
    _patchPromise,
    _deletePromise
} from '../assets/js/ajax'

// 登入
export const signIn = (param) => { return _postPromise('/api/v1/application', param) }
// 登出
export const signOut = () => { return _deletePromise('/api/v1/application') }
// 注册
export const register = (param) => { return _postPromise('/api/v1/user', param) }
// 获取用户信息
export const getUsrInfo = (param) => { return _getPromise('/api/v1/user', param) }
// 更新用户信息
export const updateUserInfo = (param) => { return _patchPromise('/api/v1/user', param) }
// 注销
export const deleteUser = (param) => { return _deletePromise('/api/v1/user', param) }
/* 获取用户信息 */
// export const getUsrInfo = (params, callback) => {
//     return _postPromise('/user/getUsrInfo', params, (data) => {
//         callback(data)
//     })
// }

/* 个人设置--更新信息 */
// export const updateUserInfo = (params, callback) => {
//     return _postPromise('/user/updateUserInfo', params, (data) => {
//         callback(data)
//     })
// }
