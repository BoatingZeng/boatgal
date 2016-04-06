/**
 * 淡出淡入效果
 * @method fade
 * @param {Array} eftname 代指renderObj.effect中的效果描述对象,详细请参考galRenderer/design.md
**/
galRenderer.effect.fade = function(eftname) {
  console.log('fading'+eftname.target);
  galRenderer.storage.figureBox.getChildByName(eftname.target).alpha = 0;
  createjs.Tween.get(galRenderer.storage.figureBox.getChildByName(eftname.target))
  .to({alpha: 1},eftname.time);
};