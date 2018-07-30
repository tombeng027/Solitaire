import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  rank: string;
  suit: string;
  message: string;
  rankname: string[] = ['joker','ace','two',
                        'three','four','five',
                        'six','seven','eight',
                        'nine','ten','jack',
                        'queen','king'
  ];

  constructor() { }

  lastMove(card: Card): string {
    if(card != undefined){
    this.rank = this.rankname[card.rank];
    switch(card.suit){
      case 'D':
        this.suit = '♦';
        break;
      case 'H':
        this.suit = '♥';
        break;
      case 'S':
        this.suit = '♠';
        break;
      default:
        this.suit = '♣';
    }
    this.message = this.rank + " of " + this.suit;
    }
    return this.message;
  }
}
