module.exports = function() {
    return [{
        "request": {
            "method": "POST",
            "url": "http://powerful-sierra-2165.herokuapp.com/api/v1/person/stan/brew/coffee"
        },
        "response": {
            "code": 200,
            "data": {
              "brew": {
                "beverage": "coffee",
                "person": "stan",
                "status": "brewing"
            }
        }
        }
    },
           {
             "request": {
               "method": "POST",
               "url": "http://powerful-sierra-2165.herokuapp.com/api/v1/person/stan/brew/tea"
             },
             "response": {
               "code": 200,
               "data": {
                 "brew": {
                   "beverage": "tea",
                   "person": "stan",
                   "status": "brewing"
                 }
               }
             }
           },
           {
             "request": {
               "method": "GET",
               "url": "http://powerful-sierra-2165.herokuapp.com/api/v1/person/stan/status"
             },
             "response": {
               "code": 200,
               "data": {
                 "brews": [{
                   "beverage": "coffee",
                   "person": "stan",
                   "status": "brewing"
                 }]
               }
             }
           }];
};
