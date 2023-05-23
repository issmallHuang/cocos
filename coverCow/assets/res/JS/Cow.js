// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        speed: {
            default: 330,
            type: cc.Float,
        },
        direction: {
            default: -1,
            type: cc.Integer,
        },



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.first_x = this.node.x; //出生点
        this.over_x = -530; c //屏幕 左边边界 

        // this.anim = this.getComponent(cc.Animation)

        cc.log("1111")
    },

    start() {
        this.getComponent(cc.Animation).play("cow1")
    },

    update(dt) {
        this.node.x += dt * this.speed * this.direction;

        //出屏幕重新出现
        if (this.node.x < this.over_x) {
            this.reappear()
        }
    },

    // 两个数之间的随机整数  并且包含这两个整数
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    //重新出现改位置，皮肤 ，速度
    reappear: function () {
        this.speed = this.getRandom(350, 550)
        this.node.x = this.first_x;
        this.node.y = this.getRandom(-300, 100);
        // this.anim.play("cow2")
        this.getComponent(cc.Animation).play(this.getComponent(cc.Animation)._clips[this.getRandom(0, 2)].name)
    },

});






