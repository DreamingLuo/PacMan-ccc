

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
     
    //let positionarrayX:number[] = [224,358,358]
    // let positionAyyarY:number[] = [132,132,193]
     
    // for(let i = 0;i<positionarrayX.length;i++)
    // {
        
    //     let enemyAction = cc.moveTo(1,positionarrayX[i],positionAyyarY[i]); 
    //     this.node.runAction(enemyAction);
    // }
    cc.sequence
     let enemyAction = cc.moveTo(1,-224,132); 
     let enemyAction1 = cc.moveTo(1.34,-358,132); 
     let enemyAction2 = cc.moveTo(0.61,-358,193); 
     let enemyAction3 = cc.moveTo(0.86,-444,193); 
     let enemyAction4 = cc.moveTo(0.12,-444,181); 
     let enemyAction5 = cc.moveTo(0.32,-412,181);
     let enemyAction6 = cc.moveTo(0.49,-412,132);
     let enemyAction7 = cc.moveTo(0.32,-444,132);
     let enemyAction8 = cc.moveTo(0.94,-444,38);
     let enemyAction9 = cc.moveTo(0.28,-416,38);
     let enemyAction10 = cc.moveTo(0.25,-416,-13);
     let enemyAction11 = cc.moveTo(0.53,-363,-13);
     let enemyAction12 = cc.moveTo(2.19,-144,-13);
     let enemyAction13 = cc.moveTo(1.19,-144,132);
     let enemyAction14 = cc.moveTo(0.80,-224,132); 
    let enemyRunAction = cc.sequence(enemyAction,enemyAction1,enemyAction2,enemyAction3,enemyAction4,enemyAction5,enemyAction6,enemyAction7,enemyAction8,enemyAction9,enemyAction10,enemyAction11,enemyAction12,enemyAction13,enemyAction14).repeatForever();
    this.node.runAction(enemyRunAction);

    }

    // update (dt) {}
}
