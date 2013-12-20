
var bola1,bola2,bola3,bola4,bola5;
var anim;

var stage = new Kinetic.Stage({
  container: 'postal',
  width: 1188,
  height: 600
});

var layerTecho = new Kinetic.Layer();
var layerTelon = new Kinetic.Layer();
var layerTroy =  new Kinetic.Layer();


var telonIz = new Image();
var telonDer = new Image();
var logoIMG = new Image();
var troyIMG = new Image();
var telonTecho = new Image();

telonIz.src='img/telonIz.png';
telonDer.src='img/telonDer.png';


setTimeout(function(){
  logoIMG.src='img/logo.png';
},10)

setTimeout(function(){
  telonTecho.src='img/telonTecho1.png';
},60)

setTimeout(function(){
  troyIMG.src='img/troy.png';
},100)


function rota(bola)
{
  var angleDiff;
  var angle = 0;
  var iz = false;
  var angularSpeed = Math.PI / 4;
  var anim = new Kinetic.Animation(function(frame) {
      if(!iz && angle <0.15)
      {
          angleDiff = -(frame.timeDiff * angularSpeed / 3000);
      }
      else if(iz && angle >-0.15)
      {
          angleDiff = frame.timeDiff * angularSpeed / 3000;
      }
      bola.rotate(angleDiff);
      angle-=angleDiff;

      if(angle>=0.15)
      {
        iz=!iz;
      }
      else if(angle<=-0.15)
      {
        iz=!iz;
      }
  }, layer);
  anim.start();
}


var layer = new Kinetic.Layer();

var imgBola1 = new Image();
imgBola1.onload = function()
{
	  bola1 = new Kinetic.Image({
		x: stage.getWidth() / 9,
		y: 130,
		image:imgBola1,
		listening:true,
    offset: [75, 10],
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: 5,
    shadowOpacity: 0.1,
	});

	layer.add(bola1);

  stage.add(layer);
	rota(bola1);
}

var imgBola2 = new Image();
imgBola2.onload = function()
{
	  bola2 = new Kinetic.Image({
		x: (stage.getWidth() / 9)+230,
		y: 130,
		image:imgBola2,
		listening:true,
    offset: [75, 10],
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: 5,
    shadowOpacity: 0.1
	});

	layer.add(bola2);

  stage.add(layer);


	rota(bola2);
}

var imgBola3 = new Image();
imgBola3.onload = function()
{
	  bola3 = new Kinetic.Image({
		x: (stage.getWidth() / 9)+(230*2),
		y: 130,
		image:imgBola3,
		listening:true,
    offset: [75, 10],
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: 5,
    shadowOpacity: 0.1
	});

	layer.add(bola3);

  stage.add(layer);
  rota(bola3);

}

var imgBola4 = new Image();
imgBola4.onload = function()
{
	  bola4 = new Kinetic.Image({
		x: (stage.getWidth() / 9)+(230*3),
		y: 130,
		image:imgBola4,
		listening:true,
    offset: [75, 10],
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: 5,
    shadowOpacity: 0.1
	});

	layer.add(bola4);

  stage.add(layer);
  rota(bola4);

}

var imgBola5 = new Image();
imgBola5.onload = function()
{
	  bola5 = new Kinetic.Image({
		x: (stage.getWidth() / 9)+(230*4),
		y: 130,
		image:imgBola5,
		listening:true,
    offset: [75, 10],
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: 5,
    shadowOpacity: 0.1
	});

	layer.add(bola5);

  stage.add(layer);
  layer.setZIndex(200);
  layerTelon.setZIndex(500);

  rota(bola5);
}



var textpath = new Kinetic.Text({
  x: stage.getWidth()/4.5,
  y: stage.getHeight()/1.6,
  fill: 'black',
  scale:0,
  fontSize: '60',
  fontFamily: 'fuenteNavidad',
  text: 'DAW2A us desitja \n\n      Bon Nadal'
});

layer.add(textpath);

var period = 2000;
anim = new Kinetic.Animation(function(frame) {
  var scale = Math.sin(frame.time *2 / period) + 0.001;
  // scale x and y
  textpath.setScale(scale);
  if(scale>=1)
    anim.stop();
}, layer);



imgBola1.src='img/bola1.png';
imgBola2.src='img/bola2.png';
imgBola3.src='img/bola3.png';
imgBola4.src='img/bola4.png';
imgBola5.src='img/bola5.png';


