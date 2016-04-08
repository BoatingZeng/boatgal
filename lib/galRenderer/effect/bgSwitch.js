/**
 * 切换背景的效果器,有多种效果选择
 * @method bgSwitch
 * @param {Object} attribute 效果的特性描述对象,详见galRenderer/design.md
 * @param {Function} fn 效果过程完成后执行的函数
**/
galRenderer.effect.bgSwitch = function(attribute, fn) {
 
  var method = galRenderer.effect.bgSwitch[attribute.method];
  method(fn);
};

/**
 * 模糊切换效果
 * @method blur
 * @param {Function} fn 效果过程完成后执行的函数
**/
galRenderer.effect.bgSwitch.blur = function(fn) {
  var br = 20;

  createjs.Ticker.addEventListener("tick", updateCache);

  var bgBitmap = galRenderer.storage.bgBitmap;
  var blurFilter = new createjs.BlurFilter(0, 0, 1);
  bgBitmap.filters = [blurFilter];
  bgBitmap.cache(0, 0, bgBitmap.image.width, bgBitmap.image.height);

  createjs.Tween.get(blurFilter).to({blurX: br, blurY: br}, 300).call(switchBG).to({blurX: 0, blurY: 0}, 500).call(finish);

  function updateCache() {
    bgBitmap.updateCache();
  }
  
  function switchBG() {
    bgBitmap.image = boatgal.queue.getResult(boatgal.status.renderObjDiff.bg.id);
  }

  function finish() {
    createjs.Ticker.removeEventListener("tick", updateCache);
    bgBitmap.uncache();
    fn();
  }
};