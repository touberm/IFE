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
Ship.prototype.exit = false;  /* 是否存在 */
Ship.prototype.expend = 5;/* 每秒消耗能量 */
Ship.prototype.gain = 2;/* 每秒获取的能量 */
/* 
圆周长 C = 2*π*r
圆弧长 L = n/360*2*π*r = n*π*r/180
圆弧角度 n = L*180/(π*r);
unit = (20px) * 180 / (3.1415926 * radius)
*/
Ship.addMethod('create',function(){
  /* 创建飞船 */
  var shipStyle = getShipStyle();
   console.log(shipStyle.power.speed);
  console.log(shipStyle.reply);
  this.setAttr(shipStyle.power['speed'],shipStyle.power['expend'],shipStyle.reply);
  console.log(this.arcLength);
  console.log(this.expend);
  console.log(this.gain); 
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
        panel[obj.serial].playSwitch = false;
        panel[obj.serial].F5();
        clearInterval(obj.playEnergy);
      }
    },1000/obj.expend);
    
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
    },1000/obj.gain);
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

Ship.addMethod('setAttr',function(arcLength,expend,gain){
  /* arcLength移动距离;expend消耗;gain获取能量; */
  this.arcLength = arcLength;
  this.expend = expend;
  this.gain = gain;
  /* 设置后重新设定各个参数值 */
  this.unitRotate = this.arcLength * 180 / (3.1415926 * this.radius);
});


/* end 飞船 */