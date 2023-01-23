let input;
let img = null;
// frameTime is how much time (seconds) you want to jump from the current frame
let frameTime = 1;
let video_loaded = false;
let save_button;
let initialized_annotations = false;
// startX, startY --> starting corner; mX, mY --> ending corner
var mX=0;
var mY=0;
var startX=0;
var startY=0;
// isDrawing true refers to mouse down state, false refers to mouse released state
var isDrawing=false;
// holds annotations for the "frames" in the video, where "frames" len is video duration / frameTime
var annotations = [];
var i;
// the current "frame" we are annotation. This is what is drawn on the screen 
var curr_annotation = 0;

// create canvas, get video file 
function setup() {
  createCanvas(640, 480);
  input = createFileInput(handleFile);
  input.position(0, 0);
  save_button = createButton('save annotations');
  save_button.position(0, 500);
  save_button.mousePressed(save_annotations);
}

function draw() {
  if (video_loaded) {
    image(img, 25, 25, width, height);
    // initializes the annotations array once... 
    //is there a better way to do this? I tried putting in setup but ran into annotations variable and RECT function not being loaded yet 
    if ((!initialized_annotations && img.duration()) ){
      initialize_annotations();
      initialized_annotations = true;
      //console.log(annotations);
    }else{
      
      if(initialized_annotations){
        //if there is an annotation will draw it, ottherwise draws 0 area rectangle
        drawRect(annotations[curr_annotation].startX, annotations[curr_annotation].startY, annotations[curr_annotation].width, annotations[curr_annotation].height);
        //tracks mouse if pressed down and updates users current rectangle for user to see
        if (isDrawing==true){
          startX = mX;
          startY = mY;
          if (mX > mouseX){
            startX = mouseX;
          }
          if (mY > mouseY) {
            startY = mouseY;
          };    
          drawRect(startX, startY, abs(mouseX-mX), abs(mouseY-mY));
        }
      }
    }
  }
}
// creates annotation array with 0 size rectangles for each "frame"
function initialize_annotations(){
  curr_t = frameTime;
  console.log(img.duration());
  while(curr_t <= img.elt.duration){
    r = new Rect(0,0,0,0,curr_t);
    annotations.push(r);
    curr_t += frameTime;
    //console.log(curr_t);
  }
  
}
// this function took too long to figure out - _ -
function handleFile(file) {
  if (file.type === 'video') {
    img = createVideo(file.data, '');
    img.hide();
    img.elt.currentTime = frameTime;
    video_loaded = true;
  } else {
    img = null;
  }
}
// modifies thte curr annotation index
function keyPressed(){
    if(video_loaded){
        // idk if this is needed
        img.elt.paused 
        if (keyCode === LEFT_ARROW) { //left arrow
            //one frame back
            img.elt.currentTime = Math.max(0, img.elt.currentTime - frameTime);
            curr_annotation = Math.max(0,curr_annotation-1);
        } else if (keyCode == RIGHT_ARROW) { //right arrow
            //one frame forward
            //Don't go past the end, otherwise you may get an error
            img.elt.currentTime = Math.min(img.elt.duration, img.elt.currentTime + frameTime);
            curr_annotation = Math.min(annotations.length-1, curr_annotation+1);
        } else if (keyCode === BACKSPACE){
          // resets the annotation at the current index
          r = new Rect(0,0,0,0,curr_t);
          annotations[curr_annotation] = r;
        }
    }
}     

function Rect(startX, startY, width, height, frame) {
    this.startX = startX; 
    this.startY = startY; 
    this.width = width;
    this.height = height;
    // the video time for the frame. will be an increment of frameTime
    this.frame = frame;
}
// enters drawing true when mouse pressed  
function mousePressed(){
    if(video_loaded){
        if (isDrawing==false){
            mX = mouseX;
            mY = mouseY;
        }

        isDrawing = true;
    }
 }
// enters drawing false when mouse released
function mouseReleased(){
    if(video_loaded){
      if (mX > mouseX ){
        startX = mouseX;
      } 
      if(mY > mouseY){
        startY = mouseY;
      }
      drawRect(startX, startY, abs(mouseX-mX), abs(mouseY-mY));
      r = new Rect(startX, startY, abs(mouseX-mX),abs(mouseY-mY), img.elt.currentTime);
      annotations[curr_annotation] = r;
      isDrawing = false;
    }
    isDrawing = false;
        
  }
  
function drawRect(startX, startY, width, height){  
    if(video_loaded){
        rectMode(CORNER);
        fill(255,255,255,50);
        stroke(255);
        rect(startX, startY, width, height);
    }
  }
  
function save_annotations(){
    ans = JSON.stringify(annotations);
    saveJSON(ans, input.value().split('\\').pop().split('/').pop().split(".").shift());
}
