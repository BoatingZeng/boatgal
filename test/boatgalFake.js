//用于测试galRenderer,初始化一些boatgal的属性
var boatgal = {};

boatgal.stage = new createjs.Stage('testC');

boatgal.queue = new createjs.LoadQueue();

boatgal.config = {
  dialogText: {
    font: '20px Arial',
    color: '#000000'
  }
};

boatgal.status = {};

boatgal.status.renderObjFull = {
  bg: 'bg.png',
  figures: [
    {id: 'ikazuti.png', position:{x: 0, y: 0}},
    {id: 'inaduma.png', position:{x: 300, y: 0}}
  ],
  dialog: {speaker: 'speaker', speech: 'Testing 正在测试'}
};

boatgal.status.isWaiting = false;