export class Game {
    constructor(name) {
        this.deck = new Deck();
        this.bot = new Player("bot");
        this.user = new Player(name);  //user is you as a player, a player instance
        this.tableCards = [];
        this.status = "";
    }
    shuffle() {
        let len = this.deck.cards.length;
        let i;
        while (len) {
            i = Math.floor(Math.random() * len--);
            //swap
            [this.deck.cards[len], this.deck.cards[i]] = [this.deck.cards[i], this.deck.cards[len]]
        }
        return null
    }
    deal() {
        const len = this.deck.cards.length
        const mid = Math.floor(len / 2);
        const left = this.deck.cards.slice(0, mid)
        const right = this.deck.cards.slice(mid, len)

        this.bot.hand = left;
        this.user.hand = right;
        return null;
    }
    //combine shuffle and deal function to quick start the game
    startGame() {
        this.shuffle()
        this.deal()
        this.user.username ? this.user.username = this.user.username : this.user.username = "Generic User"
    }
    playTopCard() {
        this.user.removeTopCards(1);
        this.bot.removeTopCards(1);
        this.tableCards.push(...this.user.currentCard, ...this.bot.currentCard)
        return null
    }
    war(pointer) {
        const userWarCardStack = this.user.removeTopCards(2)
        const botWarCardStack = this.bot.removeTopCards(2)

        if (!(userWarCardStack && botWarCardStack === null)) {// enough cards to play with war
            this.tableCards = [...userWarCardStack, ...botWarCardStack]

            if (userWarCardStack.at(-1).value > botWarCardStack.at(-1).value) {
                this.user.hand.push(...this.tableCards)
                this.status = "User Won"
            } else if (userWarCardStack.at(-1).value < botWarCardStack.at(-1).value) {
                this.bot.hand.push(...this.tableCards)
                this.status = "Bot Won"
            } else {
                return this.war(pointer += 2)
            }
        } else {// there is no enough cards to continue.
            this.status = "Over"
        }
        return null

    }
    compareCards() {
        if (this.user.hand.length === 0 || this.bot.hand.length === 0) {
            this.status = "Over"
        } else if (this.user.currentCard.at(-1).value > this.bot.currentCard.at(-1).value) {
            this.user.hand.push(...this.tableCards)
            this.status = "User Won";
        } else if (this.user.currentCard.at(-1).value < this.bot.currentCard.at(-1).value) {
            this.bot.hand.push(...this.tableCards);
            this.status = "Bot Won";
        } else {
            this.status = "War"
            this.war(0)
            return
        }
        return null
    }
    clearTable() {
        this.tableCards = []
        this.user.currentCard = []
        this.bot.currentCard = []
        return null
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = [
            "Hearts",
            "Spades",
            "Diamonds",
            "Clubs"
        ];
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
    constructor(username) {
        this.hand = [];
        this.username = username;
        this.score = 1;
        this.currentCard = [];
        this.message = ""
    }

    removeTopCards(howManyCards) {
        if (howManyCards === 1) {
            if (this.hand.length < 1) {
                this.score = 0;
                this.message = `${this.username} ran out of cards`
                return null;
            } else {
                this.currentCard.push(this.hand.shift());
            }
        }
        if (howManyCards === 2) {
            if (this.hand.length < 2) {
                this.score = 0;
                this.message = `${this.username} ran out of cards`
                return null;
            } else {
                this.currentCard.push(...this.hand.splice(0, 2));
            }
        }
        return this.currentCard


    }


}
