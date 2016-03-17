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

/**
 * 记录要渲染的完整的舞台对象,
 * 例如,boatgal.scenario.part0[0]就是一个完整的要渲染的完整的对象,
 * 主要用于记录完整舞台状态,存档时可以写入这个对象到档案
 */
boatgal.status.renderObjFull = {};

/**
 * 要渲染的差异对象,其实就是剧本的change本身,
 * 游戏进行过程中,一般只需递交这个对象给渲染器
 */
boatgal.status.renderObjDiff = {};

//记录现在处于哪个part
boatgal.status.numPart = '';

//记录现在处于哪个change
boatgal.status.numChange = 0;

//表示是否要读取config中的档案,在defaultTitle或customTitle中根据玩家行动设置
boatgal.isLoadSave = false; 