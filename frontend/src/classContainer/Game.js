export class Game {
    constructor() {
        this.deck = new Deck();
        this.bot = new Player("bot");
        this.user = new Player("user");  //user is you as a player, a player instance
        this.tableCards = [];
        this.status = "";
    }
    // method to shuffle the 52 cards at the begining of the game
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
    //combine shuffle and deal function to quick start the game
    startGame() {
        this.shuffle()
        this.deal()
    }
    playTopCard() {
        this.user.removeTopCard();
        this.bot.removeTopCard();
        this.tableCards.push(this.user.currentCard, this.bot.currentCard)
        return null
    }


    war() {
        const userWarCardStack = this.user.removeTwoCards()
        const botWarCardStack = this.bot.removeTwoCards()
        console.log("WAR", userWarCardStack, botWarCardStack);
        if (!(userWarCardStack && botWarCardStack)) { // players have 2+ cards
            this.tableCards.push(...userWarCardStack, ...botWarCardStack)
            console.log("War table", this.tableCards);
            if (userWarCardStack.at(-1).value > botWarCardStack.at(-1).value) {
                this.user.hand.push(...this.tableCards)
                this.status = "User Won"
            } else if (botWarCardStack.at(-1).value > userWarCardStack.at(-1).value) {
                this.bot.hand.push(...this.tableCards)
                this.status = "Bot Won"
            } else {
                this.war()
            }

        }
        else { // one of the players doesn't have enough cards for war
            this.status = "Over"
        }
    }
    compareCards() {
        if (this.user.currentCard.value > this.bot.currentCard.value) {
            for (let i of this.tableCards) {
                this.user.hand.push(i)
                this.status = "User Won"

            }
        } else if (this.user.currentCard.value < this.bot.currentCard.value) {
            for (let i of this.tableCards) {
                this.bot.hand.push(i)
                this.status = "Bot Won"
            }
        } else {
            this.war()
            this.status = "War"

        }
        return null
    }

    clearTable() {
        this.tableCards = []
        return null
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ["Hearts", "Spades", "Diamonds"];
        const values = [2, 3, 4, 5];
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
        this.score = 0;
        this.warCardStack = []
        this.currentCard = undefined;
    }

    removeTopCard() {
        this.currentCard = this.hand.shift()
    }

    removeTwoCards() {
        if (this.hand.length < 2) return null
        else {
            this.warCardStack = this.hand.splice(0, 2);
            return this.warCardStack
        }

    }

}
