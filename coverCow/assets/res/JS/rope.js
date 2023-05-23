
cc.Class({
    extends: cc.Component,

    properties: {
        ropeCow: {
            default: [],
            type: [cc.SpriteFrame],
        },
        //绳子rope 伸长的距离
        ropeDistance: {
            default: 800,
            type: cc.Float,
            serializable: true,
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //获取sprite组件
        this.sprite = this.getComponent(cc.Sprite);

        //绳子套出动作
        this.action1 = cc.moveTo(0.35, this.node.x, this.node.y + this.ropeDistance);
        //绳子收回动作
        this.action2 = cc.moveTo(0.2, this.node.x, this.node.y);

        this.score = 0
    },

    start() {

    },

    onCollisionEnter: function (other, self) {
        cc.log("套中了！")
        //获取牛当前播放的动画clip名字
        let cowName = other.node.getComponent(cc.Animation).currentClip.name

        //1.停止绳子伸长动作   无效不清楚原因
        this.node.stopAction(this.action1);
        this.node.runAction(this.action2);


        //2.隐藏牛牛  other获取的是碰撞组件，other.node才是挂载other组件的节点
        other.node.active = false;

        //3.根据不同牛替换绳子的图片
        switch (cowName) {
            case "cow1":
                this.sprite.spriteFrame = this.ropeCow[0]
                break;
            case "cow2":
                this.sprite.spriteFrame = this.ropeCow[1]
                break;
            case "cow3":
                this.sprite.spriteFrame = this.ropeCow[2]
                break;
            default:
                break;
        }

        //4.加分数 
        this.score += 1

        this.scoreLabel.string = `Score : ${this.score}`
    },

    onCollisionExit: function (other, self) {

        //一次性定时器
        this.scheduleOnce(function () {
            other.node.getComponent("Cow").reappear()
            other.node.active = true
        }, 1)

    },

    //点击按钮套绳子Capture捕获
    clickCapture: function (event) {
        //获取到事件目标Button并禁用它
        event.target.active = false
        // event.target.interactable = false  // interactable属性 undefind

        //动作回调函数
        let finished = cc.callFunc(function () {
            cc.log("动作完成,解除禁用按钮并换回图片")
            event.target.active = true

            this.sprite.spriteFrame = this.ropeCow[3]

        }, this);//这里参数this，不然回调执行里面的this就是window


        //执行动作           //容器动作--sequence顺序动作
        // this.node.runAction(cc.sequence(this.action1, cc.delayTime(0.1), this.action2, finished)); 这个无法用
        this.node.runAction(this.action1);
        this.node.runAction(cc.sequence(cc.delayTime(0.45), this.action2, finished));


    }
});
