/**
 * PLayer
 * -----
 * A game should have tow players
 */

var Gomoku = Gomoku || {};

Gomoku.PlayerModel = Backbone.Model.extend({

  defaults: {

    // Static
    name: '',
    avatarSrc: '',
    nameSrc: '',

    // Game relatec
    number: 0,              // should be 1 or 2
    stone: 0,               // Black: 1; White: 2
    active: false,          // Now playing
    timeLeftSec: 0,         // Total time
    countDownSec: 0,        // Byo-yomi
    countDownStarted: false
  },

  initialize: function () {
    this.updateShowTime();
    this.on('timeChange', this.updateShowTime);
  },

  reset: function () {

    this.set({
      active: false,
      timeLeftSec: 0,
      countDownSec: 0,
      countDownStarted: false
    });
  },

  updateShowTime: function () {
    var minute,
        second;

    if (this.get('countDownStarted')) {
      minute = Math.floor(this.get('timeLeftSec') / 60);
      second = this.get('timeLeftSec') - minute * 60;
    } else {
      minute = Math.floor(this.get('countDownSec') / 60);
      second = this.get('countDownSec') - minute * 60;
    }

    this.set({
      timeShowMinute: minute < 10 ? '0' + minute : '' + minute,
      timeShowSec: second < 10 ? '0' + second : '' + second
    });
  }
});

Gomoku.PlayerView = Backbone.View.extend({

  template: _.template(
    '<div class="gmk-player player-<%= number %>">' +
      '<div class="gmk-avatar">' +
        '<img src="<%= avatarSrc %>" alt="<%= name %>">' +
      '</div>' +
      '<div class="gmk-player-name">' +
        '<img src="<%= nameSrc %>" alt="<%= name %>">' +
      '</div>' +
      '<div class="gmk-now ' +
        '<% if (stone === 1) { %>' +
          'black' +
        '<% } else if (stone === 2) { %>' +
          'white' +
        '<% } %>' +
        '<% if (active) { %>' +
          'active' +
        '<% } %>' +
      '"></div>' +
      '<div class="gmk-timer">' +
        '<span class="gmk-timer-<%= timeShowMinute.charAt(0) %>"></span>' +
        '<span class="gmk-timer-<%= timeShowMinute.charAt(1) %>"></span>' +
        '<span class="gmk-timer-col"></span>' +
        '<span class="gmk-timer-<%= timeShowSec.charAt(0) %>"></span>' +
        '<span class="gmk-timer-<%= timeShowSec.charAt(1) %>"></span>' +
      '</div>' +
    '</div>'),

  initialize: function () {
    this.render();
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.setElement(this.template(this.model.toJSON()));
    return this;
  }
});
