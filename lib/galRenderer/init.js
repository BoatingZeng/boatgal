/**
 * 进行初始化
 * @method init 
 * @param {Stage} stage 进行渲染的地方,例如boatgal.stage
 */
galRenderer.init = function(stage) {

  //shortcut for boatgal.config
  var config = boatgal.config;

  //设置FPS
  createjs.Ticker.framerate = 0.5;
  createjs.Ticker.addEventListener('tick', updateStage);
  
  function updateStage() {
    stage.update();
  }

  //创建稳定的DisplayObject,比如对白文字,对话框等,并把引用储存到storage
  var dialogText = new createjs.Text('', config.dialogText.font, config.dialogText.color);
  dialogText.set();
  galRenderer.storage.dialogText = dialogText;
};