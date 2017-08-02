### 关于迭代函数返回值的问题

代码如下  
```
function recursion(obj){
  if(obj<100){
    //当obj小于100的时候,执行obj+1
    recursion(obj+1);
  }else{
    return 'ok';
  }
}

function init(){
  var i = 0;
  var count = recursion(i);//本意是在这里得到当传入的i大于100时返回的'ok';
  console.log(count);//实际输出为undefined;
}

init();
```

误区原因:这是一个初学者特别容易困惑的地方,
在if(obj<100){recursion(obj+1)}没有return  
少了一句return导致recursion(obj+1)的值既不能返回给recursion(obj),recursion(obj)在obj<100的时候也没有返回值,默认为undefined

即只有recursion(100+);才能直接返回'ok'
  

 ***

解决办法:将进入迭代的判断语句加上返回值,这样迭代的数据才能传递回来
```
function recursion(obj){
  if(obj<100){
    //当obj小于100的时候,执行obj+1
    return recursion(obj+1);
  }else{
    return 'ok';
  }
}
```