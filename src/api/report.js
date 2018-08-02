import {
    _getPromise,
    _postPromise
} from './base'

/* ================Report================= */
// 汇报列表
export const getReportList = (param) => {
    return _getPromise('/api/v1/report', param)
}

// 汇报详情
export const getReportDetail = (param) => {
    return _getPromise('/api/v1/report/detail', param)
}

// 保存汇报详情
export const saveReportDetail = (param) => {
    return _postPromise('/api/v1/report/detail', param)
}

// 汇报设置
export const getReportConfig = () => {
    return _getPromise('/api/v1/report/config')
}

// 保存模板设置
export const saveReportTemplate = (param) => {
    return _postPromise('/api/v1/report/template', param)
}

// 获得汇报名单
export const getReportUser = (param) => {
    return _getPromise('/api/v1/report/user', param)
}
