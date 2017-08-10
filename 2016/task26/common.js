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
Function.prototype.addMethod = function(name,fn){
  this.prototype[name] = fn;
}
var Ship = function(){};
/* 飞船 */


Ship.prototype.entity = null /* 实体 */
Ship.prototype.radius = 0;   /* 半径 */
Ship.prototype.arcLength = 20;/* 移动弧长 */
Ship.prototype.energy = 100; /* 能量值 */
Ship.prototype.consume = 5; /* 每秒损耗能量值 */
Ship.prototype.acquire = 2; /* 每秒获得的能量值 */
Ship.prototype.serial = null;/* 序列号 */
Ship.prototype.rotate = 0;   /* 记录旋转的角度 */
Ship.prototype.unitRotate = 0;     /* 每次旋转增加的值 */
Ship.prototype.timer = null;  /* 定时器 */
Ship.prototype.status = null; /* 飞船状态 */
Ship.prototype.exit = false;
/* 
圆周长 C = 2*π*r
圆弧长 L = n/360*2*π*r = n*π*r/180
圆弧角度 n = L*180/(π*r);
unit = (20px) * 180 / (3.1415926 * radius)
*/
Ship.addMethod('create',function(){
  /* 创建飞船 */
  clearInterval(this.timer);
  clearInterval(this.playEnergy);
  clearInterval(this.pauseEnergy);
  this.entity.style.display = 'block';
  this.status = 'pause';
  this.exit = true;
  
});
Ship.addMethod('destroy',function(){
  /* 摧毁飞船 */
  var obj = this;
  clearInterval(this.timer);
  clearInterval(this.playEnergy);
  clearInterval(this.pauseEnergy);
  this.entity.style.display = 'none';
  this.exit = false;
  this.rotate = 0;
  this.energy = 100;
  this.setEnergy(obj);
  this.setColor(obj);
  this.entity.style.transform = 'rotate('+ this.rotate +'deg)';
});
Ship.addMethod('receive',function(commond){
  if(commond == 'create'){
    this.create();
  }else if(commond == 'destroy'){
    this.destroy();

  }else if(commond == 'play'){
    this.play();

  }else if(commond == 'pause'){
    this.pause();

  }
});
Ship.addMethod('doPlay',function(obj){
  /* play中循环内容 obj为Ship本身 */
  obj.rotate += obj.unitRotate * 50 / 1000;
  obj.rotate = (obj.rotate > 360) ? (obj.rotate  - 360) : obj.rotate; 
  obj.entity.style.transform = 'rotate('+ obj.rotate +'deg)';
})
Ship.addMethod('play',function(){
  this.status = 'play';
  var obj = this;
  clearInterval(this.timer);
  clearInterval(this.pauseEnergy);
  clearInterval(this.playEnergy);
  obj.timer = setInterval(function(){
    /* 开始飞行 */
    obj.doPlay(obj);
  },50);
  obj.energyChange(obj);
  
});
Ship.addMethod('pause',function(){
  var obj = this;
  obj.setColor(obj);
  clearInterval(this.timer);
  clearInterval(this.playEnergy);
  clearInterval(this.pauseEnergy);
  this.status = 'pause';
  obj.energyChange(obj);
  
});
Ship.addMethod('energyChange',function(obj){
  /* 能量变化 */
  if(obj.status == 'play'){
    /* 在play时每秒减少5 */
    obj.playEnergy = setInterval(function(){
      obj.energy += -1;
      obj.setEnergy(obj);
      obj.setColor(obj);
      if(obj.energy <= 0){
        /* 能量小于0时=0 自动暂停 并回复能量 */
        obj.energy = 0;
        obj.setEnergy(obj);
        obj.pause();
        clearInterval(obj.playEnergy);
      }
    },1000/5);
    
  }else if(obj.status == 'pause'){
    obj.pauseEnergy = setInterval(function(){
      obj.energy += 1;
      obj.setEnergy(obj);
      obj.setColor(obj);
      if(obj.energy >= 100){
        /* 能量大于100时=100 */
        obj.energy = 100;
        obj.setEnergy(obj);
        obj.setColor(obj);
        clearInterval(obj.pauseEnergy);
      }
    },1000/2);
  }
});
Ship.addMethod('setEnergy',function(obj){
  /* 设置能量值 */
  var energy = obj.entity.getElementsByTagName('small')[0];
  energy.innerHTML = obj.energy;
});
Ship.addMethod('setColor',function(obj){
  /* 设置能量条颜色 */
  var eColor = obj.entity.querySelectorAll('.bar')[0];
  if(obj.energy >= 60){
    eColor.style.backgroundColor = '#181';
    eColor.style.width = obj.energy / 100 * 64 + 'px';
  }else if(obj.energy < 60 && obj.energy >= 20){
    eColor.style.backgroundColor = '#fc0';
    eColor.style.width = obj.energy / 100 * 64 + 'px';
  }else{
    eColor.style.backgroundColor = '#c00';
    eColor.style.width = obj.energy / 100 * 64 + 'px';
  }
});

/* end 飞船 */



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



/* 指令 */
var Commond = function(){};
/* 开关父元素 */
Commond.prototype.li = null;
/* 4种开关 */
Commond.addMethod('create',function(){
  return this.li ? this.li.querySelectorAll('.create')[0] : null;
});
Commond.addMethod('destroy',function(){
  return this.li ? this.li.querySelectorAll('.destroy')[0] : null;
});;
Commond.addMethod('play',function(){
  return this.li ? this.li.querySelectorAll('.play')[0] : null ;
});
Commond.addMethod('pause',function(){
  return this.li ? this.li.querySelectorAll('.pause')[0] : null ;
});
/* 4种开关状态 */
Commond.prototype.createSwitch = false;
Commond.prototype.destroySwitch = false;
Commond.prototype.playSwitch = false;
Commond.prototype.pauseSwitch = false;
/* 序号 */
Commond.prototype.serial = null;
/* 原始className */
Commond.prototype.createClass = 'create';
Commond.prototype.destroyClass = 'destroy';
Commond.prototype.playClass = 'play';
Commond.prototype.pauseClass = 'pause';
/* 发送信息 */
Commond.prototype.message = null;
/* 飞船是否存在 */
Commond.prototype.exit = false;
/* 添加开关 */
Commond.addMethod('add',function(){
  return document.querySelectorAll('.command ul li.add button')[0];
});
/* 删除 */
Commond.addMethod('del',function(){
  return this.li ? this.li.querySelectorAll('.del')[0] : null ;
})


/* 设置开关状态 */
Commond.addMethod('F5',function(){
  if(this.createSwitch == false){
    this.create().className = this.createClass;
  }else{
    this.create().className = this.createClass + ' active';
  }
  if(this.destroySwitch == false){
    this.destroy().className = this.destroyClass;
  }else{
    this.destroy().className = this.destroyClass + ' active';
  }
  if(this.playSwitch == false){
    this.play().className = this.playClass;
  }else{
    this.play().className = this.playClass + ' active';
  }
  if(this.pauseSwitch == false){
    this.pause().className = this.pauseClass;
  }else{
    this.pause().className = this.pauseClass + ' active';
  }
});

Commond.addMethod('order',function(){
  /* 命令操作 */
  var obj = this;
  /* 生成 */
  if(obj.create()){
    obj.create().onclick = function(){
      /* 命令板变化 */
      if(obj.exit == false){
        var com =  {'id':obj.serial,'commond':obj.createClass};
        sendCommond(com);/* 发送命令 */
        obj.exit = true;
        obj.createSwitch = true;
        obj.destroySwitch = false;
      }
      /* 刷新开关状态 */
      obj.F5();
    }
  }
  
  /* 摧毁 */
  if(obj.destroy()){
    obj.destroy().onclick = function(){
      if(obj.exit == true){
        var com =  {'id':obj.serial,'commond':obj.destroyClass};
        sendCommond(com);
        obj.exit = false;
        obj.createSwitch = false;
        obj.destroySwitch = false;
        obj.playSwitch = false;
        obj.pauseSwitch = false;
      }
      obj.F5();
    }
  }
  
  /* 运行 */
  if(obj.play()){
    obj.play().onclick = function(){
      if(obj.exit == true){
        var com =  {'id':obj.serial,'commond':obj.playClass};
        sendCommond(com);
        obj.playSwitch = true;
        obj.pauseSwitch = false;
      }
      obj.F5();
    }
  }
 
  /* 暂停 */
  if(obj.pause()){
    obj.pause().onclick = function(){
      if(obj.exit == true){
        var com =  {'id':obj.serial,'commond':obj.pauseClass};
        sendCommond(com);
        obj.playSwitch = false;
        obj.pauseSwitch = true;
      }
      obj.F5();
    }
  }
  
  /* 增加 */
  if(obj.add()){
    obj.add().onclick = function(){
      console.log(panel.length);
      for(var i=0 ;i<panel.length; i++){
        if(panel[i].li.style.display == 'none' || !panel[i].li.style.display ){
          panel[i].li.style.display = 'block';
          return;
        }
      }

       alert('飞船数目已达到上限');
    }

  }

  /* 删除 */
  if(obj.del()){
    obj.del().onclick = function(){
      if(obj.exit == false){
        obj.li.style.display = 'none';
      }
    }
  }
 
});

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