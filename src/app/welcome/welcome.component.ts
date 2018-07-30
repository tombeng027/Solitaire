import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  constructor(private deckservice: DeckService) { }

  ngOnInit() {
  }

  newGame(int: number){
    this.deckservice.newGame(int);
  }

}
