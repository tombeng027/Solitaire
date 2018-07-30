export class Card {
    suit: string;
    rank: number;
    color: string;
    facedown: boolean;
    imgsrc: string;

    constructor (char: string, num: number){
      this.suit = char;
      this.rank = num;
      this.facedown = true;
      if (char == 'D' || char == 'H'){
        this.color = 'Red';
      }
      else{
        this.color = 'Black';
      }
      this.imgsrc = "../assets/" + num + char + ".png";
    }

    setFaceDown(){
      this.facedown = true;
    }

    Flip(){
      this.facedown = false;
    }

    getImgSrc(): string{
      if(this.facedown){
        return "../assets/back.png";
      }else{
        return "../assets/" + this.rank + this.suit + ".png";
      } 
    }

    toString(): String{
      return this.rank + "" + this.suit;
    }
  }

  