go.app = function() {
  var vumigo = require('vumigo_v02');
  var App = vumigo.App;
  var Choice = vumigo.states.Choice;
  var ChoiceState = vumigo.states.ChoiceState;
  var EndState = vumigo.states.EndState;

  var GoApp = App.extend(function(self) {
    // Initial state
    App.call(self, 'states:start');

    self.states.add('states:start', function(name) {
      return new ChoiceState(name, {
        question: 'Hi there! What do you want to do?',

        choices: [
          new Choice('states:start', 'Show this menu again'),
          new Choice('states:end', 'Exit')
        ],

        next: function(choice) {
          return choice.value;
        }
      });
    });

    self.states.add('states:end', function(name) {
      return new EndState(name, {
        text: 'Thanks, cheers!',
             next: 'states:start'
      });
    });
  });

  return {
    GoApp: GoApp
  };
}();
