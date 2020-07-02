var canavs, button1;
var database;
var gameState = 0;
var playerCount;
var form, player, game;
var allPlayers;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
    
    database = firebase.database()
    background("white");

    var adaRef = database.ref('drawing');
    adaRef.remove();

    this.button1 = createButton('Clear drawing');
    this.button1.position(400, 550);

    //var clearbutton = select('#clearbutton');

    //clearbutton.mousePressed(clearDrawing);
    
    game = new Game();
    game.getState();
    game.start();

}

var dbpoints = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })

}

function draw() {
    readData()
    beginShape();
    stroke("green");
    strokeWeight(2);
    noFill();
    for (var i = 0; i < dbpoints.length; i++) {
        vertex(dbpoints[i].x, dbpoints[i].y);
        endShape();
    }
    endShape();

    if(playerCount == 3){
        game.update(1);
      }
    
      if(gameState ==1){
         game.play();
      }

      this.button1.mousePressed(()=>{
        dbpoints = [];
        var adaRef = database.ref('drawing');
        adaRef.remove();
        
        clear();
    });
}


function readData() {
    database.ref('drawing/').on('value', (data) => {
        dbpoints = data.val().d
    });
}


// function clearDrawing() {

// }

/*function clearDrawing() {
    dbpoints = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}*/

