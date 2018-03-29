import {
    _getPromise,
    _postPromise,
    _putPromise,
    _deletePromise
} from '../assets/js/ajax'

/* ================登陆================= */
export const getMembers = () => {
    return _getPromise('/api/v1/team/members')
}

export const updateMembers = (param) => {
    return _putPromise('/api/v1/team/members', param)
}

export const addMembers = (param) => {
    return _postPromise('/api/v1/team/members', param)
}

export const joinUrl = () => {
    return _getPromise('/api/v1/team/joinUrl')
}

export const sendEmail = (param) => {
    return _postPromise('/api/common/sendEmail', param)
}

/* new */
export const getTeamList = (param) => {
    return _getPromise('/api/team/getTeamList', param)
}

export const getPermissionTeamList = (param) => {
    return _postPromise('/api/team/getPermissionTeamList', param)
}

export const createTeam = (param) => {
    return _postPromise('/api/team/team', param)
}

export const deleteTeam = (param) => {
    return _deletePromise('/api/team/team', param)
}

export const updateTeam = (param) => {
    return _putPromise('/api/team/team', param)
}

export const addMem2Team = (param) => {
    return _postPromise('/api/team/mem2Team', param)
}

export const getChildTeamInfo = (param) => {
    return _getPromise('/api/team/getChildTeamInfo', param)
}
