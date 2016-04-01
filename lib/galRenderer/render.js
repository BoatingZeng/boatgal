/**
 * 调用这个方法来对渲染对象进行渲染,无论是否完整的渲染对象,过程都是一样
 * @method render
 * @param {Object} renderObj 要渲染的对象,无论是完整的舞台renderObjFull还是差异对象renderObjDiff
**/

//TODO 还没处理去除属性的情况,例如bg为"off"的情况
galRenderer.render = function(renderObj) {
  
  if (renderObj.bg) {
    galRenderer.storage.bgBitmap.image = boatgal.queue.getResult(renderObj.bg);
  }

  if (renderObj.figures) {
    var figures = renderObj.figures;
    var figureBox = galRenderer.storage.figureBox;
    figureBox.removeAllChildren();

    for(var i=0; i<figures.length; i++) {
      var figure = new createjs.Bitmap(boatgal.queue.getResult(figures[i].id));
      figure.x = figures[i].position.x;
      figure.y = figures[i].position.y;
      figureBox.addChild(figure);
    }
  }

  if (renderObj.dialog) {
    galRenderer.storage.speakerText.text = renderObj.dialog.speaker;
    galRenderer.type(galRenderer.storage.dialogText, renderObj.dialog.speech);
  }

  if (renderObj.effect) {
    for (var eftname in renderObj.effect) {
      var eftfun = galRenderer.effect[eftname];
      eftfun(renderObj.effect[eftname]);
    }
  }
};