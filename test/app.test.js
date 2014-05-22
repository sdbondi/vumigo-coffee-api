var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("asks them what they want to do", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:start',
                        reply: [
                          'Hi! Welcome to COFFEE HAVING NOM NOM!!',
                          '1. Can haz brew?!',
                          '2. Hows brew?',
                          '3. Much preference',
                          '4. kthxbye'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks for brew menu", function() {
            it("displays the brew menu", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('1')
                    .check.interaction({
                        state: 'states:brew',
                        reply: [
                          'What brew do you want to umm... brew bru?',
                          '1. Mocha',
                          '2. Cappuccino',
                          '3. Back'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when a user asks to brew", function() {
          it("tells you what you brewed", function() {
            return tester
              .setup.user.state('state:brew')
              .input('1')
              .check.interaction({
                state: 'states:end',
                reply: 'Thanks, cheers! You brewed mocha'
              });
          });
        });

        describe("when the user asks to exit", function() {
            it("says thank you and ends the session", function() {
                return tester
                    // Set state to start
                    .setup.user.state('states:start')
                    .input('4')
                    .check.interaction({
                        state: 'states:end',
                        reply: 'Thanks, cheers!'
                    })
                    // Check that the session is ended
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});
