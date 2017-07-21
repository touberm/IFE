function haveSubmenu(obj){
  if(obj.nextSibling){
    /* 存在兄弟元素 */
    if(obj.nextSibling.nodeType != 1){
      /*节点类型 != 1  */
      haveSubmenu(obj.nextSibling);
      /* 继续查找 */
    }else{
      /* 节点类型 == 1 */
      if(obj.nextSibling.className == 'body'){
        /* class == 'body' */
        console.log('className: ' + obj.nextSibling.className);
        console.log( obj.nextSibling);
        return obj.nextSibling;
      }else{
         haveSubmenu(obj.nextSibling);
      }
    }

  }else{
    /* 如果不存在下一个兄弟元素 ==> 没有子菜单 */
    return false;
  }
}

function init(){
  var oP = document.getElementsByTagName('p');
  for(var i=0;i<oP.length;i++){
    oP[i].index = i;
    oP[i].onclick = function(){
      console.log('30: ' +haveSubmenu(oP[0]));
      if(haveSubmenu(this)){
       
        console.log('that: '+ oP[this.index]);
        haveSubmenu(this).style.display = 'block';
      }
    }
  }
}


function init2(){
  var oP = document.getElementsByTagName('p');
  for(var i=0;i<oP.length;i++){
    oP[i].index = i;
    
    oP[i].onclick = function(){
      console.log('init2: ' +this.index)
    }
  }
}

init();
