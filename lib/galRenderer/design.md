#效果
一个`change`开始时,记作0时刻,每一个效果都有一个起始的时刻,这样就控制了效果的顺序。效果发生的时刻叫做`wait`,

剧本中,`effect`属性是一个数组,数组元素形式如下:
```
{
  name {String}: 效果的名字
  wait {Number}: 效果发生的时刻
  attribute {Object}: 对效果的描述,会作为效果器函数的参数
}
```

##各种效果的attribute
下面是每种效果的`attribute`的描述。效果名称下面的`Object`就是`attribute`。

###branch
```
{
  choices {Array}: 选择的集合
}
```

`choices`的元素:
```
{
  text {String}: 要显示的字符串
  targetPart {String}: 要跳转至的part
}
