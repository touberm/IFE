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
      getShipStyle();
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