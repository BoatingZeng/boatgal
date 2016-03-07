#效果

##整体画面
1. 震动摇晃之类的

##文字区
1. 打字机效果，外加淡入等美化效果
2. 段落结束后，末尾加动态的等待提示

##背景
1. 背景切换时加一些幻灯片式过渡效果

##人物
1. 人物表情切换时尝试加过渡效果，使之有动感

##声音
1. BGM
2. 效果音，尽量灵活地插入

#数据结构
`boatgal`作为全局对象(命名空间)。

游戏数据由`asset`、`scenario`、`config`三个对象描述。
这三个对象在服务器有独立的`json`文件储存。
1. `asset`指代整个游戏资源,具体格式参见createjs的preloadjs的manifest。
2. `scenario`指剧本，具体见剧本细节。
3. `config`记录一些设定。

##剧本细节
用简单的分支结构,剧本数据格式如下：
```json
  {
    "part0": [
      {
        "bg": "",
        "bgm": "",
        "figures": [{"id": "", "position": {"x": 0, "y": 0}, "effect": {}}],
        "dialog": {"speaker": "", "speech": "", "effect": {}}
      }
    ]
  }
```

1. `scenario {Object}`: 剧本整体,分成多个无关的`part`。
```
   {
     partX {Array}: 一个partX数组,剧本的一部分,这部分内部会顺序执行,X是整数,从0开始,change对象的集合。
   }
```

2. `change {Object}`: `part`的元素,表示舞台的变化,添加或者切换某一类舞台元素(指背景、音效、人物、台词等),则把要添加或者切换后的舞台元素写在`change`中;要去除,则写`"off"`。变化以`change`的直接子元素为基础,即,`figures`这类本身是`Array`或`Object`的元素,一旦改变,就是改变整个`Array`和`Object`。`change`中改变最频繁的是`dialog`元素。
```
   {
     bg {String}: 背景图片的id,背景图片的位置会设定为(0,0)
     bgm {String}: 背景音乐的id
     figures {Array}: figure对象的集合
     dialog {Object}: 
   }
```

3. `figure {Object}`: 表示一张非背景图片。
```
   {
     id {String}: 图片id
     position {Object}: 表示图片位置。包含x {Num}, y {Num}属性。
     effect {Object}: 描述关于该figure的效果。主要是进出场时的效果。
   }
```

4. `dialog {Object}`: 表示一句(段)对话
```
   {
     speaker {String}: 说话人名称
     speech {String}: 所说的话
     effect {Object}: 描述该对话期间的效果。比如说到某个词时有效果音,或者说到某个词时人物图片有动作(表情改变、晃动)。
   }
```

###效果器(effect object)
该object的属性名是各种效果的名称。

####分支效果器
1. `branch {Array}`: 描述分支选项，只在`part`的最后一个`change`有该效果。是`choice`的集合。

2. `choice {Object}`: 包含要显示的文字和要跳转至的part。
```
   {
    text {String}: 在出现分支选项时，选项上显示的文字。
    targetPart {String}: 要跳转至的目标part。
   }
```

#工作流程

##梗概
1. 通过`preloadjs`加载`asset.json`中的资源
2. 加载完毕后开始游戏,游戏过程中不需要后台参与。

##细节

###加载过程
加载过程中显示加载画面。

###游戏(标题)画面
正式从剧本开始前，先插入一个标题画面。不同的游戏,标题画面不同,可以互动。所以每个游戏都可以有一个负责显示标题画面的脚本。有一个默认脚本,以供没有自定义标题画面的游戏使用。

###剧本本体的进行过程
有一个描述舞台上要展示的事物的对象。剧本进行的过程就是把要展示的事物记录到该对象,然后展示。剧本中,除了`part`的开头,记录的都是舞台的变化,而不是完整的舞台。所以游戏一定要从`part`的开头开始,或者把完整的舞台状态记录下来,从这个被记录的状态开始,这就是游戏的存档功能。
