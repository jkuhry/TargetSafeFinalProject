(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['MainFactory'];

    /* @ngInject */
    function MainController(MainFactory) {

        var defaultInputs = {police_dept_id: null, stop_type_id: null, tests_id: 4, bac: null, charges_id: "3", other_crime_codes_id: "5", offender_destination_address: "", ca_license_id: null, out_of_county: false, number_of_drinks: 0, rate_of_consumption: 0, other_substances_id: "11", describe_substance: "", age: 0, ethnicity_id: "6", occupation_status_id: "1", prior_dui_history_number: 4, prior_dui_date: null, drivers_vehicle_type_id: "9", driver_vehicle_adults_injured: 0, driver_vehicle_under_twenty_one_injury: 0, driver_vehicle_adult_deaths: 0, driver_vehicle_under_twenty_one_deaths: 0, victims_vehicle_type_id: "9", victims_vehicle_adults_injured: 0, victims_vehicle_under_twenty_one_injury: 0, victims_vehicle_adult_deaths: 0, victims_vehicle_under_twenty_one_deaths: 0, hit_run: false, peace_officer_victim: false, public_safety_vehicle: false, municipal_property: false, trees_and_landscape: false, building_structure: false, hit_run_details: "", other_notes: ""};
        var vm = this;
        vm.title = 'MainController';
        vm.addEntry = addEntry;
   

        activate();

        ////////////////

        function activate() {  

            MainFactory.ca_license_id()
            .then (function(res){
              vm.ca_license_id = res.data.data;
            })

            MainFactory.vehicle_type()
             .then (function(response){
                     vm.vehicle_type = response.data.data;
                 })  
            MainFactory.charge()
             .then (function(response){
                     vm.charge = response.data.data;
                 }) 
            MainFactory.tests_id()
             .then (function(response){
                     vm.tests_id = response.data.data;
                 }) 
            MainFactory.crime_code()
             .then (function(response){
                     vm.crime_code = response.data.data;
                 }) 
            MainFactory.ethnicity()
             .then (function(response){
                     vm.ethnicity = response.data.data;
                 }) 
            MainFactory.gender()
             .then (function(response){
                     vm.gender = response.data.data;
                 }) 
            MainFactory.location_type()
             .then (function(response){
                     vm.location_type = response.data.data;
                 }) 
            MainFactory.occupation_status()
             .then (function(response){
                     vm.occupation_status = response.data.data;
                 })

            MainFactory.prior_dui_history()
                 .then (function(response){
                         vm.prior_dui_history = response.data.data;
                     })            

            MainFactory.other_substances()
             .then (function(response){
                     vm.other_substances = response.data.data;
                 }) 
            MainFactory.stop_type()
             .then (function(response){
                     vm.stop_type = response.data.data;
                 }) 
            MainFactory.police_dept_id()
             .then (function(response){
                     vm.police_dept_id = response.data.data;
                 }) 
        }

        //Adding new entry
        function addEntry(newEntry) {
            //using angular extend function to replace default data with user input data
            var updateNewEntry = angular.extend({}, defaultInputs, newEntry);
            MainFactory.addEntry(updateNewEntry)
                .then(function(response) {
                        response;
                        toastr.success('Information SAVED to Database!');
                    },
                    //added toastr for error handling
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was a problem: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    }
                )
        }


    }
})();