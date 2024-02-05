# mini-react

1. 初次渲染 -> 入口 createRoot -> 返回提供render方法的Object -> 创建FiberRootNode -> scheduleUpdateOnFiber -> 渲染任务执行(workLoop，递归执行) -> performUnitOfWork -> updateComponent -> reconcileChildren(引入previousNewFiber，将Fiber通过sibling、return串起来，遍历时第一个非null元素的有效FiberNode为Fiber的child)
