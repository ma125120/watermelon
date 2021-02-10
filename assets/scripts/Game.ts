
import { _decorator, Component, Node, Prefab, SpriteFrame, instantiate, v2, v3, PhysicsSystem, RigidBody, physics, BoxCollider, UITransform, BoxCollider2D, CircleCollider2D, RigidBody2D, ERigidBody2DType } from 'cc';
import { Fruit } from './Fruit';
const { ccclass, property } = _decorator;

@ccclass('FruitItem')
export class FruitItem {
  // [1]
  // dummy = '';

  // [2]
  @property
  id = 0;

  @property(SpriteFrame)
  icon = null;
  // update (deltaTime: number) {
  //     // [4]
  // }
}

@ccclass('Game')
export class Game extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property(Prefab)
  fruitPrefab = null;

  @property({
    type: FruitItem
  })
  fruits = []

  createFruit(y = 0) {
    const x = Math.random() * 640
    const num = parseInt((Math.random() * 10) + '')
    let fruit = instantiate(this.fruitPrefab)
    fruit.setPosition(v3(x, y || 400, 0));
    
    const config = this.fruits[num]
    fruit.getComponent('Fruit').init(config)

    let circle: CircleCollider2D = fruit.getComponent(CircleCollider2D)
    
    circle.radius = (config.icon as SpriteFrame).rect.width / 2
    this.node.addChild(fruit);
  }

  openSetting() {
    const instance = PhysicsSystem.instance
    // instance.debugDrawFlags = 4
    instance.gravity = v3(0, -960, 0);

    let { width, height } = this.node.getComponent(UITransform)

    let node = new Node()

    let body = node.addComponent(RigidBody2D);
    body.type = ERigidBody2DType.Static
    // body.enabledContactListener = true

    const _addBound = (node, x, y, width, height) => {
      let collider: BoxCollider2D = node.addComponent(BoxCollider2D);
      collider.offset.x = x
      collider.offset.y = y
      collider.size.width = width
      collider.size.height = height
    }

    _addBound(node, 0, -height / 2, width, 1);
    _addBound(node, 0, height / 2, width, 1);
    _addBound(node, -width / 2, 0, 1, height);
    _addBound(node, width / 2, 0, 1, height);

    node.parent = this.node
  }

  onTouchStart = () => {
    this.createFruit()
  }
  onLoad() {
    this.openSetting()
    this.createFruit(200)
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart)
  }
  start () {
      // [3]
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
