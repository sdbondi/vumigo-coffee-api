go.app = function() {
  var vumigo = require('vumigo_v02');
  var App = vumigo.App;
  var Choice = vumigo.states.Choice;
  // var ChoiceState = vumigo.states.ChoiceState;
  var MenuState = vumigo.states.MenuState;
  var EndState = vumigo.states.EndState;

  var GoApp = App.extend(function(self) {
    // Initial state
    App.call(self, 'states:start');

    self.states.add('states:start', function(name) {
      return new MenuState(name, {
        question: 'Hi! Welcome to LARRY THE LEDGE!!',

        choices: [
          new Choice('states:brew', 'Can haz brew rooibos?!'),
          new Choice('states:status', 'Hows brew?'),
          new Choice('states:prefs', 'Much preference'),
          new Choice('states:end', 'kthxbye')
        ]
      });
    });

    self.states.add('states:brew', function(name) {
      return new MenuState(name, {
        question: 'What brew do you want to umm... brew bru?',

        choices: [
          new Choice({name: 'states:end', creator_opts: {brew: 'mocha'}}, 'Mocha'),
          new Choice({name: 'states:end', creator_opts: {brew: 'cappuccino'}}, 'Cappuccino'),
          new Choice('states:start', 'Back')
        ]
      });
    });

    self.states.add('states:end', function(name, creator_opts) {
      text = 'Thanks, cheers!';
      if (typeof creator_opts.brew != 'undefined') {
        text += ' You brewed ' + creator_opts.brew;
      }

      return new EndState(name, {
        text: text,
        next: 'states:start'
      });
    });
  });

  return {
    GoApp: GoApp
  };
}();
