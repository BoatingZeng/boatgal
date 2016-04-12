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

  var bgBitmap = galRenderer.storage.bgBitmap;
  var blurFilter = new createjs.BlurFilter(0, 0, 1);
  bgBitmap.filters = [blurFilter];
  bgBitmap.cache(0, 0, bgBitmap.image.width, bgBitmap.image.height);

  createjs.Ticker.addEventListener("tick", updateCache);

  createjs.Tween.get(blurFilter).to({blurX: br, blurY: br}, 300).call(switchBG).to({blurX: 0, blurY: 0}, 500).call(finish);

  function updateCache() {
    if (bgBitmap.cacheID) {
      bgBitmap.updateCache();
    }
  }
  
  function switchBG() {
    bgBitmap.image = boatgal.queue.getResult(boatgal.status.renderObjFull.bg.id);
  }

  function finish() {
    createjs.Ticker.removeEventListener("tick", updateCache);
    bgBitmap.uncache();
    fn();
  }
};

galRenderer.effect.bgSwitch.fade = function(fn) {

  var bgBitmap = galRenderer.storage.bgBitmap;
  createjs.Tween.get(bgBitmap).to({alpha: 0.7}, 200, createjs.Ease.getPowOut(2.2)).call(switchBG)
  .to({alpha: 1}, 200, createjs.Ease.getPowOut(2.2)).call(fn);

  function switchBG() {
    bgBitmap.image = boatgal.queue.getResult(boatgal.status.renderObjFull.bg.id);
  }
};

galRenderer.effect.bgSwitch.mask = function(fn) {
  var cw = boatgal.config.width;
  var ch = boatgal.config.height;

  var bgBitmapNew = new createjs.Bitmap();
  bgBitmapNew.image = boatgal.queue.getResult(boatgal.status.renderObjFull.bg.id);

  var bgBitmapOld = galRenderer.storage.bgBitmap;

  var shape = new createjs.Shape();
  shape.graphics.rect(cw, 0, cw, ch);

  bgBitmapNew.mask = shape;

  createjs.Tween.get(shape).to({x: -cw}, 200).call(finish);

  boatgal.stage.addChildAt(bgBitmapNew, boatgal.stage.getChildIndex(bgBitmapOld)+1);

  function finish() {
    bgBitmapOld.image = boatgal.queue.getResult(boatgal.status.renderObjFull.bg.id);
    boatgal.stage.removeChild(bgBitmapNew);
    fn();
  }
};