/**
 * 进行初始化,使舞台进入剧本状态
 * @method init 
 * @param {Stage} stage 进行渲染的地方,例如boatgal.stage
 */
galRenderer.init = function(stage) {

  //shortcut for boatgal.config
  var config = boatgal.config;
  var cw = config.width;
  var ch = config.height;

  //重置stage
  stage.removeAllChildren();
  stage.removeAllEventListeners();

  //创建稳定的DisplayObject,比如对白文字,对话框等,并把引用储存到storage

  //对话文字对象
  var dialogText = new createjs.Text('', config.dialogText.font, config.dialogText.color);
  dialogText.set({x: 10, y: ch*2/3+50});
  galRenderer.storage.dialogText = dialogText;

  //说话人名字文字对象
  var speakerText = new createjs.Text('', config.speakerText.font, config.speakerText.color);
  speakerText.set({x: 10, y: ch*2/3+10});
  galRenderer.storage.speakerText = speakerText;

  //对话框对象
  var dialogBox = galRenderer.createDialogBox();
  galRenderer.storage.dialogBox = dialogBox;

  //figureBox对象,人物图片等非背景图片都放在这个Container里,方便处理层次关系
  var figureBox = new createjs.Container();
  galRenderer.storage.figureBox = figureBox;

  //背景图片对象
  var bgBitmap = new createjs.Bitmap();
  galRenderer.storage.bgBitmap = bgBitmap;

  stage.addChild(bgBitmap, figureBox, dialogBox, dialogText, speakerText);
};