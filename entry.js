// require("bootstrap/dist/css/bootstrap.css");
// import styles from './style.css';
// import * as d3 from 'd3';
// import * as d3plus from 'd3plus';


window.onload = function() { 
	// fixed top navbar
	window.addEventListener("scroll", bringmenu);

	function bringmenu() {
		if (document.body.scrollTop > 630 || document.documentElement.scrollTop > 630) {
			document.querySelector('#topNavbarRow').style.top = "0";
		} else {
			document.querySelector('#topNavbarRow').style.top = "-1600px";
		}
	}


	// First Two TreeMaps
	var cropsData = [];
	// read csv data
	d3.csv("Crops.csv", function(data) {

		data.forEach(function(d) {
			d.crop_name = d.crop_name;
			d.harvested_area = +d.harvested_area;
			d.value_of_production = +d.value_of_production;
			cropsData.push( 
				{ "name": d.crop_name,
				"area": d.harvested_area,
				"value": d.value_of_production
			});
		});

		var areaMap = d3plus.viz()
		.container("#treeMapAreaCtn") 
		.data(cropsData)  
		.type("tree_map")
		.resize(true) 
		.id("name")         
		.size("area")
		.labels({"align": "left", "valign": "top"})
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })      
		.draw(); 


		var valueMap = d3plus.viz()
		.container("#treeMapValueCtn") 
		.data(cropsData)  
		.type("tree_map")   
		.id("name")
		.resize(true)         
		.size("value")
		.labels({"align": "left", "valign": "top"})
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })      
		.draw(); 

		// scatter plot
		var visualization = d3plus.viz()
		.container("#areaVsValueScatterPlotCtn") 
		.data(cropsData)  
		.type("scatter")   
		.id("name")
		.resize(true) 
		.x({
			"value" : "area",
			"label" : { "value": "Harvested Area", 
			"font": {"weight": 600 } }
		})       
		.y({
			"value" : "value",
			"label": { "value": "Value of Production", 
			"font": {"weight": 600 } }
		})  
		.draw()          
	});


	

	////////////////////////////////////////////////////////////
	// Two TreeMaps for Water Supply for Crops
	////////////////////////////////////////////////////////////
	var rainfedCropsData = [];
	var irrigatedCropsData = [];
	var waterSupplyData = [];
	d3.csv("WaterSupplyforCrops.csv", function(data) {

		data.forEach(function(d) {
			d.crop_name = d.crop_name;
			d.water_supply = d.water_supply;
			d.harvested_area = +d.harvested_area;
			d.value_of_production = +d.value_of_production;
			
			// data for bar chart
			waterSupplyData.push( 
				{ "name": d.crop_name,
				"water_supply": d.water_supply,
				"area": d.harvested_area,
				"value": d.value_of_production,
				"year": d.year
			});


			if(d.water_supply === "rainfed" ) {
				rainfedCropsData.push( 
					{ "name": d.crop_name,
					"water_supply": d.water_supply,
					"area": d.harvested_area,
					"value": d.value_of_production
				});
			} else {
				irrigatedCropsData.push( 
					{ "name": d.crop_name,
					"water_supply": d.water_supply,
					"area": d.harvested_area,
					"value": d.value_of_production
				});
			};

		});
		////////////////////////////////////////////////////////////

		// bar map
		var visualization = d3plus.viz()
		.container("#rainfedIrrigatedBarMapCtn")
		.data(waterSupplyData)
		.type("bar")
		.id("water_supply")
		.resize(true)
		.x({"stacked": true, "value": "area", "grid": false, "axis":false, 
			"label": { "value": "Harvested Area", "font": {"weight": 600}} })
		.y({"scale": "discrete", "value": "year", "grid": false, "axis":false,
			"label": { "value": "", "font": {"weight": 600} } })
		.axes({"background": {"color": "white"},
			"ticks":false})
		.text("water_supply")
		.color("water_supply")
		.legend({
			"order": {
				"sort": "desc",
				"value": "Harvested Area"
			}, "value": true, "size": 40})
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })
		.draw()
		////////////////////////////////////////////////////////////
		var rainfedCropsMap = d3plus.viz()
		.container("#rainfedCropsTreeMapCtn") 
		.data(rainfedCropsData)  
		.type("tree_map")   
		.id("name")
		.resize(true)         
		.size("area")
		.labels({"align": "left", "valign": "top"})
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })      
		.draw(); 

		var irrigatedCropsMap = d3plus.viz()
		.container("#irrigatedCropsTreeMapCtn") 
		.data(irrigatedCropsData)  
		.type("tree_map")   
		.id("name")
		.resize(true)         
		.size("area")
		.labels({"align": "left", "valign": "top"})
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })      
		.draw(); 
	});

	
	// Climate Part Bar chart
	var rainfallData = [];
	// read csv data
	d3.csv("AverageAnnualRainfall.csv", function(data) {

		data.forEach(function(d) {
			d.geo_name = d.geo_name;
			d.rainfall_awa_mm = +d.rainfall_awa_mm;
			rainfallData.push( 
				{ "geo_name": d.geo_name,
				"rainfall": d.rainfall_awa_mm});
		});

		// bar map
		var visualization = d3plus.viz()
		.container("#rainfallBarChartCtn")
		.data(rainfallData)
		.type("bar")
		.id("geo_name")
		.resize(true)
		.x({"stacked": false, "value": "rainfall", "grid": false, "axis":false,
			"label": { "value": "Average Annual Rainfall", 
			"font": {"weight": 600 } }})
		.y({"scale": "discrete", "value": "geo_name", "grid": false, "axis":false,
			"label": ""})
		.axes({"background": {"color": "white"},
			"ticks":false})
		.legend({"value":true, "color":"name" })
		.text("geo_name")
		.tooltip({
			"share": true,    
			"size": true,     
			"children": false, 
			"stacked": true,
			"background": '#051902' })
		.order({
			"sort": "asc", "value": "rainfall"
		})
		.draw()



	});







// closing curly brace for window.onload
};