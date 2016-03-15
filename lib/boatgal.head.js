var boatgal = {};

//页面上canvas元素的id,游戏显示的地方,在start中初始化
boatgal.canvasId = '';

//easeljs的Stage的实例,在start中初始化
boatgal.stage = {};

//preloadjs的LoadQueue的实例,用于访问已经加载的资源,在start函数中初始化
boatgal.queue = {};

//用于储存asset.json,在start中赋值
boatgal.asset = {};

//用于储存config.json,在start中赋值
boatgal.config = {}; 

//用于储存scenario,在start中赋值
boatgal.scenario = {}; 

//记录游戏的即时状态
boatgal.status = {}; 

//记录要渲染的对象,例如,boatgal.scenario.part0[0]就是一个完整的要渲染的对象
boatgal.status.renderObj = {};

//记录现在处于哪个part
boatgal.status.numPart = '';

//记录现在处于哪个change
boatgal.status.numChange = 0;

//表示是否要读取config中的档案,在defaultTitle或customTitle中根据玩家行动设置
boatgal.isLoadSave = false; 