#createjs
The `createjs` created by gskinner.

#boatgal.head.js
`boatgal`的一些属性的定义。

#start.js
`boatgal`的入口,调用`boatgal.start(asset, canvasId)`启动游戏。

#loadingScreen.js
显示加载画面,指示加载进度。

#showTitle.js
调用`defaultTitle`或者`customTitle`来显示标题画面。本身只是做个简单判断。

#defaultTitle.js 或 customTitle.js
负责显示标题画面。defautl就是`boatgal`默认的,custom就是游戏定制的。

#beginScenario.js
进行剧本主体的处理,控制流程,注册事件,调用`renderer`来进行渲染。