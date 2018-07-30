import { Component } from '@angular/core';
import { DeckService } from './deck.service';
import { Manserv } from './maneuver.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Solitaire';

  constructor(private deckservice: DeckService, private manserv: Manserv){}

  clearTable(): void{
    this.deckservice.clearTable();
  }

  replay(): void{
    document.getElementById("modal").style.display = "none";
    this.clearTable();
  }
  
}
