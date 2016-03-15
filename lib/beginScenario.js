/**
 * 开始进行scenario的处理流程
 * @method beginScenario
 */
boatgal.beginScenario = function() {

  //先判断是不是要读档
  if (boatgal.isLoadSave) {

    /**
     * 读档
     * 复制config内的save的renderObj,以免游戏过程中改变config内的renderObj,
     * 这样，游戏过程中也可以读取boatgal.config对象内的存档
     */
    boatgal.status.renderObj = JSON.parse(JSON.stringify(boatgal.config.save.renderObj));
    boatgal.status.numPart = boatgal.config.save.numPart;
    boatgal.status.numChange = boatgal.config.save.numChange;
  } else {

    /**
     * 重新开始
     * 则把boatgal.scenario.part0[0],赋值给boatgal.status.renderObj
     */
    boatgal.status.renderObj = boatgal.scenario.part0[0];

    //设置boatgal.status的其他状态变量
    boatgal.status.numPart = 'part0';
    boatgal.status.numChange = 0;
  }

  //TODO 给boatgal.stage注册事件

  //读入下一个change,把change写入boatgal.status.renderObj
  function readNextChange() {

    boatgal.status.numChange += 1;

    var numChange = boatgal.status.numChange;
    var numPart = boatgal.status.numPart;

    var change = boatgal.scenario[numPart][numChange];

    //遍历change中的属性,赋值到boatgal.status.renderObj
    for (var pro in change) {
      boatgal.status.renderObj[pro] = change[pro];
    }
  }
};