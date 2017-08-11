/* 
 * @description:
 * @author:
 * @update:
 */


/*  */
/* 
Function.prototype.addMethod = function(name,fn){
  this.prototype[name] = fn;
}

var methods = function(){};

methods.addMethod('namec',function(){
  console.log('name');
})


 */
/* 调用 */
/* 
var m = new methods();
m.namec();
*/

/* END test */



/* 指令发射 */
function sendCommond(com){
  
  /* 概率 */
  var com = com;
  var probability = Math.ceil(Math.random() * 100);
  var send = false;
  setMes(com,send,true)
  /* 延迟一秒执行 */
  setTimeout(function(){
    if(probability > 30){
      serial[com.id].receive(com.commond);
      send = true;
    }else{
      send = false;
    }
    setMes(com,send,false);
  },1000);
}

function setMes(com,send,imme){
  /* 
    设置信息
    com:信息{id:0,commond:'create'}
    send:是否发射成功 
    imme:是否立即发射
  */
  var p = document.createElement('p');
  console.log(p);
  var suc = send ? '成功' : '失败';
  var text = '';
  if(imme){
    text = '向Ship'+ (com.id+1) + ' 发送 ' + com.commond + ' 指令!';
  }else{
    text = 'Ship'+ (com.id+1) + ' 指令 ' + com.commond + ' 发送' + suc +'!';
    if(send){
      p.className = 'success';
    }else{
      p.className = 'waring';
    }
  }
 
  p.innerHTML = text;
  if(mes.prev){
    mes.insertBefore(p,mes.prev);
  }else{
    mes.appendChild(p)
  }
  mes.prev = p;
}




var first,second,thrid,fourth;
var mes = document.querySelectorAll('.control .data .message')[0];
mes.prev = null;/* 信息数目 */
mes.cur = null;/* 当前信息 */

var first = new Ship();
var second = new Ship();
var third = new Ship();
var fourth = new Ship();
var serial = {0:first,1:second,2:third,3:fourth};
var li1 = new Commond();
var li2 = new Commond();
var li3 = new Commond();
var li4 = new Commond();
var add = new Commond();
var panel = [li1,li2,li3,li4];
/* 飞船序列号 */
first.serial = 0;
second.serial = 1;
third.serial = 2;
fourth.serial = 3;
/* 运动半径 */
first.radius = 350
second.radius = 275;
third.radius = 200;
fourth.radius = 125;
/* 移动弧长 在原型中设置 */
/* 计算转动的角度 */
first.unitRotate = first.arcLength * 180 / (3.1415926 * first.radius);
second.unitRotate = second.arcLength * 180 / (3.1415926 * second.radius);
third.unitRotate = third.arcLength * 180 / (3.1415926 * third.radius);
fourth.unitRotate = fourth.arcLength * 180 / (3.1415926 * fourth.radius);
/* 角度记录 */
first.rotate = 0;
second.rotate = 0;
third.rotate = 0;
fourth.rotate = 0;
/* 实体 */
first.entity = document.querySelectorAll('.airship')[first.serial];
second.entity = document.querySelectorAll('.airship')[second.serial];
third.entity = document.querySelectorAll('.airship')[third.serial];
fourth.entity = document.querySelectorAll('.airship')[fourth.serial];



li1.li = document.querySelectorAll('.command ul li')[0];
li2.li = document.querySelectorAll('.command ul li')[1];
li3.li = document.querySelectorAll('.command ul li')[2];
li4.li = document.querySelectorAll('.command ul li')[3];
add.li = document.querySelectorAll('.command ul li.add button')[0];
console.log(li1.create());
console.log(li1.destroy());
console.log(li1.play());
console.log(li1.pause());
li1.serial = 0;
li2.serial = 1;
li3.serial = 2;
li4.serial = 3;
li1.order();
li2.order();
li3.order();
li4.order();
add.order();



// first.play();
// second.play(); 
// third.play();
// fourth.play(); 



/* 
first.
second.
third.
fourth.
 */