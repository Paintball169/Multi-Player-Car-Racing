class Game{
    constructor(){}

    getState(){
        var gamestateRef= database.ref('gamestate');
        gamestateRef.on("value",function(data){
            gamestate=data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gamestate:state
        })
    }

    async start(){
        if(gamestate===0){
            player=new Player();
            var playerCountRef= await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount= playerCountRef.val();
                player.getCount();
            }
            form=new Form();
            form.display();
        }
        
        car1=createSprite(100,200);
        car2=createSprite(300,200);
        car3=createSprite(500,200);
        car4=createSprite(700,200);
        car1.addImage("car_1",c1);
        car2.addImage("car_2",c2);
        car3.addImage("car_3",c3);
        car4.addImage("car_4",c4);
        cars=[car1,car2,car3,car4];
    }

    play(){
         
        form.hide();
        textSize(25);
        text("Game Start",120,100);
        Player.getPlayerInfo();
        Player.getCarsAtEnd();

        if(allPlayers !== undefined){
            background("yellow");
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
          // var display_position=130;
          var index=0;
          var x= 175,y;

           for(var plr in allPlayers){
               index=index+1;
               x=x+200;
               y=displayHeight-allPlayers[plr].distance;
               cars[index-1].x=x;
               cars[index-1].y=y;

               if(index===player.index){
                   stroke(10);
                   fill("red");
                   ellipse(x,y,60,60);
                   cars[index-1].shapeColor="red";
                   camera.position.x=displayWidth/2;
                   camera.position.y=cars[index-1].y;
               }
               if(plr === "player" + player.index)
               fill("red")
               else
               fill("black")
           
             /* display_position+=20;
              textSize(15);
              text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position);*/
            }
        }

        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance+=50
            player.update();
        }
        if(player.distance>3860){
            gamestate=2;
            player.rank +=1
            Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }
    
    end(){
        console.log("game ended");
        console.log(player.rank);
    }
}