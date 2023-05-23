cc.Class({
    extends: cc.Component,

    properties: {
        timerLabel: {
            default: null,
            type: cc.Label,
        },

        resultWindow: {
            default: null,
            type: cc.Node,
        },
        bgAudio: {
            default: null,
            type: cc.AudioClip
        },
        overAudio: {
            default: null,
            type: cc.AudioClip
        },
        resultLabel: {
            default: null,
            type: cc.Label,
        },
        resultLabel2: {
            default: null,
            type: cc.Label,
        },
        rope: {
            default: null,
            type: cc.Node,
        },
        btn: {
            default: null,
            type: cc.Node,
        },

    },



    onLoad() {
        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();
        //开启碰撞检测系统
        manager.enabled = true;
        //开启 碰撞检测系统 debug 绘制：
        // manager.enabledDebugDraw = true;
        this.time = 60

    },

    start() {
        //每1秒更新
        let callback = () => {
            this.time--;
            this.timerLabel.string = `Time : ${this.time} S`

            //取消定时器并弹出成绩窗口
            if (this.time == 0) {
                //取消定时器
                this.unschedule(callback);
                //暂停游戏 -->销毁按钮节点
                this.btn.destroy()


                //成绩窗口
                this.resultWindow.active = true;
                this.resultWindow.getComponent(cc.Animation).play("result_open");
                this.resultLabel.string = `最终得分：${this.rope.getComponent("rope").score}`;
                if (this.rope.getComponent("rope").score <= 10) {
                    this.resultLabel2.string = "套牛青铜"
                } else if (this.rope.getComponent("rope").score <= 20) {
                    this.resultLabel2.string = "套牛大师"
                } else {
                    this.resultLabel2.string = "套牛王者"
                }

            }
        }

        this.schedule(callback, 1);

    },



    onDestroy: function () {
        cc.audioEngine.stop(this.current);
        cc.audioEngine.stop(this.current2);
    },
    //弹窗关闭按钮
    resultClose: function () {
        this.resultWindow.getComponent(cc.Animation).play("result_close")
    },



});
