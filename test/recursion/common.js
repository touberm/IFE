function recursion(obj){
  if(obj<100){
    recursion(obj+1);
  }else{
    return 'ok';
  }
}

function init(){
  var i = 0;
  var count = recursion(i);
  console.log(count);
}

init();