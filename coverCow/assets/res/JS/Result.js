
cc.Class({
    extends: cc.Component,


    properties: {

    },



    // onLoad () {},

    start() {

    },
    //弹窗关闭动画关键帧函数：重新加载场景
    closeAnim: function () {
        cc.log("动画帧事件")
        cc.director.loadScene("main");

    },


    pasue: function () {
        this.btn.pause()
    }
    // update (dt) {},
});
