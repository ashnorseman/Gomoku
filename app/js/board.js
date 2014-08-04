/**
 * Board
 * -----
 * A collection of Crosses
 */

var Gomoku = Gomoku || {};

Gomoku.BOARD_SIZE = 15;

Gomoku.BoardCollection = Backbone.Collection.extend({

  model: Gomoku.CrossModel,

  // Fetch a model from its axis
  axis: function (x, y) {

    if (x < 0 || x >= Gomoku.BOARD_SIZE || y < 0 || y >= Gomoku.BOARD_SIZE) {
      throw 'Axis out of range';
    }

    return this.at(y * Gomoku.BOARD_SIZE + x);
  },

  refresh: function () {

    _.each(this.models, function (model) {
      model.reset();
    });
  },

  clearActive: function () {

    _.each(this.models, function (model) {
      model.set('active', false);
    });
  }
});

Gomoku.BoardView = Backbone.View.extend({

  tagName: 'ul',
  className: 'gmk-cross-list',

  initialize: function () {

    _.each(this.collection.models, function (model) {

      // Link
      model.board = this.collection;

      this.$el.append(new Gomoku.CrossView({
        model: model
      }).$el);
    }, this);
  }
});
