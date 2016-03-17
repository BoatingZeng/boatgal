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
     * 则把boatgal.scenario.part0[0],赋值给boatgal.status.renderObjFull
     */
    boatgal.status.renderObjFull = boatgal.scenario.part0[0];

    //设置boatgal.status的其他状态变量
    boatgal.status.numPart = 'part0';
    boatgal.status.numChange = 0;
  }

  //TODO 给boatgal.stage注册事件

  /**
   * 读入下一个change
   * 把完整的渲染对象记录到renderObjFull
   * 把change本身记录到renderObjDiff
  **/
  function readNextChange() {

    boatgal.status.numChange += 1;

    var numChange = boatgal.status.numChange;
    var numPart = boatgal.status.numPart;

    var change = boatgal.scenario[numPart][numChange];

    //遍历change中的属性,赋值到boatgal.status.renderObjFull
    for (var pro in change) {
      boatgal.status.renderObjFull[pro] = change[pro];
    }

    boatgal.status.renderObjDiff = change;
  }
};