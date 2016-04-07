/**
 * figure的淡出淡入效果
 * @method fade
 * @param {Object} attribute 效果的特性描述对象,详见galRenderer/design.md
 * @param {Function} fn 效果过程完成后执行的函数
**/
galRenderer.effect.fade = function(attribute, fn) {

  var alphaEnd = 0;
  if (attribute.isFadein) {
    alphaEnd = 1;
  }
  createjs.Tween.get(galRenderer.storage.figureBox.getChildByName(attribute.target))
  .to({alpha: alphaEnd},attribute.duration).call(fn);
};