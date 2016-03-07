var boatgal = {};

boatgal.canvasId = ''; //页面上canvas元素的id,游戏显示的地方,在start中初始化
boatgal.stage = {}; //easeljs的Stage的实例,在start中初始化

boatgal.queue = {}; //preloadjs的LoadQueue的实例,用于访问已经加载的资源,在start函数中初始化

boatgal.asset = {}; //用于储存asset.json
boatgal.config = {}; //用于储存config.json
boatgal.scenario = {}; //用于储存scenario