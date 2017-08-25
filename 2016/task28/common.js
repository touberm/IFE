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
  var code = adapter(com,false);
  var com = com;
  var probability = Math.ceil(Math.random() * 100);
  var send = false;
  setMes(com,send,true);/* 立即发送消息给面板 */
  sendRepeatedly(com,probability);/* 发送消息给飞船 */
}

function sendRepeatedly(com,pro){
  /* 发送消息给飞船 递归 */
  var com = com;
  if(pro>10){
    setTimeout(function() {
      setMes(com,true,false);
      shipReceive(adapter(com,false));/* 发送消息 */
    },300);
  }else{
    setTimeout(function() {
      setMes(com,false,false);
      var proa = Math.ceil(Math.random() * 100);
      sendRepeatedly(com,proa);
    }, 300);
  }
}


function getShipStyle(){
  /* 获取飞船类型 */
  var form = document.forms['shipStyle'];
  var obj = {};
  obj.power = JSON.parse(form['power'].value);
  obj.reply = form['reply'].value;
  console.log(obj);
  return obj;
}

function shipReceive(code){
  var code = code;
  var codeObj = adapter(code,true);
  serial[codeObj.id].receive(codeObj.commond);
}

function adapter(mes,rs){
  /* 适配器函数 mes:接受参数 rs:接收true发送false */
  if(mes){
    if(rs){
      var codeObj = {};
      codeObj.id = mes.substring(0,4);
      codeObj.commond = mes.substring(4);
      for(var i in codingSerial){
        if(codingSerial[i] == mes.substring(0,4)){
          codeObj.id = i;
        }
      }
      for(var i in codingCommand){
        if(codingCommand[i] == mes.substring(4)){
          codeObj.commond = i;
        }
      }
      return codeObj;
    }else{
      var code = '';
      code += codingSerial[mes.id];
      code += codingCommand[mes.commond]
      return code;
    }
  }
}


function setMes(com,send,imme){
  /* 
    设置信息
    com:信息{id:0,commond:'create'}
    send:是否发射成功 
    imme:是否立即发射
  */
  var p = document.createElement('p');
  var suc = send ? '成功' : '失败';
  var text = '';
  if(imme){
    text = '向Ship'+ (com.id+1) + ' 发送 ' + com.commond + ' 指令!';
  }else{
    text = 'Ship'+ (com.id+1) + ' 指令 ' + com.commond + ' 发送' + suc +'!';
    if(send){
      p.className = 'success';
    }else{
      text += ' 重新发送!'
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
var codingSerial = {0:'0001',1:'0010',2:'0100',3:'1000'};/* 对序号进行编码 */
var codingCommand = {'create':'0001','destroy':'0010','play':'0100','pause':'1000'};/* 对指令进行编码 */
var li1 = new Commond();
var li2 = new Commond();
var li3 = new Commond();
var li4 = new Commond();
var add = new Commond();
var panel = [li1,li2,li3,li4];

var info1 = new Info();
var info2 = new Info();
var info3 = new Info();
var info4 = new Info();

/* 综合 */
var synth = [{'ship':first,'li':li1,'info':info1},{'ship':second,'li':li2,'info':info2},{'ship':third,'li':li3,'info':info3},{'ship':fourth,'li':li4,'info':info4}]

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
li1.serial = 0;
li2.serial = 1;
li3.serial = 2;
li4.serial = 3;
li1.order();
li2.order();
li3.order();
li4.order();
add.order();


console.log(info1.tbody);





