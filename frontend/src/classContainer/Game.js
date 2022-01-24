
export class Deck {
    constructor(){
        this.cards = [];
        const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
        const values = ["A", 2,3,4,5,6,7,8,9,10, "J", "Q", "K"];

        for (let suit in suits){
            for (let value in values){
                this.cards.push(`${values[value]} of ${suits[suit]}`)
            }
        }
    }

    shuffle(){
        let len  = this.cards.length;
        let i;
        while(len) {
            i = Math.floor(Math.random() * len--);
            //swap
            [this.cards[len], this.cards[i]] = [this.cards[i], this.cards[len]]
        }
        console.log(this.cards);
        return this.cards
    }
}

export class Hand {
    constructor(){
        this.hand = [];
        this.username = "";
    }
}
