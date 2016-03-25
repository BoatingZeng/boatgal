var testManifest = {
  path: '../asset/',
  manifest: [
    {id: 'bg.png', src: 'bg.png'},
    {id: 'ikazuti.png', src: 'ikazuti.png'},
    {id: 'inaduma.png', src: 'inaduma.png'}
  ]
};

boatgal.queue.loadManifest(testManifest);

boatgal.queue.on('complete', handleComplete);

function handleComplete() {
  galRenderer.init(boatgal.stage);
  galRenderer.render(boatgal.status.renderObjFull, boatgal.stage);
}