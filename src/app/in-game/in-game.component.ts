import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { DeckService } from '../deck.service';
import { maneuver } from '../maneuver';
import { Manserv } from '../maneuver.service';
import { wastepile } from '../deck';
import { Cards } from '../deck';
import { foundation } from '../foundation';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.css']
})
export class InGameComponent implements OnInit {
  deck = Cards;
  last: number;
  topofdeck: String;
  empty = "../assets/empty.png";
  back = "../assets/back.png";
  
  maneuver = maneuver;
  
  waste = wastepile;

  constructor(
    private deckservice: DeckService, 
    private manserv: Manserv,
  ){}
  
  ngOnInit(){

  }

  getImgSrc(cards: Card[],int: number): string{ 
    if(cards.length == 0){
      return this.empty;
    }else{
      if(int == 0){
        return cards[cards.length-1].getImgSrc();
      }else if (int == 1){
        if(cards[cards.length-2] == undefined){
          return this.empty;
        }else
        return cards[cards.length-2].getImgSrc();
      }else{
        if(cards[cards.length-3] == undefined){
          return this.empty;
        }else
        return cards[cards.length-3].getImgSrc();
      }
    }
  }

  getFoundSrc(int: number): string{
        if(foundation[int].length == 0){
          return this.empty;;
        }
        return foundation[int][foundation[int].length-1].imgsrc;
  }

  
}
