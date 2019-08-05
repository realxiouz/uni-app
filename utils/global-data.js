function header(token) {
    return {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + token
    }
}
function getElSize(id) { //得到元素的size
    return new Promise((res, rej) => {
        uni.createSelectorQuery().select('#' + id).fields({
            size: true,
            scrollOffset: true
        }, (data) => {
            res(data);
        }).exec();
    });
};
/*async function getElSize(id) {
    let obj = {};
    await uni.createSelectorQuery().select('#' + id).fields({
        size: true,
        scrollOffset: true
    }, (data) => {
        obj = data;
    }).exec();
    return obj;
}*/
export {
    header,
    getElSize
}
