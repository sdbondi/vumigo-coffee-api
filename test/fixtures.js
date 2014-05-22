module.exports = function() {
    return [{
        "request": {
            "method": "POST",
            "url": "http://powerful-sierra-2165.herokuapp.com/api/v1/person/simon/brew/coffee"
        },
        "response": {
            "code": 200,
            "data": {
              "brew": {
                "beverage": "coffee",
                "person": "simon",
                "status": "brewing"
            }
        }
        }
    },
           {
             "request": {
               "method": "POST",
               "url": "http://powerful-sierra-2165.herokuapp.com/api/v1/person/simon/brew/tea"
             },
             "response": {
               "code": 200,
               "data": {
                 "brew": {
                   "beverage": "tea",
                   "person": "simon",
                   "status": "brewing"
                 }
               }
             }
           }];
};
