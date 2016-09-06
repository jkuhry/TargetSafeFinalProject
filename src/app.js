//using 'use strict' to create secure JS in "strict mode" where undeclared var are not permitted
'use strict';

//importing express with required method
var express = require('express');

//creating an instance of express server and assigning var app
var app = express();

//installed body-parser and now requiring in order to post data to routes
var bodyParser = require('body-parser');

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

//created an object for connection
//  INSERT DATABASE INFORMATION HERE




//creating global var of connectionToPoursafeDB
var db = pgp(connectionToPoursafeDB);

//serving static files using express built in static method
//adding / as the first param to default the route to the root of the application
app.use('/', express.static('public'));

// for parsing application/json
app.use(bodyParser.json());

//creating a router to create the api name space for routes
var router = express.Router();



//ROUTES ADDED TO EXPRESS AT RUNTIME FOR TESTING
//GET all from Arrest
router.get('/records', function(req, res, next) {
    db.any('SELECT * from poursafe.arrest')
    .then(function (data) {
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL records!'
      });
    })
    .catch(function (err) {
      return next(err);
    });
})

//GET single from Arrest
router.get('/records/:id', function(req, res, next) {
  var recID = req.params.id;
  db.one('SELECT * from poursafe.arrest WHERE id = $1', recID)
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved ONE record!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//POST record in Arrest
router.post('/records', function(req, res, next) {
   db.none('INSERT into poursafe.arrest(police_dept_id, arrest_date, arrest_time, stop_type_id, tests_id, bac, charges_id, other_crime_codes_id, arrest_address, offender_destination_address, location_type_id, number_of_drinks, rate_of_consumption, other_substances_id, describe_substance, gender_id, occupation_status_id, ethnicity_id, prior_dui_history_number, prior_dui_date, drivers_vehicle_type_id, victims_vehicle_type_id, driver_vehicle_adults_injured, driver_vehicle_under_twenty_one_injury, driver_vehicle_adult_deaths, driver_vehicle_under_twenty_one_deaths, hit_run, hit_run_details, victims_vehicle_adults_injured, victims_vehicle_under_twenty_one_injury, victims_vehicle_adult_deaths, victims_vehicle_under_twenty_one_deaths, peace_officer_victim, public_safety_vehicle, municipal_property, trees_and_landscape, building_structure, other_notes, ca_license_id, out_of_county) VALUES(${police_dept_id}, ${arrest_date}, ${arrest_time}, ${stop_type_id}, ${tests_id}, ${bac}, ${charges_id}, ${other_crime_codes_id}, ${arrest_address}, ${offender_destination_address}, ${location_type_id}, ${number_of_drinks}, ${rate_of_consumption}, ${other_substances_id}, ${describe_substance}, ${gender_id}, ${occupation_status_id}, ${ethnicity_id}, ${prior_dui_history_number}, ${prior_dui_date}, ${drivers_vehicle_type_id}, ${victims_vehicle_type_id}, ${driver_vehicle_adults_injured}, ${driver_vehicle_under_twenty_one_injury}, ${driver_vehicle_adult_deaths}, ${driver_vehicle_under_twenty_one_deaths}, ${hit_run}, ${hit_run_details}, ${victims_vehicle_adults_injured}, ${victims_vehicle_under_twenty_one_injury}, ${victims_vehicle_adult_deaths}, ${victims_vehicle_under_twenty_one_deaths}, ${peace_officer_victim}, ${public_safety_vehicle}, ${municipal_property}, ${trees_and_landscape}, ${building_structure}, ${other_notes}, ${ca_license_id}, ${out_of_county})', req.body)
  .then(function () {
    res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one record!'
      });
  })
  .catch(function (err) {
      return next(err);
    });
})

//GET CA License by county
router.get('/location/:county', function(req, res, next) {
  var recCounty = req.params.county;
  db.any('SELECT * from lookups.ca_license_cleaned WHERE county = $1 ORDER BY dba ASC', recCounty)
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All results from search!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.charge table
router.get('/lookup/charge', function(req, res, next) {
  db.any('SELECT charge_id, charge_name from lookups.charge')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All charge information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.tests_id table
router.get('/lookup/tests_id', function(req, res, next) {
  db.any('SELECT tests_id, tests_name from lookups.tests_id')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All tests_id information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.crime_code table
router.get('/lookup/crime_code', function(req, res, next) {
  db.any('SELECT crime_code_id, crime_code from lookups.crime_code')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All crime_code information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.ethniciy table
router.get('/lookup/ethnicity', function(req, res, next) {
  db.any('SELECT ethnicity_id, ethnicity_name from lookups.ethnicity')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All ethnicity information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.gender table
router.get('/lookup/gender', function(req, res, next) {
  db.any('SELECT gender_id, gender_name from lookups.gender')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All gender information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.location_type table
router.get('/lookup/location_type', function(req, res, next) {
  db.any('SELECT location_type_id, location_type_name from lookups.location_type')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All location_type information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.occupation_status table
router.get('/lookup/occupation_status', function(req, res, next) {
  db.any('SELECT occupation_status_id, occupation_status_name from lookups.occupation_status')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All occupation_status information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.other_substances table
router.get('/lookup/other_substances', function(req, res, next) {
  db.any('SELECT other_substances_id, other_substances_name from lookups.other_substances')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All other_substances information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.stop_type table
router.get('/lookup/stop_type', function(req, res, next) {
  db.any('SELECT stop_type_id, stop_type_name from lookups.stop_type')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All stop_type information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.vehicle_type table
router.get('/lookup/vehicle_type', function(req, res, next) {
  db.any('SELECT vehicle_type_id, vehicle_type_name from lookups.vehicle_type')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All vehicle_type information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//GET from lookups.police_dept_id table
router.get('/lookup/police_dept_id', function(req, res, next) {
  db.any('SELECT police_dept_id, police_dept_name, police_dept_county from lookups.police_dept_id')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All police_dept_id information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//get info from prior dui history table
router.get('/lookup/prior_dui_history', function(req, res, next) {
  db.any('SELECT prior_dui_history_id, prior_dui_history_number from lookups.prior_dui_history')
    .then(function (data) {
          res.status(200)
          .json({
              status: 'success',
              data: data,
              message: 'Retrieved All charge information!'
          });
      })
      .catch(function (err) {
          return next(err);
      });
})

//first param is the name space, using in conjunction with express.Router
//second param is the router 
app.use('/api', router);

//configure listen port and extending app var with listen method
//creating callback func to make awarness of running server
app.listen(3000, function() {
  //serving a message to let us know the server is running
  console.log("The server is running on port 3000!")
});