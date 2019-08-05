let globalData = {
    base_url: 'http://www.t.com',
    cardList: '',// 名片
    colleteList: [],// 名片收藏
    houseArr: [],// 楼盘
    templateCurrNum: 0,// 保存名片当前被选中值
    userInfo: {},// 用户基本信息
    token: '',// token值
    inFormations: {},// 浏览记录
    houseId: [],//保存被选中的楼盘ID
    currentuserinfo: {},// 获取到用户相关信息进行保存
    visitUserInfo: {}
};


function header(token) {
    return {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + token
    }
}
export {
    globalData,
    header
}
