/**
 * 调用这个函数来开始。boatgal的入口。
 * @method start
 * @param {String} asset asset.json的url,即表示一个游戏
 * @param {String} canvasId 页面上canvas元素的id
 */

boatgal.start = function(asset, canvasId) {

  //初始化一些全局变量
  boatgal.canvasId = canvasId;

  boatgal.stage = new createjs.Stage(canvasId);

  //设置Ticker,注册刷新事件
  createjs.Ticker.framerate = 20;
  createjs.Ticker.removeAllEventListeners();
  createjs.Ticker.addEventListener('tick', updateStage);

  function updateStage() {
    boatgal.stage.update();
  }

  //显示加载画面
  var controlObject = boatgal.loadingScreen();

  var queue = new createjs.LoadQueue();

  boatgal.queue = queue;
  
  //控制加载过程
  queue.on('progress', handleProgress);

  queue.on('error', handleError);

  queue.on('complete', handleComplete);

  queue.loadManifest(asset);

  //progress事件的handler
  function handleProgress(evt) {

    //改变加载画面的stage中的元素的参数,以达到加载画面的动态效果
    var percent = evt.loaded*100;
    controlObject.text.text = 'Loading...' + percent.toFixed() + '%';
  }

  function handleError(evt) {
    console.log('load error');
  }

  //complete事件的handler
  function handleComplete() {

    //先给boatgal的asset、scenario、config赋值
    boatgal.asset = boatgal.queue.getResult('asset.json');
    boatgal.scenario = boatgal.queue.getResult('scenario.json');
    boatgal.config = boatgal.queue.getResult('config.json');

    //设置canvas的大小为config里的大小
    var canvas = document.getElementById(canvasId);
    canvas.width = boatgal.config.width;
    canvas.height = boatgal.config.height;

    //加载完资源后调用showTitle
    boatgal.showTitle();
  }
};