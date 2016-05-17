/*! boatgal 2016-05-03 */
var boatgal = {};

//页面上canvas元素的id,游戏显示的地方,在start中初始化
boatgal.canvasId = '';

//easeljs的Stage的实例,在start中初始化
boatgal.stage = {};

//preloadjs的LoadQueue的实例,用于访问已经加载的资源,在start函数中初始化
boatgal.queue = {};

//用于储存asset.json,在start中赋值
boatgal.asset = {};

//用于储存config.json,在start中赋值
boatgal.config = {}; 

//用于储存scenario,在start中赋值
boatgal.scenario = {}; 

//记录游戏的即时状态
boatgal.status = {}; 

/**
 * 记录要渲染的完整的舞台对象,
 * 例如,boatgal.scenario.part0[0]就是一个完整的要渲染的完整的对象,
 * 主要用于记录完整舞台状态,存档时可以写入这个对象到档案
 */
boatgal.status.renderObjFull = {};

/**
 * 要渲染的差异对象,其实就是剧本的change本身,
 * 游戏进行过程中,一般只需递交这个对象给渲染器
 */
boatgal.status.renderObjDiff = {};

//对白文字是否打印完毕处于等待状态
boatgal.status.isTypeEnd = false;

//显示了分支选项等待选择则为true,选择后为false
boatgal.status.isChoosing = false;

//效果队列是否完成
boatgal.status.isEffectEnd = false;

//记录现在处于哪个part
boatgal.status.numPart = '';

//记录现在处于哪个change
boatgal.status.numChange = 0;

//表示是否要读取config中的档案,在defaultTitle或customTitle中根据玩家行动设置
boatgal.isLoadSave = false; 
/**
 * 开始进行scenario的处理流程
 * @method beginScenario
 */
boatgal.beginScenario = function() {

  //先判断是不是要读档
  if (boatgal.isLoadSave) {

    /**
     * 读档
     * 复制config内的save的renderObjFull,以免游戏过程中改变config内的renderObjFull,
     * 这样，游戏过程中也可以读取boatgal.config对象内的存档
     */
    boatgal.status.renderObjFull = JSON.parse(JSON.stringify(boatgal.config.save.renderObjFull));
    boatgal.status.numPart = boatgal.config.save.numPart;
    boatgal.status.numChange = boatgal.config.save.numChange;
  } else {

    /**
     * 重新开始
     * 则把boatgal.scenario.part0[0],复制给boatgal.status.renderObjFull,同样是为了避免改变原数据
     */
    boatgal.status.renderObjFull = JSON.parse(JSON.stringify(boatgal.scenario.part0[0]));

    //设置boatgal.status的其他状态变量
    boatgal.status.numPart = 'part0';
    boatgal.status.numChange = 0;
  }

  var stage = boatgal.stage;

  //初始化舞台
  galRenderer.init(stage);

  //渲染第一个change
  galRenderer.render(boatgal.status.renderObjFull);

  //给boatgal.stage注册click事件
  stage.addEventListener('click',handleStageClick);

  function handleStageClick(evt) {

    if(boatgal.status.isTypeEnd && boatgal.status.isEffectEnd) {
      if (readNextChange()) {
        galRenderer.render(boatgal.status.renderObjDiff);
      }
      else if (evt.target.gal_targetPart) {
        boatgal.status.isChoosing = false;
        var targetPart = evt.target.gal_targetPart;

        boatgal.status.numPart = targetPart;
        boatgal.status.numChange = 0;
        boatgal.status.renderObjFull = JSON.parse(JSON.stringify(boatgal.scenario[targetPart][0]));

        stage.removeChild(galRenderer.storage.choiceArea);

        galRenderer.render(boatgal.status.renderObjFull);
      }
      else if (boatgal.status.renderObjFull.branch && !boatgal.status.isChoosing ) {
        boatgal.status.isChoosing = true;
        galRenderer.showBranch(boatgal.status.renderObjFull.branch);
      }
    }
  }

  /**
   * 读入同一个part内的下一个change
   * 把完整的渲染对象记录到renderObjFull
   * 把change本身记录到renderObjDiff
   * @return {Boolean} 有没有下一个change
  **/
  function readNextChange() {

    boatgal.status.numChange += 1;

    var numChange = boatgal.status.numChange;
    var numPart = boatgal.status.numPart;

    var change = boatgal.scenario[numPart][numChange];

    if (change) {

      //遍历change中的属性,赋值到boatgal.status.renderObjFull
      for (var pro in change) {
        boatgal.status.renderObjFull[pro] = JSON.parse(JSON.stringify(change[pro]));
      }

      /**
       * 如果change中没有effect属性,则设置renderObjFull中的effect为空,
       * 否则它会保留上一个change的effect,对于其他属性,
       * 没有则表示默认保留上一个change的值
      **/
      if (!change.effect) {
        boatgal.status.renderObjFull.effect = null;
      }
      
      boatgal.status.renderObjDiff = change;

      return true;
    }
    else {
      return false;
    }
  }
};
/**
 * 默认的游戏标题画面,需要以某种形式调用beginScenario,以进入游戏主体
 * @method defaultTitle
 */
boatgal.defaultTitle = function() {

  console.log('defaultTitle');
  
  var cw = boatgal.stage.canvas.width;
  var ch = boatgal.stage.canvas.height;
  
  var bg = new createjs.Shape();
  bg.graphics.beginFill("#000").drawRect(0, 0, cw, ch);

  var text = new createjs.Text('Click to start', 'bold 50px 微软雅黑', '#fff');

  text.set({x: cw/2-200, y: ch/2});

  boatgal.stage.addChild(bg,text);

  boatgal.stage.addEventListener('click',handleStageClick);

  function handleStageClick() {
    boatgal.beginScenario();
  }
};
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
/**
 * 显示标题画面
 * @method showTitle
 */
boatgal.showTitle = function() {

  //重置stage
  boatgal.stage.removeAllChildren();
  boatgal.stage.removeAllEventListeners();

  //判断有没有自定义标题,显示游戏标题画面
  if (boatgal.queue.getResult('customTitle.js')) {
    boatgal.customTitle();
  } else {
    boatgal.defaultTitle();
  }
};
/**
 * 调用这个函数来开始。boatgal的入口。
 * @method start
 * @param {String} asset asset.json的url,即表示一个游戏
 * @param {String} canvasId 页面上canvas元素的id
 */

boatgal.start = function(asset, canvasId) {

  //初始化一些全局变量
  boatgal.canvasId = canvasId;

  boatgal.stage = new createjs.Stage(canvasId);

  //设置Ticker,注册刷新事件
  createjs.Ticker.framerate = 20;
  createjs.Ticker.removeAllEventListeners();
  createjs.Ticker.addEventListener('tick', updateStage);

  function updateStage() {
    boatgal.stage.update();
  }

  //显示加载画面
  var controlObject = boatgal.loadingScreen();

  var queue = new createjs.LoadQueue();

  boatgal.queue = queue;
  
  //控制加载过程
  queue.on('progress', handleProgress);

  queue.on('error', handleError);

  queue.on('complete', handleComplete);

  queue.loadManifest(asset);

  //progress事件的handler
  function handleProgress(evt) {

    //改变加载画面的stage中的元素的参数,以达到加载画面的动态效果
    var percent = evt.loaded*100;
    controlObject.text.text = 'Loading...' + percent.toFixed() + '%';
  }

  function handleError(evt) {
    console.log('load error');
  }

  //complete事件的handler
  function handleComplete() {

    //先给boatgal的asset、scenario、config赋值
    boatgal.asset = boatgal.queue.getResult('asset.json');
    boatgal.scenario = boatgal.queue.getResult('scenario.json');
    boatgal.config = boatgal.queue.getResult('config.json');

    //设置canvas的大小为config里的大小
    var canvas = document.getElementById(canvasId);
    canvas.width = boatgal.config.width;
    canvas.height = boatgal.config.height;

    //加载完资源后调用showTitle
    boatgal.showTitle();
  }
};
//渲染器专门用来绘制boatgal.status.renderObj的内容,包括声音。
var galRenderer = {};

//保存一些常用的对象引用
galRenderer.storage = {};

//次级命名空间,储存效果器函数
galRenderer.effect = {};
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
  dialogText.set({x: 10, y: ch*2/3+50, lineHeight: dialogText.getMeasuredLineHeight ()*1.5});
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
/**
 * 调用这个方法来对渲染对象进行渲染,无论是否完整的渲染对象,过程都是一样
 * @method render
 * @param {Object} renderObj 要渲染的对象,无论是完整的舞台renderObjFull还是差异对象renderObjDiff
**/

//TODO 还没处理去除属性的情况,例如bg为"off"的情况
galRenderer.render = function(renderObj) {
  
  if (renderObj.bg) {
    if (!renderObj.bg.isEffect) {
      galRenderer.storage.bgBitmap.image = boatgal.queue.getResult(renderObj.bg.id);
    }
  }

  if (renderObj.figures) {
    var figures = renderObj.figures;
    var figureBox = galRenderer.storage.figureBox;
    figureBox.removeAllChildren();

    for(var i=0; i<figures.length; i++) {
      var figure = new createjs.Bitmap(boatgal.queue.getResult(figures[i].id));
      figure.name = figures[i].id;
      figure.x = figures[i].position.x;
      figure.y = figures[i].position.y;

      if (figures[i].isHide) {
        figure.alpha = 0;
      }

      figureBox.addChild(figure);
    }
  }

  if (renderObj.dialog) {
    galRenderer.storage.speakerText.text = renderObj.dialog.speaker;
    galRenderer.type(galRenderer.storage.dialogText, renderObj.dialog.speech);
  }

  if (renderObj.effect) {
    boatgal.status.isEffectEnd = false;
    var effectNum = renderObj.effect.length;

    for (var j=0; j<effectNum; j++) {

      var eftname = renderObj.effect[j].name;
      var eftfun = galRenderer.effect[eftname];
      var wait = renderObj.effect[j].wait;
      var attribute = renderObj.effect[j].attribute;
      
      setTimeout(eftfun, wait, attribute, setFlag);
    }
  }
  else {
    boatgal.status.isEffectEnd = true;
  }

  function setFlag() {
    effectNum -= 1;
    if (effectNum === 0) {
      boatgal.status.isEffectEnd = true;
      console.log('isEffectEnd = ' + boatgal.status.isEffectEnd);
    }
    
  }
};
/**
 * 处理分支效果
 * @method showBranch
 * @param {Array} choices 剧本中的branch属性
**/
galRenderer.showBranch = function(choices) {

  var stage = boatgal.stage;

  var config = boatgal.config;
  var cw = config.width;
  var ch = config.height;

  var len = choices.length;

  var choiceArea = new createjs.Container();

  galRenderer.storage.choiceArea = choiceArea;

  for (var i=0; i<len; i++) {
    var box = new createjs.Shape();
    box.graphics.beginFill('#000').drawRoundRect(cw/3, 50+i*100, cw/3, 50, 25);
    box.alpha = 0.5;

    //给形状添加自定义属性
    box.gal_targetPart = choices[i].targetPart;

    var text = new createjs.Text('', config.otherText.font, config.otherText.color);
    text.text = choices[i].text;
    text.x = cw/3 + 20;
    text.y = 50+i*100 + 10;

    choiceArea.addChild(box);
    choiceArea.addChild(text);
  }
  stage.addChild(choiceArea);
};
/**
 * 用打字机效果显示dialogText,打印完毕会设置boatgal.status.isTypeEnd为true
 * @method type
 * @param {Text} dialogText easeljs的Text类的实例,相应的就是储存在galRenderer.storage的dialogText
 * @param {String} text 字符串对象
**/
galRenderer.type = function(dialogText, text) {

  //不清除的话,短对白可能会出现bug
  clearTimeout(galRenderer.type.timeOutIdObj.show);
  clearTimeout(galRenderer.type.timeOutIdObj.hide);

  //速度都是越小越快的,其实是时间间隔
  var speed = 50;
  var blink = 500;
  var len = text.length;
  var count = 1;

  boatgal.status.isTypeEnd = false;

  function addOne() {
    if(count < len + 1) {
      dialogText.text = text.slice(0, count);
      count += 1;
      setTimeout(addOne, speed);
    } 
    else {
      boatgal.status.isTypeEnd = true;
      showArrow();
    } 
  }
  
  //boatgal.status.isTypeEnd为true时闪烁箭头
  function showArrow() {
    if (boatgal.status.isTypeEnd === true) {
      dialogText.text = dialogText.text + '▼';
      galRenderer.type.timeOutIdObj.show = setTimeout(hideArrow, blink);
    }
  }

  function hideArrow() {
    if (boatgal.status.isTypeEnd === true) {
      dialogText.text = dialogText.text.slice(0, len);
      galRenderer.type.timeOutIdObj.hide = setTimeout(showArrow, blink);
    }
  }

  addOne();
};

//用于记录showArrow和hideArrow的timeOutId
galRenderer.type.timeOutIdObj = {};
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