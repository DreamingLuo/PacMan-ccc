// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(Number)
    accLeft: boolean = false;
    // @property(Number)
    accRight: boolean = false;
    @property(Number)
    xSpeed: number = 0;
    @property(Number)
    accel: number = 0;
    @property(Number)
    maxMoveSpeed: number = 0;

    RigidBody: cc.RigidBody;
    _level: number = 0;
    _vertical: number = 0;
    //豆子
    @property(cc.Node)
    bean:cc.Node = null;
    //gameover
    @property(cc.Node)
    gameover:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.RigidBody = this.getComponent(cc.RigidBody);
        this.RigidBody.fixedRotation = true;
        this.getComponent(cc.RigidBody).enabledContactListener  = true;
        cc.director.getCollisionManager().enabled  = true;
    }

    start() {
        this.setInputControl();
    }

    run(level: number) {
        this.node.rotation = 0;
        var lv = this.RigidBody.linearVelocity;
        lv.y = 0;
        lv.x = 30 * level;
        this.RigidBody.linearVelocity = lv;
        this.node.scaleX = level;
    }

    runVertical(vertical:number)
    {
        if(this.node.scaleX=1)
        {
            this.node.rotation = -vertical*90;
        }
       else
       {
          this.node.rotation = vertical*90;
       }
        var lv = this.RigidBody.linearVelocity;
        lv.x = 0;
        lv.y = 30 * vertical;
        this.RigidBody.linearVelocity = lv;
        this.node.scaleY = vertical;
    }
    moveTo()
    {
      let action = cc.moveTo(0.5,new cc.Vec2(this.node.position.x+2,this.node.position.y));
      this.node.runAction(action);
    }

    setInputControl() {
        var self = this;
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    console.log("点击了A键");
                    self._level = -1;
                    break;
                case cc.KEY.d:
                    console.log("点击了D键");
                    self._level = 1;
                    break;
                case cc.KEY.w:
                    console.log("点击了W键");
                    self._vertical = 1;
                    break;
                case cc.KEY.s:
                    console.log("点击了S键");
                    self._vertical = -1;
                    break;
            }
        });

        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    console.log("松开了A键");
                    self._level = 0;
                    break;
                case cc.KEY.d:
                    console.log("松开了D键");
                    self._level = 0;
                    break;
                case cc.KEY.w:
                    console.log("点击了W键");
                    self._vertical = 0;
                    break;
                case cc.KEY.s:
                    console.log("点击了S键");
                    self._vertical = 0;
                    break;
            }
        });
    }

    onBeginContact(contact, selfCollider, otherCollider) 
    {
        if(otherCollider.tag == 1)
        {
            console.log("吃到豆子了")
            otherCollider.node.destroy();
        }
        else if(otherCollider.tag == 2)
        {
            console.log("吃到敌人了");
            this.gameover.active = true;
            cc.game.end();
        }
      console.log(otherCollider);
    }

    onCollisionEnter() {
       console.log("碰撞了");
    }

    onCollisionExit (other, self) {
        console.log('on collision exit');
    }

    update(dt) {
        if (this._level != 0) {
            this.run(this._level);
        }
        if (this._vertical != 0) {
          this.runVertical(this._vertical);
        }
        //  // 根据当前加速度方向每帧更新速度
        // if (this.accLeft) {
        //     this.xSpeed -= this.accel * dt;
        // } else if (this.accRight) {
        //   this.node.x+=1;
        // }
        // // 限制主角的速度不能超过最大值
        // if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
        //     // if speed reach limit, use max speed with current direction
        //     this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        // }

        // 根据当前速度更新主角的位置
        //  this.node.x += this.xSpeed * dt;
    }
}
