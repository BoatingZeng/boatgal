/**
 * 显示加载画面,在start中调用
 * @method loadingScreen
 * @return {Object} 返回一个可以对象,以便加载时控制动态效果
 */
boatgal.loadingScreen = function() {

  var cw = boatgal.stage.canvas.width;
  var ch = boatgal.stage.canvas.height;

  var bg = new createjs.Shape();
  bg.graphics.beginFill("#000").drawRect(0, 0, cw, ch);

  var controlObject = {};
  var text = new createjs.Text('Loading...', 'bold 50px 微软雅黑', '#fff');

  text.set({x: cw/2-200, y: ch/2});

  boatgal.stage.addChild(bg,text);

  controlObject.text = text;

  return controlObject;
};