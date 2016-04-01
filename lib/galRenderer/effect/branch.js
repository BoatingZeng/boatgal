/**
 * 处理分支效果
 * @method branch
 * @param {Array} eftname 代指renderObj.effect中的效果描述对象,详细请参考galRenderer/design.md
**/
galRenderer.effect.branch = function(eftname) {

  var stage = boatgal.stage;

  var cw = boatgal.config.width;
  var ch = boatgal.config.height;

  var len = eftname.length;

  var choiceArea = new createjs.Container();

  galRenderer.storage.choiceArea = choiceArea;

  for (var i=0; i<len; i++) {
    var box = new createjs.Shape();
    box.graphics.beginFill("#000").drawRect(cw/3, 50+i*100, cw/3, 50);
    box.alpha = 0.5;

    //给形状添加自定义属性
    box.gal_targetPart = eftname[i].targetPart;

    choiceArea.addChild(box);
  }
  stage.addChild(choiceArea);
};