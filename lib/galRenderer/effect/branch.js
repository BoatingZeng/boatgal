/**
 * 处理分支效果
 * @method branch
 * @param {Array} eftname 代指renderObj.effect中的效果描述对象,详细请参考galRenderer/design.md
**/
galRenderer.effect.branch = function(eftname) {

  var stage = boatgal.stage;

  var config = boatgal.config;
  var cw = config.width;
  var ch = config.height;

  var len = eftname.length;

  var choiceArea = new createjs.Container();

  galRenderer.storage.choiceArea = choiceArea;

  for (var i=0; i<len; i++) {
    var box = new createjs.Shape();
    box.graphics.beginFill('#000').drawRect(cw/3, 50+i*100, cw/3, 50);
    box.alpha = 0.5;

    //给形状添加自定义属性
    box.gal_targetPart = eftname[i].targetPart;

    var text = new createjs.Text('', config.otherText.font, config.otherText.color);
    text.text = eftname[i].text;
    text.x = cw/3;
    text.y = 50+i*100;

    choiceArea.addChild(box);
    choiceArea.addChild(text);
  }
  stage.addChild(choiceArea);
};