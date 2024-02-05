import {
  updateClassComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateHostTextComponent,
} from "./ReactFiberReconciler"
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags"
import { Placement } from "./utils"

let wip = null // work in progress 当前正在工作中的
let wipRoot = null

// 初次渲染/更新都是执行这个函数
export function scheduleUpdateOnFiber(fiber) {
  wip = fiber
  if (!wipRoot) wipRoot = fiber
}

function performUnitOfWork() {
  const { tag } = wip

  switch (tag) {
    case HostComponent:
      updateHostComponent(wip)
      break
    case FunctionComponent:
      updateFunctionComponent(wip)
      break
    case ClassComponent:
      updateClassComponent(wip)
      break
    case HostText:
      updateHostTextComponent(wip)
    default:
      break
  }

  // todo 2. 下一个更新谁 深度优先遍历 (国王的故事)
  if (wip.child) {
    wip = wip.child
    return
  }

  let next = wip

  while (next) {
    if (wip.sibling) {
      wip = next.sibling
      return
    }
    next = next.return
  }

  wip = null
}

function workLoop(IdleDeadline) {
  while (wip && IdleDeadline.timeRemaining() > 0) {
    performUnitOfWork()
  }

  if (!wip && wipRoot) {
    commitRoot()
  }
}

requestIdleCallback(workLoop)

function commitRoot() {
  commitWorker(wipRoot)

  // 置null，防止多次调用
  wipRoot = null
}

function commitWorker(wip) {
  if (!wip) return
  // 1. 提交自己
  // parentNode是父dom
  // ?
  const parentNode = wip.return.stateNode
  const { flags, stateNode } = wip
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode)
  }
  // 2. 提交子节点
  commitWorker(wip.child)
  // 3. 提交兄弟
  commitWorker(wip.sibling)
}
