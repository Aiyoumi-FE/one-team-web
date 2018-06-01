import {
    _getPromise,
    _postPromise
} from './base'

/* ================Report================= */
export const getReportList = (param) => {
    return _getPromise('/api/v1/report', param)
}

export const getReportDetail = (param) => {
    return _getPromise('/api/v1/report/detail', param)
}

export const saveReportDetail = (param) => {
    return _postPromise('/api/v1/report/detail', param)
}

export const getReportConfig = () => {
    return _getPromise('/api/v1/report/config')
}

export const saveReportTemplate = (param) => {
    return _postPromise('/api/v1/report/template', param)
}
