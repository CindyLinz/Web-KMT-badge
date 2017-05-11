function each(arr, act){
  for(var i=0; i<arr.length; ++i)
    act(arr[i], i);
}

function draw(){
  var color = document.querySelector('#color').value;
  var w = document.querySelector('#width').value - 0;
  var h = document.querySelector('#height').value - 0;
  var ratio = document.querySelector('#ratio').value - 0;
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var s = w < h ? w : h;

  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = color;
  if( document.querySelector('[name=shape]:checked').value==='square' ){
    ctx.fillRect(0, 0, w, h);
  }
  else{
    ctx.beginPath();
    ctx.arc(w/2, h/2, s/2, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(w/2 + ratio*s/2, h/2);
  each([5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0], function(i){
    var arg = Math.PI*i/6;
    ctx.lineTo(
      w/2 + Math.cos(arg)*ratio*s/2,
      h/2 + Math.sin(arg)*ratio*s/2
    );
  });
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill('nonzero');

  ctx.beginPath();
  ctx.moveTo(w/2, h/2 - 17/60*ratio*s);
  ctx.arc(w/2, h/2, 17/60*ratio*s, 0, Math.PI*2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(w/2, h/2 - .25*ratio*s);
  ctx.arc(w/2, h/2, .25*ratio*s, 0, Math.PI*2);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();
}

document.body.addEventListener('change', draw);
document.body.addEventListener('keyup', draw);
draw();

document.querySelector('button').addEventListener('click', function(ev){
  var a = document.createElement('a');
  a.href = document.querySelector('canvas').toDataURL();
  a.download = 'KMT.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
