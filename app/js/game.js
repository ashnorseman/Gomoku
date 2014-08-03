/**
 * Game
 * ----
 * Combination
 */

var Gomoku = Gomoku || {};

Gomoku.Game = Backbone.View.extend({

  initialize: function () {
    var boardCollection = new Gomoku.BoardCollection(new Array(Gomoku.BOARD_SIZE * Gomoku.BOARD_SIZE)),

        boardView = new Gomoku.BoardView({
          collection: boardCollection
        });

    // Link
    boardCollection.game = this;

    this.currentPlayer = 1;
    this.currentSequence = 1;

    // Elements
    this.$board = $('#gmk-board');
    this.$board.append(boardView.$el);
  },

  switchPlayer: function () {

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }

    this.currentSequence = this.currentSequence + 1;
  }
});

new Gomoku.Game();
