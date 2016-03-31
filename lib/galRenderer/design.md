#效果
关于效果和效果器的设计。效果描述指在剧本文件中的描述方法。效果器指具体的实现方法。效果在剧本中命名为`effect`。效果描述即为`effect`对象的属性

##分支效果
用于在一个`part`结束时处理分支。

###效果描述
1. `branch {Array}`: 描述分支选项，只在`part`的最后一个`change`有该效果。是`choice`的集合。

2. `choice {Object}`: 包含要显示的文字和要跳转至的part。
```
   {
    text {String}: 在出现分支选项时，选项上显示的文字。
    targetPart {String}: 要跳转至的目标part。
   }
```

###效果器
