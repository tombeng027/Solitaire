import { Injectable } from '@angular/core';
import { foundation } from './foundation';
import { maneuver, run, pile1, pile4, pile3, pile2, pile5, pile6, pile7 } from './maneuver';
import { Card } from './card';
import { wastepile } from './deck';
import { Cards } from './deck';
import { MessageService } from './message.service';
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class Manserv {
  from: number;
  index:number;
  card: Card;
  win: number = 52;
  total:number = 0;
  message: string = "Your last move was invalid";
  fromwaste: number = 0;
  score:number = 0;
  scoreboard:string;


  constructor(private messageService: MessageService) { }

  allowDrop(ev) {
    ev.preventDefault();
  }

  moveToPile(ev,to:number): void {
    ev.preventDefault();
    if(this.fromwaste == 0){
     if((maneuver[to].length == 0 && this.card.rank == 13)||
     (this.card.rank == this.getRank(maneuver,to) - 1 && 
     !(this.card.color == this.getColor(maneuver,to)))){
          while(this.index<maneuver[this.from].length){
            run.push(maneuver[this.from].pop());         
            this.getMoveLog(1);
          }
          if(!(maneuver[this.from].length==0)){
            maneuver[this.from][maneuver[this.from].length-1].Flip();
          }
          while(run.length != 0){
             maneuver[to].push(run.pop());            
             this.getMoveLog(1);
          }  
      }else{
        this.getMoveLog(0);
      }
    }else{
      if(!(wastepile.length == 0) && (this.card.rank == 13 && maneuver[to].length == 0) ||
       (this.getRank(maneuver,to) == this.card.rank + 1 && 
       !(this.getColor(maneuver,to) == this.card.color))){
        maneuver[to].push(wastepile.pop());        
        this.getMoveLog(1);
      }else{
        this.getMoveLog(0);
      }
    }
    this.fromwaste = 0;
    this.clear();
  }
  
  getRun(from: number, card: Card,int: number): void {
    this.clear();
    if(int == 1){
      this.fromwaste = 1
      this.card = wastepile[wastepile.length -1];
      this.index = wastepile.indexOf(card);
    }else{
      if(!card.facedown){
        this.from = from;
        this.card = card;
        this.index = maneuver[from].indexOf(card);
      }
    }
    console.log(this.card)
  }

  clear(): void{
      this.from = undefined;
      this.card = undefined;
      this.index = undefined;
  }

  getRank(man : Card[][],index: number): number{
      return  man[index][man[index].length-1].rank;
  }

  getColor(man : Card[][],index: number):string{
      return  man[index][man[index].length-1].color;
  }

  moveToFoundation(ev,int: number): void {
    ev.preventDefault();
    if(this.fromwaste == 0){
        if(foundation[int].length == 0 && maneuver[this.from][maneuver[this.from].length-1].rank == 1){
          foundation[int].push(maneuver[this.from].pop());
          this.getMoveLog(1);
          if(!(maneuver[this.from].length==0)){
            maneuver[this.from][maneuver[this.from].length-1].Flip();
          }
        }else if(this.card.suit == foundation[int][foundation[int].length-1].suit && 
          this.card.rank == (foundation[int][foundation[int].length-1].rank + 1)){
          foundation[int].push(maneuver[this.from].pop());
          this.getMoveLog(1);
          if(!(maneuver[this.from].length==0)){
            maneuver[this.from][maneuver[this.from].length-1].Flip();
          }
        }else{
          this.getMoveLog(0);
        }
    }else{
        if(foundation[int].length == 0 && this.card.rank == 1){
          foundation[int].push(wastepile.pop());          
          this.getMoveLog(1);
        }else if(this.card.suit == foundation[int][foundation[int].length-1].suit &&
           this.card.rank == (foundation[int][foundation[int].length-1].rank + 1)){
          foundation[int].push(wastepile.pop());          
          this.getMoveLog(1);
        }else{
          this.getMoveLog(0);
        }  
    }
    this.fromwaste = 0;
    this.clear();
    
    this.winGame(); 
  }

  winGame(): void{
    for(let x = 0; x < 4;x++){
      this.total += foundation[x].length;
    }
    if(this.win == this.total){
        this.total = 0;
        this.congratulate();
        document.getElementById("scoreboard").innerHTML = this.scoreboard;
    }   
  }

  congratulate(): void {
    document.getElementById("modal").style.display = "block";
    this.score +=1; 
    this.scoreboard = "You won " + this.score + " times.";
  }
  
  /* function to force win conditions: to use call at the
  end of the move to foundation function before the wingame check*/

  moveall(): void{
    while (wastepile.length > 0){
      foundation[0].push(wastepile.pop());
    }
    while(Cards.length > 0){
      foundation[1].push(Cards.pop());
    }
    for(let x = 0; x < 7; x++){
      while(maneuver[x].length > 0){   
          foundation[2].push(maneuver[x].pop());
      }
    }
  }

  getMoveLog(int: number):void {
    if(int == 0){
      document.getElementById("message").innerHTML = this.message;
      this.clear();
    }else{
      document.getElementById("message").innerHTML = this.message.substring(0,19) + this.messageService.lastMove(this.card);
    }
  }
}


