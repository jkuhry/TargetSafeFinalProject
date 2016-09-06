-- DROP DATABASE IF EXISTS poursafedemodb;
-- CREATE DATABASE poursafedemodb;

\c poursafedemodb;

CREATE TABLE poursafe.arrest
(
	ID SERIAL PRIMARY KEY, 
	police_dept_id integer, 
	arrest_date date NOT NULL, 
	arrest_time time,
 	stop_type_id integer,
	tests_id integer,
	bac double precision,
	charges_id integer,
	other_crime_codes_id int,
	arrest_address character(100),
	offender_destination_address character(100),
	out_of_county boolean DEFAULT false,
	location_type_id integer NOT NULL,
	number_of_drinks integer,
	rate_of_consumption integer, 
	other_substances_id integer,
	describe_substance character varying,
	gender_id integer NOT NULL,
	occupation_status_id integer,
	ethnicity_id integer,
	prior_dui_history_number integer,
	prior_dui_date date,
	drivers_vehicle_type_id integer,
	victims_vehicle_type_id integer,
	driver_vehicle_adults_injured integer,
	driver_vehicle_under_twenty_one_injury integer,
	driver_vehicle_adult_deaths integer,
	driver_vehicle_under_twenty_one_deaths integer,
	hit_run boolean DEFAULT false,
	hit_run_details character varying,
	victims_vehicle_adults_injured integer,
	victims_vehicle_under_twenty_one_injury integer,
	victims_vehicle_adult_deaths integer,
	victims_vehicle_under_twenty_one_deaths integer,
	peace_officer_victim boolean DEFAULT false,
	public_safety_vehicle boolean DEFAULT false,
	municipal_property boolean DEFAULT false,
	trees_and_landscape boolean DEFAULT false,
	building_structure boolean DEFAULT false,
	other_notes character(100), 
	ca_license_id character(12)
);

-- INSERT new record
INSERT INTO poursafe.arrest(police_dept_id, arrest_date, arrest_time, stop_type_id, tests_id, bac, charges_id, other_crime_codes_id, arrest_address, offender_destination_address, location_type_id, venue_location_name_id, number_of_drinks, rate_of_consumption, other_substances_id, describe_substance, gender_id, occupation_status_id, ethnicity_id, prior_dui_history_number, prior_dui_date, drivers_vehicle_type_id, victims_vehicle_type_id, driver_vehicle_adults_injured, driver_vehicle_under_twenty_one_injury, driver_vehicle_adult_deaths, driver_vehicle_under_twenty_one_deaths, hit_run, hit_run_details, victims_vehicle_adults_injured, victims_vehicle_under_twenty_one_injury, victims_vehicle_adult_deaths, victims_vehicle_under_twenty_one_deaths, peace_officer_victim, public_safety_vehicle, municipal_property, trees_and_landscape, building_structure, other_notes, ca_license_id)
	VALUES (1, '11/15/13', '11:57 PM', 1, .02, 2, 2, 1, 'arrest address character', 'offender destination address character', 2, 'jim bob', 2, 2, 2, 'desribe subastance character', 2, 2, 3, 2, '08/15/1944', 2, 3, 3, 1, 2, 2, true, 'hit run details character', 2, 3, 1, 2, false, false, true, true, true, 'other notes character', 215874574587);

