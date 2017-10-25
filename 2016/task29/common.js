var name = document.getElementsByTagName('input')[0];
var btn = document.getElementsByTagName('button')[0];
var verify = '';




btn.addEventListener('click',function(){
  verify = name.value();
  console.log(verify);
  console.log(1);
});