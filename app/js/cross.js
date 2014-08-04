/**
 * Cross
 * -----
 * A cross on a board
 */

var Gomoku = Gomoku || {};

Gomoku.CrossModel = Backbone.Model.extend({

  defaults: {

    // Black: 1; White: 2
    stone: 0,

    // Position
    // (should not change after the board is initialized)
    x: 0,
    y: 0,

    // The nth move (start at 1)
    sequence: 0,

    // Whether the last move or not
    active: false
  },

  initialize: function (settings) {
    this.validate(settings);
    this.on('change', this.validate);
  },

  isOccupied: function () {
    return !!this.get('stone');
  },

  isBlack: function () {
    return this.get('stone') === 1;
  },

  isWhite: function () {
    return this.get('stone') === 2;
  },

  isActive: function () {
    return this.get('active');
  },

  validate: function () {

    if (_.indexOf([0, 1, 2], this.get('stone')) === -1) {
      throw 'Stone must be black or white.';
    }
  },

  reset: function () {

    this.set({
      stone: 0,
      sequence: 0,
      active: false
    });
  }
});

Gomoku.CrossView = Backbone.View.extend({

  tagName: 'li',

  events: {
    'click': 'setStone'
  },

  initialize: function () {
    this.render();
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var classNames = [];

    if (this.model.isOccupied()) {
      classNames.push('gmk-stone');
    }

    if (this.model.isActive()) {
      classNames.push('active');
    }

    if (this.model.isBlack()) {
      classNames.push('black');
    } else if (this.model.isWhite()) {
      classNames.push('white');
    }

    this.el.className = classNames.join(' ');
  },

  setStone: function () {
    var board = this.model.board,
        game = board.game;

    if (game && game.started) {

      if (this.model.isOccupied()) {
        throw 'The cross is already occupied.';
      }

      board.clearActive();

      this.model.set({
        stone: game.currentPlayer.get('stone'),
        sequence: game.currentSequence,
        active: true
      });

      game.nextMove();
    }
  }
});
