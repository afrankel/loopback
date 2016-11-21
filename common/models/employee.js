'use strict';

module.exports = function(Employee) {
  // get total asset amount tied to this employee
  Employee.getAssetAmountForEmployee = function(id, cb) {
    var filter = {
      include: {
        relation: 'assets',
        scope: {
          fields: ['purchasePrice']
        }
      }
    };

    // use filter to include relation - i.e., inner join and just the fields we need
    return Employee.findById(id, filter).then(function(empl) {
      var emplObj = empl.toJSON();
      var totalAmount = 0;
      for (var i = 0; i < emplObj.assets.length; i++) {
        totalAmount += emplObj.assets[i].purchasePrice;
      }
      return totalAmount;
    }).catch(function(err) {
      console.log(err);
    });

/*
    Employee.findById(id, filter, function(err, empl) {
      if(err) {
        // do something better than this!
        console.log(err);
      }
      var emplObj = empl.toJSON();
      var totalAmount = 0;
      for (var i = 0; i < emplObj.assets.length; i++) {
        totalAmount += emplObj.assets[i].purchasePrice;
      }
      cb(null, totalAmount);
    });
*/
  };

  Employee.remoteMethod('getAssetAmountForEmployee', {
    description: "Returns the asset amount for the employee",
    accepts: {
      arg: 'id',
      type: 'number',
      required: true
    },
    http: {
      path: '/:id/getAssetTotalForEmployee',
      verb: 'get'
    },
    returns: {
      arg: 'amount',
      type: 'number'
    }
  });

};
