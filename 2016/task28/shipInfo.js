

var Info = function(){};

Info.prototype.tbody = document.querySelectorAll('.control table tbody')[0];
/* tr和td盒子 */
Info.prototype.tr = null;
Info.prototype.energyTd = null;
Info.prototype.expendTd = null;
Info.prototype.recoverTd = null;
Info.prototype.currentTd = null;
Info.prototype.currentEnergyTd = null;
/* 各个td内容 */
Info.prototype.energy = null;/* 能源系统 */
Info.prototype.expend = null;/* 消耗/s */
Info.prototype.recover = null;/* 恢复系统 */
Info.prototype.current = null;/* 当前状态 */
Info.prototype.currentEnergy = 100;/* 当前能量 */




Info.addMethod('create',function(com,current){
  var status = {'create':'生成','destroy':'摧毁','play':'运行','pause':'停止'};

  if(current == 'create'){
    var shipStyle = getShipStyle();
    /* 样式 {power: {speed: 30, expend: 5}, reply: "4"} */
    this.energy = shipStyle.power.speed+'px/s';
    this.expend = shipStyle.power.expend+'能量/s';
    this.recover = shipStyle.reply+'能量/s';
    this.current = status[current];
    this.currentEnergy = 100;
    
    this.energyTd.innerHTML = this.energy;
    this.expendTd.innerHTML = this.expend;
    this.recoverTd.innerHTML = this.recover;
    this.currentTd.innerHTML = this.current;
    this.currentEnergyTd.innerHTML = this.currentEnergy;

    this.tr.appendChild(this.energyTd);
    this.tr.appendChild(this.expendTd);
    this.tr.appendChild(this.recoverTd);
    this.tr.appendChild(this.currentTd);
    this.tr.appendChild(this.currentEnergyTd);
    this.tbody.appendChild(this.tr);
    
  }else if(current == 'destroy'){
    this.tbody.removeChild(this.tr);
  }
});

Info.addMethod('mesChange',function(current,energy){

});

