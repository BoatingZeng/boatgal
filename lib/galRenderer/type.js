/**
 * 用打字机效果显示dialogText,打印完毕会设置boatgal.status.isWaiting为true
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

  boatgal.status.isWaiting = false;

  function addOne() {
    if(count < len + 1) {
      dialogText.text = text.slice(0, count);
      count += 1;
      setTimeout(addOne, speed);
    } 
    else {
      boatgal.status.isWaiting = true;
      showArrow();
    } 
  }
  
  //boatgal.status.isWaiting为true时闪烁箭头
  function showArrow() {
    if (boatgal.status.isWaiting === true) {
      dialogText.text = dialogText.text + '▼';
      galRenderer.type.timeOutIdObj.show = setTimeout(hideArrow, blink);
    }
  }

  function hideArrow() {
    if (boatgal.status.isWaiting === true) {
      dialogText.text = dialogText.text.slice(0, len);
      galRenderer.type.timeOutIdObj.hide = setTimeout(showArrow, blink);
    }
  }

  addOne();
};

//用于记录showArrow和hideArrow的timeOutId
galRenderer.type.timeOutIdObj = {};