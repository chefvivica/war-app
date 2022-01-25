export class Game {
    constructor() {
        this.deck = new Deck();
        this.bot = new Player();
        this.user = new Player();  //user is you as a player, a player instance
        this.tableCards = [];


    }

    //method to get a new Deck
    getDeck() { return this.deck }

    // method to shuffle the 52 cards at the begining of the game
    shuffle() {
        let len = this.deck.cards.length;
        let i;
        while (len) {
            i = Math.floor(Math.random() * len--);
            //swap
            [this.deck.cards[len], this.deck.cards[i]] = [this.deck.cards[i], this.deck.cards[len]]
        }
        return this.deck.cards
    }

    // method to deal the deck into two player, each one has 26 cards
    deal() {
        const len = this.deck.cards.length
        const mid = Math.floor(len / 2);
        const left = this.deck.cards.slice(0, mid)
        const right = this.deck.cards.slice(mid, len)

        this.bot.hand = left;
        this.user.hand = right;
        return null;
    }

    getUserName() { return this.user.username };
    getUserScore() { return this.user.score };
    getBotScore() { return this.bot.score }

    getCurrentCard() {
        this.user.getCard();
        this.bot.getCard();
        this.tableCards.push(this.user.currentCard, this.bot.currentCard)
        return null

    }

    war() {
        this.user.handleWar()
        this.bot.handleWar()
        let last = this.user.warCardStack.length - 1
        this.user.currentCard = this.user.warCardStack[last]
        this.bot.currentCard = this.bot.warCardStack[last]
        for (let i of this.user.warCardStack) {
            this.tableCards.push(i)
        }

        for (let i of this.bot.warCardStack) {
            this.tableCards.push(i)
        }
        return null
    }

    compareCards() {
        if (this.user.currentCard.value > this.bot.currentCard.value) {
            for (let i of this.tableCards) {
                this.user.hand.push(i)
                this.takeCards()
            }

        } else if (this.user.currentCard.value < this.bot.currentCard.value) {
            for (let i of this.tableCards) {
                this.bot.hand.push(i)
                this.takeCards()
            }
        } else {
            this.war()
        }
        return null
    }

    takeCards() {
        this.tableCards = []
        return null
    }




    startGame() {
        this.getDeck()
        this.shuffle()
        this.deal()
        return null
    }

}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(
                    new Card(value, suit)
                )
            }
        }
    }

}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.face = value;
        this.suit = suit;
        if (this.value === 11) this.face = 'J';
        if (this.value === 12) this.face = 'Q';
        if (this.value === 13) this.face = 'K';
        if (this.value === 14) this.face = 'A';
    }

    showValue() { return this.value }
    showFace() { return this.face }
    showSuit() { return this.suit }
}
class Player {
    constructor() {
        this.hand = [];
        this.username = "";
        this.score = 0;
        this.warCardStack = []
        this.currentCard = new Card();
    }

    getCard() {
        let top = this.hand.shift()//remove the top one from the hand array
        this.currentCard = top;
        return this.currentCard;
    }

    handleWar() {
        this.warCardStack = this.hand.slice(0, 1);
        return this.warCardStack;

    }

}

// const game = new Game();
// game.getDeck()
// // game.shuffle()
// game.deal()

// console.log("user Hand before getCard: ", game.user.hand, "len: ", game.user.hand.length)
// console.log("bot hand before getCard: ", game.bot.hand, "len: ", game.bot.hand.length)
// // console.log(game.user.hand)
// game.getCurrentCard()
// console.log("table card: ", game.tableCards)
// game.compareCards()
// // game.getCurrentCard()
// console.log("user Hand after getCard: ", game.user.hand, "len: ", game.user.hand.length)
// console.log("bot hand: after getCard", game.bot.hand, "len: ", game.bot.hand.length)
// console.log("after compare table card: ", game.tableCards)
// // game.takeCards()
// // game.compareCards()
// // console.log("user hand:   ", game.user.hand)
// // console.log("bot hand:   ", game.bot.hand)
// console.log(game.user.currentCard, game.bot.currentCard)
// console.log("after takeCards table card: ", game.tableCards)



// game.startGame()
// console.log(game.user.score)
