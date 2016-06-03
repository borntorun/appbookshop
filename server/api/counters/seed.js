'use strict';

var Counters = require('./counters.model');

Counters.count({}, function (err, data) {
    if (!err) {
        if (data == null || data === 0) {
            Counters.create({
                _id: 'newbookreference',
                seq: 0
            });
        }
    }
        
});
