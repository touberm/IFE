var current,prev;/* 当前元素,上一个元素 */

function getSib(obj){
  if(obj.nextSibling){
    /* 存在兄弟元素 */
    if(obj.nextSibling.nodeType != 1){
      /*节点类型 != 1  */
      return getSib(obj.nextSibling);
      /* 继续查找 */
    }else{
      /* 节点类型 == 1 */
      if(obj.nextSibling.className == 'body'){
        /* class == 'body' */
        return obj.nextSibling;
      }else{
        return getSib(obj.nextSibling);
      }
    }

  }else{
    /* 如果不存在下一个兄弟元素 ==> 没有子菜单 */
    return false;
  }
}

/* 获取最近的父级<p> */
function getParent(obj){
  var obj = obj;
  if(obj){
    if(obj.parentNode){
      if(obj.parentNode.nodeName == 'P'){
        return obj.parentNode;
      }else{
        return getParent(obj.parentNode);
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
}
/* 获取父元素的父元素 */
function getGrandP(obj){
  var obj = obj;
  if(obj){
    if(obj.parentNode.parentNode){
      return obj.parentNode.parentNode;
    }else{
      return false;
    }
  }else{
    return false;
  }
}

/* 添加和删除 */
function subBtn(){
  var span = document.getElementById('wrap').getElementsByTagName('span');
  var add = [],
      del = [];
  /* 获取所有的add和del按钮 */
  for(var i=0;i<span.length;i++){
    if(span[i].className == 'add'){
      add.push(span[i]);
    }else if(span[i].className == 'del'){
      del.push(span[i]);
    }
  }


  for(var k=0;k<add.length;k++){
    add[k].onclick = function(ev){
      var ev = ev || window.ev;
      ev.stopPropagation();
      var addVal =  prompt('请输入插入内容:');
      var par = getParent(this);/* <p> */
      /* 父元素 */
      var str = '<div class="unit"><p class="title">'+addVal+'<span><span class="add">+</span><span class="del">× </span></span></p><div class="body"></div></div>';
      var parBody = getSib(par);
     
      if(parBody){
        parBody.innerHTML += str;
      }else{
        par.innerHTML += '<div class="body">'+str +'</div>';
      }
      /* 添加完元素后,为其添加展开显示,点击事件  其状态变为展开*/
      var sib = getSib(par);/* div.body */
      sib.style.display = 'block';
      subBtn();
      init();
    }

    /* 删除事件 */
    /* 父元素的父元素.removeChile(父元素) */
    for(var j=0;j<del.length;j++){
      
      del[j].onclick = function(ev){
        var ev = ev || window.ev;
        ev.stopPropagation();
        var par = getParent(this);
        var grandP = getParent(this).parentNode.parentNode;
        grandP.removeChild(par.parentNode);
        subBtn();
        init();

      }
    }
  }

}
/* 查找是否有.unit的子元素 */
function haveUnit(obj){
  var sib  = getSib(obj);
  if(sib){
    var sibChild = sib.childNodes;
    for(var i=0;i<sibChild.length;i++){
      if(sibChild[i].className == 'unit'){
        return true;
      }
    }
    return false;
  }
}
/* 设置背景 */
function setBg(){
  var pp = document.getElementById('wrap').getElementsByTagName('p');
  for(var i=0;i<pp.length;i++){
    if(haveUnit(pp[i])){
      if(getSib(pp[i]).style.display == 'none' || !(getSib(pp[i]).style.display) ){
        pp[i].style.backgroundImage = 'url("./img/folder_close.png")';
      }
      if(getSib(pp[i]).style.display == 'block' ){
        pp[i].style.backgroundImage = 'url("./img/folder_open.png")';
      }
    }else{
    /* 没有.unit 子元素 */
      pp[i].style.backgroundImage = 'url("./img/file.png")';
    }
  }
 
}
/* 当前选中变色 */
function setColor(obj,prev){
  if(prev){
    prev.style.backgroundColor = '#fff';
    prev.style.color = '#000';
  }
  if(obj){
    obj.style.backgroundColor = '#291';
    obj.style.color = '#fff';
  }
  
}

function init(){
  subBtn();
  setBg();
  /* 展开与隐藏 */
  var pp = document.getElementById('wrap').getElementsByTagName('p');
  var searchBtn = document.getElementById('side').getElementsByTagName('button')[0];
  for(var i=0;i<pp.length;i++){
    /* 给每个p添加事件 */
    pp[i].onclick = function(ev){
      var ev = ev || window.event;
      ev.stopPropagation();
      var mb = getSib(this);
      current = this;
      mb.style.display = (mb.style.display == 'none' || !(mb.style.display)) ? 'block' : 'none';
      /* 第一次的时候mb.style.display 不存在 */
      setBg();/* 每次点击后,更新背景 */
      setColor(current,prev);
      prev = this;
    }
  }

  searchBtn.onclick = doSearch;

}

init();
window.onclick = cleanColor;
/* 清空p颜色 */
function cleanColor(){
  var pp = document.getElementById('wrap').getElementsByTagName('p');
  for(var i=0;i<pp.length;i++){
    pp[i].style.backgroundColor = '#fff';
    pp[i].style.color = '#000';
  }
}

/* 查找功能 */


/*去除两端空格*/
function trim(str) { 
  return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
/*查找匹配输入框内容,并返回匹配对象*/
function doMatch(content,match){
  if(content){
    var content = trim(content);
  }
  if(content == match){
    return true;
  }
  return false;
  
}


/* 获取查询内容 */
function getVal(){
  var val = document.getElementById('side').getElementsByTagName('input')[0];
  if(val.value == ''){
    return false;
  }else{
    return val.value;
  }
}
/* 获取元素内容 */
function getContent(obj){
  if(obj){
    var content = obj.firstChild.nodeValue;
    return content;
  }
  return false;
}
/* 查询 */
function doSearch(){
  clearInterval(ppTimer);
  var pp = document.getElementById('wrap').getElementsByTagName('p');
  var num = 0;
  var result = [];
  var match = getVal();


  /* 展开所有.body */
  var bodyy = document.getElementById('wrap').getElementsByTagName('div');
  var bodyArr = [];
  for(var i=0;i<bodyy.length;i++){
    if(bodyy[i].className == 'body'){
      bodyArr.push(bodyy[i]);
    }
  }
  for(var i=0;i<bodyArr.length;i++){
    bodyArr[i].style.display = 'block';
  }
  /* END 展开所有.body */
  /* 先将prev清空 */
  prev = '';
  /* 遍历p标签  进行查询*/
  var ppTimer = setInterval(function(){
    current = pp[num];
   
    setColor(current,prev);
    
    
    if(num > pp.length){
      clearInterval(ppTimer);
      prev = '';
    }
    if(!doMatch(getContent(pp[num]),match)){
      prev = current;
    }
    num++;
    
  },500); 
}


/* 清空对象方法 */
function cleanObj(){};
