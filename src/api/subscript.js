import {
    _getPromise,
    _postPromise,
    _deletePromise
} from './base'

export const getRecordList = (param) => {
    return _getPromise('/api/v1/record', param)
}

export const addRecord = (param) => {
    return _postPromise('/api/v1/record', param)
}

export const deleteRecord = (param) => {
    return _deletePromise('/api/v1/record', param)
}

export const getAllUser = (param) => {
    return _postPromise('/api/subscript/getAllUser', param)
}

export const getUserByName = (param) => {
    return _getPromise('/api/v1/user/name', param)
}

export const getMySubList = (param) => {
    return _postPromise('/api/subscript/getMySubList', param)
}
