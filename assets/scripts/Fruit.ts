
import { _decorator, Component, Node, SpriteFrame, Sprite, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fruit')
export class Fruit extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  id = 0;

  @property(SpriteFrame)
  icon = null;

  start () {
      // [3]
  }

  init(data) {
    this.id = data.id
    const sp = this.node.getComponent(Sprite)
    sp.spriteFrame = data.icon
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
