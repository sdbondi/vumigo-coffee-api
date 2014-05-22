go.app = function() {
  var vumigo = require('vumigo_v02');
  var App = vumigo.App;
  var Choice = vumigo.states.Choice;
  var ChoiceState = vumigo.states.ChoiceState;
  var MenuState = vumigo.states.MenuState;
  var EndState = vumigo.states.EndState;
  var JsonApi = vumigo.http.api.JsonApi;

  var GoApp = App.extend(function(self) {
    // Initial state
    App.call(self, 'states:start');

    self.init = function() {
      self.http = new JsonApi(self.im);
    };

    self.states.add('states:start', function(name) {
      return new MenuState(name, {
        question: 'Hi! Welcome to COFFEE HAVING NOM NOM!!',

        choices: [
          new Choice('states:brew', 'Can haz brew?!'),
          new Choice('states:status', 'Hows brew?'),
          new Choice('states:prefs', 'Much preference'),
          new Choice('states:end', 'kthxbye')
        ]
      });
    });

    self.states.add('states:brew', function(name) {
      return new ChoiceState(name, {
        question: 'What brew do you want to umm... brew bru?',

        choices: [
          new Choice('coffee', 'Coffee'),
          new Choice('tea', 'Tea'),
          new Choice('back', 'Back')
        ],

        next: function(choice) {
          url = 'http://powerful-sierra-2165.herokuapp.com/api/v1/person/simon/';
          if (choice.value == 'back') {
            return 'states:start';
          }

          return self.http
            .post(url + 'brew/' + choice.value)
            .then(function(resp) {
              self.im.log(resp.data);

              return {
                name: 'states:end',
                creator_opts: {
                  brew: resp.data.brew
                }
              };
            });
        }
      });
    });

    self.states.add('states:end', function(name, creator_opts) {
      text = 'Thanks, cheers!';
      if (typeof creator_opts.brew != 'undefined') {
        text += ' You brewed ' + creator_opts.brew.beverage;
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
