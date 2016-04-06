/**
 * 定制的游戏标题画面,需要以某种形式调用beginScenario,以进入游戏主体
 * @method customTitle
 */
 boatgal.customTitle = function() {

  console.log('customTitle');

  var cw = boatgal.stage.canvas.width;
  var ch = boatgal.stage.canvas.height;
  
  var bg = new createjs.Shape();
  bg.graphics.beginFill("#000").drawRect(0, 0, cw, ch);

  var text = new createjs.Text('Click to start', 'bold 50px 微软雅黑', '#fff');

  text.set({x: cw/2-200, y: ch/2});

  boatgal.stage.addChild(bg,text);

  boatgal.stage.addEventListener('click',handleStageClick);

  function handleStageClick() {
    boatgal.beginScenario();
  }
 };