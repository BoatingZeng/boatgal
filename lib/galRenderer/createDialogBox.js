/**
 * 返回一个对话框对象
 * @method createDialogBox
 * @return {DisplayObject} 一个可以添加到stage的,作为对话框的DisplayObject
**/
galRenderer.createDialogBox = function() {

  var cw = boatgal.config.width;
  var ch = boatgal.config.height;

  var dialogBox = new createjs.Shape();
  dialogBox.graphics.beginFill("#000").drawRect(0, ch*2/3, cw, ch/3);
  dialogBox.alpha = 0.5;

  return dialogBox;
};