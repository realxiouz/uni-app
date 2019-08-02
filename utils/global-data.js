function header(token) {
    return {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + token
    }
}
export {
    header
}
