/**
 * 用打字机效果显示dialogText,打印完毕会设置boatgal.status.isWaiting为true
 * @method type
 * @param {Text} dialogText easeljs的Text类的实例,相应的就是储存在galRenderer.storage的dialogText
 * @param {String} text 字符串对象
**/
galRenderer.type = function(dialogText, text) {

  var speed = 100;
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
      setTimeout(hideArrow, blink);
    }
  }

  function hideArrow() {
    if (boatgal.status.isWaiting === true) {
      dialogText.text = dialogText.text.slice(0, len);
      setTimeout(showArrow, blink);
    }
  }

  addOne();
};
