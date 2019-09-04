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
export {
    getElSize
}
