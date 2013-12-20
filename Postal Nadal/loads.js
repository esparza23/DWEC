var animTelIz,animTelDer;

telonIz.onload = function()
{
    var telIz = new Kinetic.Image({
    x: 0,
    y: 0,
    image:telonIz
  });
  layerTelon.add(telIz);
  stage.add(layerTelon); 

  animTelIz = new Kinetic.Animation(function(frame) {
    telIz.setX(telIz.getX()-3);
    if(telIz.getX() < -700)
      animTelIz.stop();
  }, layerTelon);
}

telonDer.onload = function()
{
    var telDer = new Kinetic.Image({
    x: stage.getWidth() / 2,
    y: 0,
    image:telonDer
  });
  layerTelon.add(telDer);
  stage.add(layerTelon); 

  animTelDer = new Kinetic.Animation(function(frame) {
    telDer.setX(telDer.getX()+3);
    if(telDer.getX() > 1200)
      animTelDer.stop();
  }, layerTelon);
}

logoIMG.onload = function()
  {
    var logo = new Kinetic.Image({
      x: stage.getWidth() / 2+100,
      y: 350,
      scale:0,
      image:logoIMG
    });
    layerTelon.add(logo);
    stage.add(layerTelon); 
 
    
    animLogo1 = new Kinetic.Animation(function(frame) {
      //console.log(logo.getScale());
      if(logo.getScaleX(logo.getScaleX())<=1){
        logo.setScaleX(logo.getScaleX()+0.01);
        logo.setScaleY(logo.getScaleY()+0.01);
      }
    }, layerTelon);
    animLogo1.start();

    logo.on('click', function(evt) {
      console.log("hola");
    });


    animLogo = new Kinetic.Animation(function(frame) {
      logo.setX(logo.getX()+3);
      if(logo.getX() > 1200)
        animLogo.stop();
    }, layerTelon);
  }

  troyIMG.onload = function()
  {
    var troy = new Kinetic.Image({
      x: 150,
      y: 300,
      width:450,
      height:306,
      listening:true,
      image:troyIMG
    });

    layerTroy.add(troy);
    stage.add(layerTroy); 

    layerTroy.setZIndex(1000);

    animTroy = new Kinetic.Animation(function(frame) {
      troy.setX(troy.getX()-5);
      if(troy.getX() < -600)
        animTroy.stop();
    }, layerTroy);

    setTimeout(function(){
      troy.on('click', function(evt) {
        animTroy.start();
        animTelDer.start();
        animTelIz.start();
        animLogo.start();
        setTimeout(function(){
          anim.start();
        },3000);
      });
    },4000);
  }

  telonTecho.onload = function()
  {
      var telTecho = new Kinetic.Image({
      x: 0,
      y: 0,
      image:telonTecho
    });

    layerTecho.add(telTecho);

    stage.add(layerTecho);
  }