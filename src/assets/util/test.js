export const testEmail = (value) => {
    let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return regEmail.test(value)
}

export const testPwd = (value) => {
    let regPassword = /^(?=.*\d)(?=.*[A-Za-z]).{8,16}$/g
    return regPassword.test(value)
}

export const testName = (value) => {
    return /^[\u4e00-\u9fa5A-Za-z0-9-_]{2,12}$/.test(value)
}
