function  addInterval(){
  /* 添加刻度 */
  var strMinute = '';
  var strHour = '';
  var unitMinute = 360/12/5;
  var unitHour = 360/12;
  var num = 12*5;
  var minute = document.getElementById('minuteScale');
  var hour = document.getElementById('hourScale');
  for(var i=0;i<num;i++){
    strMinute += '<div class="interval" style="transform:rotate('+ i*unitMinute + 'deg);"></div>';
  }
  for(var i=0;i<12;i++){
    strHour +=  '<div class="interval" style="transform:rotate(' + i*unitHour + 'deg);"></div>';
  }
  minute.innerHTML = strMinute;
  hour.innerHTML = strHour;

}

addInterval();

function getSecond(){
  /* 设置秒针角度 */
  var time = new Date();
  var sec = time.getSeconds();
  var ms = time.getMilliseconds();
  var unit = 360/12/5;
  return (ms/1000 +  sec)*unit;
}
function getMinute(){
  /* 设置分针角度 */
  var time = new Date();
  var minute = time.getMinutes();
  var sec = time.getSeconds();
  var unit = 360/12/5;
  return (sec/60 + minute)*unit;
}
function getHour(){
  /* 设置时针角度 */
  var time = new Date();
  var minute = time.getMinutes();
  var hour = time.getHours();
  var unit = 360/12;
  return (minute/60 + hour)*unit;
}

function getTime(){
  /* 将上面三个函数合并 */
  var show = {};
  var time = new Date();
  var sec = time.getSeconds();
  var ms = time.getMilliseconds();
  var minute = time.getMinutes();
  var hour = time.getHours();
  var unitMinute = 360/12/5;
  var unitHour = 360/12;
  show.second = (ms/1000 +  sec)*unitMinute;
  show.minute = (sec/60 + minute)*unitMinute;
  show.hour = (minute/60 + hour)*unitHour;
  return show;


}



function timeLapses(){
  /* 时间流逝: */
  var oS = document.getElementById('second');
  var oM = document.getElementById('minute');
  var oH = document.getElementById('hour');
  oS.timer = setInterval(function(){
    oS.style.transform = 'rotate('+ getTime().second +'deg)';
    oM.style.transform = 'rotate('+ getTime().minute +'deg)';
    oH.style.transform = 'rotate('+ getTime().hour +'deg)';
  },50)
  

}
timeLapses();