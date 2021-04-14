class Game{
    constructor(){

    }
    getState(){
        var gamestateref = database.ref('gameState');
        gamestateref.on('value',function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameState:state,

        });
    }
    async start(){
        if(gameState===0){
            player= new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
                
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car2 = createSprite(300,200);
        car3 = createSprite(500,200);
        car4 = createSprite(700,200);
        cars = [car1,car2,car3,car4];
        car1.addImage(car1_img);
        car2.addImage(car2_img);
        car3.addImage(car3_img);
        car4.addImage(car4_img);

    }
    play(){
        form.hide();
       // textSize(30);
        //text("GAME START",120,100);
        Player.getPlayerInfo();
        console.log(allPlayers);
        if(allPlayers!==undefined){
            background(ground);
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
        //    var display_position = 130;
        var index = 0;
        var x = 175;
        var y = 0;

            for(var plr in allPlayers){
                index = index+1;
                x = x+200;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                console.log(allPlayers[plr].name);
                if(index === player.index){
                    strokeWeight(7);
                    stroke("red");
                    ellipse(x,y,60,60);
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                    fill("white");
                    text(allPlayers[plr].name,cars[index-1].x-15,cars[index-1].y-50);
                }
                
                
            //   display_position += 20;
            //   textSize(15);
            //  text(allPlayers [plr].name + ":" + allPlayers [plr].distance , 120,display_position);
            }
            
            
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();

        }
        if(player.distance>3800){
            gameState=2;
        }
        drawSprites();
    }
    end(){
        console.log("ENDED");
    }

}