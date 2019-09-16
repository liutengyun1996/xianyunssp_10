// 用户管理
export const state = () => {
    return {
        //点击回复的时候出现的可移除标签的数据
        dynamicTags:{},
            // { name: "标签一", type: "info",id:id }
        //存放图片存储数据对象的数组
        // pics:[]
    }
}

export const mutations = {
    //state 上面的数据  data传过来的数据
    setTags(state, data){
        state.dynamicTags=data
    },
    // setPics(state,data){
    //     // state.pics.push(data)
    //     state.pics = data
    // }
};
