import { Injectable } from '@angular/core';
import { Card } from './card';
import { Cards } from './deck';
import { maneuver } from './maneuver';
import { wastepile } from './deck';
import { foundation } from './foundation';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  Deck = Cards;
  draw:number;
  constructor() { }
  
  createDeck(): Card[] {
    var x;
    for(x=1;x<14;x++){
      this.Deck.push(new Card("D", x))
    }
    for(x=1;x<14;x++){
      this.Deck.push(new Card("H", x))
    }
    for(x=1;x<14;x++){
      this.Deck.push(new Card("S", x))
    }
    for(x=1;x<14;x++){
      this.Deck.push(new Card("C", x))
    }
    this.shuffle();
    return this.Deck;
  }

  shuffle(): Card[] {
    var currentIndex = this.Deck.length;
    var temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = this.Deck[currentIndex];
      this.Deck[currentIndex] = this.Deck[randomIndex];
      this.Deck[randomIndex] = temporaryValue;
    }
    return this.Deck;
  }

  distributeCards(): void {
    let z = 0; let x;
    let i;
  
      while (z < 7) { // TODO fixed set field should distribute 1 card per
        // pile not put 7 in one pile then next pile
        i = z;
        x = z + 1;
        while (i < 7) {
           maneuver[i].push(this.Deck.pop());
          i++;
        }
        if (x > 6) {
          break;
        }
        z++;
      }
      for(let v = 0; v < 7; v++){
          maneuver[v][maneuver[v].length-1].Flip();
      }
  }

  drawCard(): void{

    if(this.Deck.length == 0){
      while(!(wastepile.length == 0)){
        wastepile[wastepile.length-1].setFaceDown();
        this.Deck.push(wastepile.pop());
      }
    }else{
      for(let c = 0; c < this.draw; c++){
          if(!(this.Deck.length == 0)){
            this.Deck[this.Deck.length-1].Flip();
            wastepile.push(this.Deck.pop());
          }else{
            break;
          }
      }   
    }
  }

  newGame(int: number): void{
    this.draw = int;
    this.clearTable();
    this.createDeck();
    this.distributeCards();
  }

  clearTable(){
    while(!(Cards.length == 0)){
      Cards.pop();
    }
    while(!(wastepile.length == 0)){
      wastepile.pop();
    }
    for(let x = 0; x < 7; x++){
      while(!(maneuver[x].length == 0)){
        maneuver[x].pop();
      } 
    }
    for(let x = 0; x < 4; x++){
      while(!(foundation[x].length == 0)){
        foundation[x].pop();
      }
    }
  }
}
