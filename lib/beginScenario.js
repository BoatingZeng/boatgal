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