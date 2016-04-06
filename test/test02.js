var testManifest = {
  path: '../asset/',
  manifest: [
    {id: 'bg01.jpg', src: 'bg01.jpg'},
    {id: 'ikazuti.png', src: 'ikazuti.png'},
    {id: 'inaduma.png', src: 'inaduma.png'}
  ]
};

//设置Ticker,注册刷新事件
createjs.Ticker.framerate = 20;
createjs.Ticker.removeAllEventListeners();
createjs.Ticker.addEventListener('tick', updateStage);

function updateStage() {
  boatgal.stage.update();
}

boatgal.queue.loadManifest(testManifest);

boatgal.queue.on('complete', handleComplete);

function handleComplete() {
  galRenderer.init(boatgal.stage);
  galRenderer.render(boatgal.status.renderObjFull);
}