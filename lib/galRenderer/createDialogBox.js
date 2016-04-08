/**
 * 返回一个对话框对象
 * @method createDialogBox
 * @return {DisplayObject} 一个可以添加到stage的,作为对话框的DisplayObject
**/
galRenderer.createDialogBox = function() {

  var cw = boatgal.config.width;
  var ch = boatgal.config.height;

  var dbh = ch/3;
  var sbh = dbh/4;
  var sbw = cw/8;

  var dialogBox = new createjs.Shape();
  dialogBox.graphics.f('#000').mt(0, ch*2/3).lt(sbw, ch*2/3).at(sbw+sbh, ch*2/3, sbw+sbh, ch*2/3+sbh, sbh)
  .lt(cw*5/6, ch*2/3+sbh).at(cw*5/6+sbh, ch*2/3+sbh, cw*5/6+sbh, ch*2/3+2*sbh, sbh).lt(cw*5/6+sbh, ch).lt(0, ch).ef();
  dialogBox.alpha = 0.5;

  return dialogBox;
};