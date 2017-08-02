function haveSubmenu(obj){
  if(obj.nextSibling){
    /* 存在兄弟元素 */
    if(obj.nextSibling.nodeType != 1){
      /*节点类型 != 1  */
      console.log('节点类型!=1 继续查找nextSibling')
      haveSubmenu(obj.nextSibling);
      /* 继续查找 */
    }else{
      /* 节点类型 == 1 */
      if(obj.nextSibling.className == 'body'){
        /* class == 'body' */
        console.log('class= body 返回结果')
        console.log(obj.nextSibling);
        return obj.nextSibling;
      }else{
        console.log('class!= body 继续查找nextsibling')
        haveSubmenu(obj.nextSibling);
      }
    }

  }else{
    /* 如果不存在下一个兄弟元素 ==> 没有子菜单 */
    console.log('不存在nextsibling,返回false')
    return false;
  }
}
// console.log(haveSubmenu(document.getElementsByTagName('p')[0].nextSibling));

// haveSubmenu(document.getElementsByTagName('p')[0].nextSibling).style.background = 'block';
// var aa = haveSubmenu(document.getElementsByTagName('p')[0].nextSibling);
// console.log(123124);
// console.log(aa);

function init(){
  var oP = document.getElementsByTagName('p');
  var pBody ={};
  for(var i=0;i<oP.length;i++){
    oP[i].index = i;
    oP[i].onclick = function(){
      
      pBody[this.index] = haveSubmenu(oP[this.index]);
      console.log(pBody[this.index]);
      if(pBody[this.index]){
        
        pBody[this.index].style.display = 'block';
      }
    }
  }
}


function init2(){
  var oP = document.getElementsByTagName('p')[0];
  var aaa = haveSubmenu(oP);
  console.log(aaa);
}

// init2();
