import { createFiber } from "./ReactFiber"
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot
}

ReactDOMRoot.prototype.render = function (children) {
  console.log("children", children)
  const root = this._internalRoot
  updateContainer(children, root)

}

function updateContainer(element, container) {
  // 这个过程其实createRoot就做了,createRootFiber
  // #start
  const { containerInfo } = container
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,

  })

  // #end 

  scheduleUpdateOnFiber(fiber)
}

function createRoot(container) {
  const root = {
    containerInfo: container,
  }

  return new ReactDOMRoot(root)
}

export { createRoot }
