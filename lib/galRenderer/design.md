#效果
一个`change`开始时,记作0时刻,每一个效果都有一个起始的时刻,这样就控制了效果的顺序。效果发生的时刻叫做`wait`。

剧本中,`effect`属性是一个数组,数组元素形式如下:
```
{
  name {String}: 效果的名字
  wait {Number}: 效果发生的时刻
  attribute {Object}: 对效果的描述,会作为效果器函数的第一个参数
}
```

##效果器函数
```
  /**
   * @method
   * @param {Object} attribute 效果的特性
   * @param {Function} fn 该效果过程完成后执行的函数
  **/
```

在`render`函数中通过`setTimeout`调用效果器函数,并且传入用于控制状态标记的函数作为`fn`。

##各种效果的attribute
下面是每种效果的`attribute`的描述。

###fade(figure的淡出淡入效果)
```
  {
    isFadein {Boolean}: 淡入还是淡出
    duration {Number}: (fade)效果的持续时间
    target {String}: 目标图片的id,这里专门指figure(背景图片用专门的切换效果)
  }
```

###bgSwitch(bg的切换效果)
```
  {
    method {String}: 具体的切换效果
  }
```

