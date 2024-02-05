import { FunctionComponent, HostComponent } from "./ReactWorkTags"
import { Placement, isFn, isStr } from "./utils"

export function createFiber(vnode, returnFiber) {
  const fiber = {
    // 类型
    type: vnode.type,
    key: vnode.key,
    // 属性
    props: vnode.props,
    // 不同类型的组件的stateNode也不同
    // 原生标签 dom节点
    // 类组件 类组件实例
    // 函数组件 null
    stateNode: null,

    // 第一个子fiber
    child: null,
    sibling: null,
    return: returnFiber,

    flags: Placement,

    // 记录节点在当前层级下的位置
    index: null,
  }

  const { type } = vnode

  if (isStr(type)) {
    fiber.tag = HostComponent
  } else if (isFn(type)) {
    // todo 函数组件或类组件
    fiber.tag = FunctionComponent
  }
  // ...
  return fiber
}
