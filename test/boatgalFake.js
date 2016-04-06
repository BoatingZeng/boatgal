//用于测试galRenderer,初始化一些boatgal的属性
var boatgal = {};

boatgal.stage = new createjs.Stage('testC');

boatgal.queue = new createjs.LoadQueue();

boatgal.config = {
  width: 800,
  height: 480,
  dialogText: {
    font: '20px Arial',
    color: '#fff'
  },
  speakerText: {
    font: 'bold 20px 微软雅黑',
    color: '#fff'
  }
};

boatgal.status = {};

boatgal.status.renderObjFull = {
  bg: 'bg01.jpg',
  figures: [
    {id: 'ikazuti.png', position:{x: 0, y: 0}},
    {id: 'inaduma.png', position:{x: 300, y: 0}}
  ],
  dialog: {speaker: 'speaker', speech: 'Testing 正在测试'},
  effect: [
    {name: 'fade'}
  ]
};

boatgal.status.isWaiting = false;