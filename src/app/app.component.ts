import { Component, OnInit } from '@angular/core';
import {  ChangeDetectorRef  } from "@angular/core"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //constructor(private cd: ChangeDetectorRef ){}
   box= [
    [0,1,2,3,4,5,6],
    [7,8,9,10,11,12,13],
    [14,15,16,17,18,19,20],
    [21,22,23,24,25,26,27],
    [28,29,30,31,32,33,34],
    [35,36,37,38,39,40,41]
  ];
  box2= [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  
  monitor:any;
  chosen:any;
  animator:any;
  rowanimator:any;
  circle="whiteCircle";
  blur="red";
  oasis="blue";
  turn="red";
  tap=1;
  checker=1;
  reset:any;
  winnerSlot1:any; winnerSlot2:any; winnerSlot3:any; winnerSlot4:any;
  ngOnInit(): void {
    //console.log(this.box);
  }

  click(event:any,i:number,j:number){
    if (this.tap==0) return;
console.log (this.box2[0][0]);
//    this.chosen=event.target;
    
    for (let a=0; a<6; a++){
      if (this.box2[5-a][j] == 0) {
        this.turn=="red"? this.box2[5-a][j]=1:this.box2[5-a][j]=2;
        this.chosen=this.box[5-a][j];
        this.rowanimator=0;
        this.tap=0;
        this.playanim(a,j);
        return;
      }
    }
    
  }

playanim(a:any,j:any){
      
            this.animator=this.box[this.rowanimator][j];
            document.getElementById(this.animator).style.backgroundColor=this.turn;

            setTimeout(() => {
              document.getElementById(this.animator).style.backgroundColor="white";
              this.rowanimator++;
              if (this.rowanimator==(6-a)) {
               
                document.getElementById(this.chosen).style.backgroundColor=this.turn;
                if (this.turn==this.blur) {this.turn=this.oasis; this.checker=1;} else {this.turn=this.blur;this.checker=2;}
                this.checkVertical();
            
                return;
              }
              else {     
                this.playanim(a,j);
              }
            }, 60);
}

checkVertical(){
  for (let i=0; i<3; i++){
    for (let j=0; j<6; j++){
    if (this.box2[i][j]==this.checker && this.box2[i+1][j]==this.checker && this.box2[i+2][j]==this.checker && this.box2[i+3][j]==this.checker)
      {
        this.winnerSlot1=this.box[i][j]; this.winnerSlot2=this.box[i+1][j]; this.winnerSlot3=this.box[i+2][j]; this.winnerSlot4=this.box[i+3][j];
        this.winner();
        this.tap=0;
        return;
      }
    
    }
  }
  this.checkHorizontal();
}

checkHorizontal(){
  for (let i=0; i<6; i++){
    for (let j=0; j<4; j++){
    if (this.box2[i][j]==this.checker && this.box2[i][j+1]==this.checker && this.box2[i][j+2]==this.checker && this.box2[i][j+3]==this.checker)
      {
        this.winnerSlot1=this.box[i][j]; this.winnerSlot2=this.box[i][j+1]; this.winnerSlot3=this.box[i][j+2]; this.winnerSlot4=this.box[i][j+3];
        this.winner();
        this.tap=0;
        return;
      }
   
    }
  }
  this.checkSlantRight();
}

 checkSlantRight(){
  for (let i=0; i<3; i++){
    for (let j=0; j<4; j++){
    if (this.box2[i][j]==this.checker && this.box2[i+1][j+1]==this.checker && this.box2[i+2][j+2]==this.checker && this.box2[i+3][j+3]==this.checker)
      {
        this.winnerSlot1=this.box[i][j]; this.winnerSlot2=this.box[i+1][j+1]; this.winnerSlot3=this.box[i+2][j+2]; this.winnerSlot4=this.box[i+3][j+3];
        this.winner();
        this.tap=0;
        return;
      }
   
    }
  }
  this.checkSlantLeft();
}
checkSlantLeft(){
  for (let i=0; i<3; i++){
    for (let j=3; j<7; j++){
    if (this.box2[i][j]==this.checker && this.box2[i+1][j-1]==this.checker && this.box2[i+2][j-2]==this.checker && this.box2[i+3][j-3]==this.checker)
      {
        this.winnerSlot1=this.box[i][j]; this.winnerSlot2=this.box[i+1][j-1]; this.winnerSlot3=this.box[i+2][j-2]; this.winnerSlot4=this.box[i+3][j-3];
        this.winner();
        this.tap=0;
        return;
      }
      else {
        this.tap=1;
        this.turn=="blue"? document.getElementById("monitor").innerHTML="Oasis, your turn." : document.getElementById("monitor").innerHTML="Blur, your turn.";
        this.tide();
      }
    }
  }
}

winner(){
  if (this.turn=="blue") {
    this.turn="red"; 
    document.getElementById("monitor").innerHTML="BLUR WON YEAH!";
  } else {
    this.turn="blue";
    document.getElementById("monitor").innerHTML="OASIS, LIVE FOREVER!";
  }
  //this.turn=="blue"? document.getElementById("monitor").innerHTML="BLUR WON YEAH!" : document.getElementById("monitor").innerHTML="OASIS, LIVE FOREVER!";
  let timer=200;
  for (let i=0; i<5; i++){
    setTimeout(() => {
      document.getElementById(this.winnerSlot1).style.backgroundColor="white";
      document.getElementById(this.winnerSlot2).style.backgroundColor="white";
      document.getElementById(this.winnerSlot3).style.backgroundColor="white";
      document.getElementById(this.winnerSlot4).style.backgroundColor="white";
      setTimeout(() => {
      document.getElementById(this.winnerSlot1).style.backgroundColor=this.turn;
      document.getElementById(this.winnerSlot1).style.borderColor="yellow";
      document.getElementById(this.winnerSlot2).style.backgroundColor=this.turn;
      document.getElementById(this.winnerSlot2).style.borderColor="yellow";
      document.getElementById(this.winnerSlot3).style.backgroundColor=this.turn;
      document.getElementById(this.winnerSlot3).style.borderColor="yellow";
      document.getElementById(this.winnerSlot4).style.backgroundColor=this.turn;
      document.getElementById(this.winnerSlot4).style.borderColor="yellow";
      }, 100);
    }, timer);
    timer=timer+200;
  }

}

newGame(){
  this.tap=1;
  this.checker=1;
  this.turn="red";
  this.box2= [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  for (let i=0; i<6; i++){
    for (let j=0; j<7; j++){
      this.reset = this.box[i][j];
      document.getElementById(this.reset).style.backgroundColor="white";      
      document.getElementById(this.reset).style.borderColor="transparent";
    }
  }

  document.getElementById("monitor").innerHTML="Blur, you go first.";
}

tide(){
  let counter=0;
  for (let j=0; j<7; j++){
    if (this.box2[0][j] !=0) counter++;
  }
  if (counter==7) {
    this.tap=0;
    document.getElementById("monitor").innerHTML="Radiohead's coming...";
  }

}

}
