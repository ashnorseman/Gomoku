/**
 * Game
 * ----
 * Combination
 */

var Gomoku = Gomoku || {};

Gomoku.Game = Backbone.View.extend({

  events: {
    'click .gmk-start': 'startGame',
    'click .gmk-restart': 'startGame'
  },

  initialize: function () {
    this.$el = $('#gmk');

    this.setBoard();
    this.setPlayers();
    this.currentSequence = 1;
  },

  setBoard: function () {
    var boardCollection = new Gomoku.BoardCollection(new Array(Gomoku.BOARD_SIZE * Gomoku.BOARD_SIZE)),

        boardView = new Gomoku.BoardView({
          collection: boardCollection
        });

    // Link
    boardCollection.game = this;

    this.board = boardCollection;

    // Elements
    this.$board = $('#gmk-board');
    this.$board.append(boardView.$el);
  },

  setPlayers: function () {
    var player1Model = new Gomoku.PlayerModel({
          name: '李大妞',
          avatarSrc: 'images/player-ava-black.png',
          nameSrc: 'images/player-name-black.png',
          number: 1,
          stone: 1
        }),

        player2Model = new Gomoku.PlayerModel({
          name: '钟小宝',
          avatarSrc: 'images/player-ava-white.png',
          nameSrc: 'images/player-name-white.png',
          number: 2,
          stone: 2
        }),

        player1View = new Gomoku.PlayerView({
          model: player1Model
        }),

        player2View = new Gomoku.PlayerView({
          model: player2Model
        });

    // Link
    player1Model.game = this;
    player2Model.game = this;

    this.player1 = player1Model;
    this.player2 = player2Model;
    this.currentPlayer = player1Model;

    // Elements
    this.$players = $('#gmk-players');
    this.$players.append(player1View.$el)
      .append(player2View.$el);
  },

  startGame: function () {
    this.started = true;
    this.board.refresh();
    this.player1.reset();
    this.player2.reset();
    this.currentPlayer = this.player1;
    this.$el.attr('class', 'started');
  },

  nextMove: function () {

    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }

    this.currentSequence = this.currentSequence + 1;
  }
});

new Gomoku.Game();
