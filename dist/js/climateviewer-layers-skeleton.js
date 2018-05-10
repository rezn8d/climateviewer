Cesium.Ion.defaultAccessToken = ''; // obtain key https://cesium.com/

/*
 LEGEND
 var layerId = l.I,
 format = l.F,
 geoDataSrc = l.G,
 geoLayers = l.L,
 source = l.S,
 sourceUrl = l.U,
 zoom = l.Z,
 markerImg = l.MI,
 markerLabel = l.ML,
 markerScale = l.MS,
 markerMod = l.M,
 largeLayer = l.H,
 newLayer = l.NL,
 timeline = l.C,
 proxy = l.P;
 3D only = l.TRD,
 Leaflet only = l.TWD,
 no Features = l.X,
 no Marker List = l.Y;

 */
var layers = {
    "I": "ClimateViewer",
    "Alerts": {
        "N": "<span style='color:#FC0'>LIVE!</span> Alerts & Weather",
        "icon": "fa-exclamation-triangle",
            "Air Quality": {
            "N": "Air Quality",
            "icon":  "fa-cloud",
            ">": [
                {
                    "I": "aqi-current",
                    "T": "kml",
                    "P": true,
                    "R": "home",
                    "G": "http://files.airnowtech.org/airnow/today/airnow_conditions.kml",
                    "S": "The Air Quality Index (AQI) identifies air quality as it relates to health effects you may experience within a few hours or days after breathing polluted air. Ground-level ozone and airborne particles (PM2.5 and PM10) pose the greatest threat to human health.<br><br>For more information visit: http://www.airnow.gov/index.cfm?action=static.aqi <br><br>Particle pollution, also known as 'particulate matter', is a mixture of microscopic solids and liquid droplets suspended in air. The size of particles is directly linked to their potential for causing health problems. Fine particles (known as PM2.5) pose the greatest problems because they can get deep into your lungs and some may even get into your bloodstream. Particles less than 10 micrometers (PM10), include both fine and coarse dust particles that can pass through the nose and throat and get into your lungs. For more information visit: http://airnow.gov/index.cfm?action=jump.jump_particle <br><br>Ozone near ground level forms when pollutants emitted by cars, power plants, industrial boilers, refineries, chemical plants, and other sources react chemically in the presence of sunlight. Ground-level ozone is a harmful air pollutant.",
                    "U": "http://airnow.gov/index.cfm?action=jump.jump_ozone",
                    "N": "Air Quality Index (Current)"
                },
                {
                    "I": "aqi-today",
                    "T": "kml",
                    "P": true,
                    "R": "home",
                    "G": "http://files.airnowtech.org/airnow/today/airnow_today.kml",
                    "S": "The Air Quality Index (AQI) identifies air quality as it relates to health effects you may experience within a few hours or days after breathing polluted air. Ground-level ozone and airborne particles (PM2.5 and PM10) pose the greatest threat to human health.<br><br>For more information visit: http://www.airnow.gov/index.cfm?action=static.aqi <br><br>Particle pollution, also known as 'particulate matter', is a mixture of microscopic solids and liquid droplets suspended in air. The size of particles is directly linked to their potential for causing health problems. Fine particles (known as PM2.5) pose the greatest problems because they can get deep into your lungs and some may even get into your bloodstream. Particles less than 10 micrometers (PM10), include both fine and coarse dust particles that can pass through the nose and throat and get into your lungs. For more information visit: http://airnow.gov/index.cfm?action=jump.jump_particle <br><br>Ozone near ground level forms when pollutants emitted by cars, power plants, industrial boilers, refineries, chemical plants, and other sources react chemically in the presence of sunlight. Ground-level ozone is a harmful air pollutant.",
                    "U": "http://airnow.gov/index.cfm?action=jump.jump_ozone",
                    "N": "Air Quality Index (Today)"
                },
                {
                    "I": "aqi-tomorrow",
                    "T": "kml",
                    "P": true,
                    "R": "home",
                    "G": "http://files.airnowtech.org/airnow/today/airnow_tomorrow.kml",
                    "S": "The Air Quality Index (AQI) identifies air quality as it relates to health effects you may experience within a few hours or days after breathing polluted air. Ground-level ozone and airborne particles (PM2.5 and PM10) pose the greatest threat to human health.<br><br>For more information visit: http://www.airnow.gov/index.cfm?action=static.aqi <br><br>Particle pollution, also known as 'particulate matter', is a mixture of microscopic solids and liquid droplets suspended in air. The size of particles is directly linked to their potential for causing health problems. Fine particles (known as PM2.5) pose the greatest problems because they can get deep into your lungs and some may even get into your bloodstream. Particles less than 10 micrometers (PM10), include both fine and coarse dust particles that can pass through the nose and throat and get into your lungs. For more information visit: http://airnow.gov/index.cfm?action=jump.jump_particle <br><br>Ozone near ground level forms when pollutants emitted by cars, power plants, industrial boilers, refineries, chemical plants, and other sources react chemically in the presence of sunlight. Ground-level ozone is a harmful air pollutant.",
                    "U": "http://airnow.gov/index.cfm?action=jump.jump_ozone",
                    "N": "Air Quality Index (Tomorrow)"
                },
                {
                    "I": "aqi-yesterday",
                    "T": "kml",
                    "P": true,
                    "R": "home",
                    "G": "http://files.airnowtech.org/airnow/today/airnow_yest_obs.kml",
                    "S": "The Air Quality Index (AQI) identifies air quality as it relates to health effects you may experience within a few hours or days after breathing polluted air. Ground-level ozone and airborne particles (PM2.5 and PM10) pose the greatest threat to human health.<br><br>For more information visit: http://www.airnow.gov/index.cfm?action=static.aqi <br><br>Particle pollution, also known as 'particulate matter', is a mixture of microscopic solids and liquid droplets suspended in air. The size of particles is directly linked to their potential for causing health problems. Fine particles (known as PM2.5) pose the greatest problems because they can get deep into your lungs and some may even get into your bloodstream. Particles less than 10 micrometers (PM10), include both fine and coarse dust particles that can pass through the nose and throat and get into your lungs. For more information visit: http://airnow.gov/index.cfm?action=jump.jump_particle <br><br>Ozone near ground level forms when pollutants emitted by cars, power plants, industrial boilers, refineries, chemical plants, and other sources react chemically in the presence of sunlight. Ground-level ozone is a harmful air pollutant.",
                    "U": "http://airnow.gov/index.cfm?action=jump.jump_ozone",
                    "N": "Air Quality Index (Yesterday)"
                }
            ]
        },
        "Earthquake": {
            "N": "Earthquakes",
            "icon":  "fa-rss",
            ">": [
                {
                    "I": "kml-emsc",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "M": true,
                    "G": "http://www.emsc-csem.org/Earthquake/Map/earth/kml.php",
                    "S": "Centre Sismologique Euro-Méditerranéen (CSEM) Euro-Med earthquakes",
                    "U": "http://www.emsc-csem.org/",
                    "N": "Euro-Med Earthquakes - CSEM/EMSC"
                },
               /* {
                    "NL": true,
                    "I": "gdacs-esri",
                    "T": "arcgis-layer",
                    "P": true,
                    "R": [
                        -128,
                        19.64,
                        -61,
                        50.54
                    ],
                    "G": "http://dma.gdacs.org/ArcGIS/rest/services/GDACS/gdacsAlertsActiveBG/MapServer",
                    "S": "<p>GDACS provides alerts and impact estimations after major disasters through a multi-hazard disaster impact assessment service managed by the European Commission Joint Research Centre. To this end, JRC establishes scientific partnerships with global hazard monitoring organisations. Flood disasters are provided by the Dartmouth Flood Observatory. Relevant data is integrated automatically into GDACS alerts and impact estimations. </p><p>GDACS is a cooperation framework under the United Nations umbrella. It includes disaster managers and disaster information systems worldwide and aims at filling the information and coordination gap in the first phase after major disasters. GDACS provides real-time access to web‐based disaster information systems and related coordination tools.</p>",
                    "U": "http://www.gdacs.org/",
                    "N": "Global Disaster Alert and Coordination System (GDACS)"
                }, */
                {
                    "I": "usgs-all-hour",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - All Earthquakes (Last Hour)"
                },
                {
                    "I": "usgs-45-today",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M4.5+ Earthquakes (Today)"
                },
                {
                    "I": "usgs-25-today",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M2.5+ Earthquakes (Today)"
                },
                {
                    "I": "usgs-all-today",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - All Earthquakes (Today)",
                    "Y": true
                },
                {
                    "I": "usgs-45-7day",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M4.5+ Earthquakes (Last Week)"
                },
                {
                    "I": "usgs-25-7day",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M2.5+ Earthquakes (Last Week)"
                },
                {
                    "I": "usgs-all-7day",
                    "T": "kml",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week_age_link.kml",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/kml.php",
                    "N": "USGS - M1.0+ Earthquakes (Last Week) KML",
                    "Y": true
                },
                //{ "I": "usgs-big-30day", "T": "geojson", "ML": "usgs-eq", "MI": "http://climateviewer/img/icons/earthquakes.png", "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", "S": "United States Geological Society (USGS) Earthquake Hazards Program", "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php", "N": "USGS - Significant Earthquakes (Last Month)"},
                {
                    "I": "usgs-45-30day",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M4.5+ Earthquakes (Last Month)"
                },
                {
                    "I": "usgs-25-30day",
                    "T": "geojson",
                    "ML": "usgs-eq",
                    "MI": "http://climateviewer/img/icons/earthquakes.png",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    "N": "USGS - M2.5+ Earthquakes (Last Month)"
                },
                {
                    "I": "usgs-all-30day",
                    "T": "kml",
                    "G": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month_age_link.kml",
                    "S": "United States Geological Society (USGS) Earthquake Hazards Program",
                    "U": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/kml.php",
                    "N": "USGS - M2.5+ Earthquakes (Last Month) KML",
                    "Y": true
                },
                {
                    "P": true,
                    "H": true,
                    "I": "kml-buoy",
                    "M": true,
                    "Y": true,
                    "T": "kml",
                    "G": "http://www.ndbc.noaa.gov/kml/marineobs_as_kml.php?sort=program",
                    "S": "National Oceanic and Atmospheric Administration (NOAA) National Data Buoy Center",
                    "U": "http://www.ndbc.noaa.gov/",
                    "N": "NOAA Buoys"
                }
            ]
        }
    },
    "Satellites": {
        "N": "<span style='color:#FC0'>LIVE!</span> Satellites",
        "icon": "fa-space-shuttle",
        "satAnimation": {
            "N": "Morphed Integrated Microwave Imagery (MIMIC)",
            "icon":  "fa-film",
            "description": "Cooperative Institute for Meteorological Satellite Studies (CIMSS), Space Science and Engineering Center (SSEC)  /  University of Wisconsin-Madison.<br>More Info &bull; <a href='http://tropic.ssec.wisc.edu/'>tropic.ssec.wisc.edu</a><br><br><div><img src='/dist/img/menu/cimss_logo_new.gif' alt=''>&nbsp;<img src='/dist/img/menu/UW_logo_shield_trans.gif' alt=''>&nbsp;<img src='/dist/img/menu/ssec_logo_trans3.gif' alt=''></div>",
            ">": [
                {
                    "I": "cimss-ir-full",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -100.95, -1.9961, -29, 51.9544],
                    "G": "http://cimss.ssec.wisc.edu/tropic2/real-time/atlantic/movies/kml/tiles/RT.atlantic.g8ir.tiles.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Infrared - Unenhanced FULL"
                },
                {
                    "I": "cimss-ir",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -100.95, -1.9961, -29, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/atlantic/movies/kml/tiles/RT.atlantic.g8ir.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Infrared - Unenhanced"
                },
                {
                    "I": "cimss-irnhc",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -100.95, -1.9961, -29, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/atlantic/movies/kml/tiles/RT.atlantic.g8irn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-irdbd",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -100.95, -1.9961, -29, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/atlantic/movies/kml/tiles/RT.atlantic.g8irbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-wv",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -100.95, -1.9961, -29, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/atlantic/movies/kml/tiles/RT.atlantic.g8wv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Water Vapor - Unenhanced"
                },
                {
                    "I": "cimss-natwp",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -105, -5.75, 26, 53.5],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.natl.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Total Precipitable Water"
                },
                {
                    "I": "cimss-natwp2",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -117.32, -3.43, 24.08, 63],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW2.natl.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "North Atlantic Total Precipitable Water (version 2)"
                },
                {
                    "I": "cimss-eu-ir",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -35.95, -1.9961, 36, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/europe/movies/kml/tiles/RT.europe.m7ir.tiles.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Europe Africa Infrared - Unenhanced"
                },
                {
                    "I": "cimss-eu-irnhc",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -35.95, -1.9961, 36, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/europe/movies/kml/tiles/RT.europe.m7irn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Europe Africa Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-eu-irdbd",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "R": [ -35.95, -1.9961, 36, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/europe/movies/kml/tiles/RT.europe.m7irbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Europe Africa Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-eu-wv",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -35.95, -1.9961, 36, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/europe/movies/kml/tiles/RT.europe.m7wv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Europe Africa Water Vapor - Unenhanced"
                },
                {
                    "I": "cimss-nep-ir",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -160.97, -1.9961, -89.02, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/eastpac/movies/kml/tiles/RT.eastpac.g9ir.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Infrared - Unenhanced"
                },
                {
                    "I": "cimss-nep-irnhc",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -160.97, -1.9961, -89.02, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/eastpac/movies/kml/tiles/RT.eastpac.g9irn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-nep-irdbd",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -160.97, -1.9961, -89.02, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/eastpac/movies/kml/tiles/RT.eastpac.g9irbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-nep-wv",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -160.97, -1.9961, -89.02, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/eastpac/movies/kml/tiles/RT.eastpac.g9wv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Water Vapor - Unenhanced"
                },
                {
                    "I": "cimss-nep-twp",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "R": [ -196.25, -6.75, -57.25, 64.25],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.epac.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Total Precipitable Water"
                },
                {
                    "I": "cimss-nep-twp2",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ -197.32, -3.43, -55.92, 63],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW2.epac.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthEast Pacific Total Precipitable Water (version 2)"
                },
                {
                    "I": "cimss-nwp-ir",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "R": [ 104.05, -1.9961, 176, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/westpac/movies/kml/tiles/RT.westpac.gmsir.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Infrared - Unenhanced"
                },
                {
                    "I": "cimss-nwp-irnhc",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ 104.05, -1.9961, 176, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/westpac/movies/kml/tiles/RT.westpac.gmsirn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-nwp-irdbd",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ 104.05, -1.9961, 176, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/westpac/movies/kml/tiles/RT.westpac.gmsirbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-nwp-wv",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ 104.05, -1.9961, 176, 51.9544],
                    "G": "http://tropic.ssec.wisc.edu/real-time/westpac/movies/kml/tiles/RT.westpac.gmswv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Water Vapor - Unenhanced"
                },
                {
                    "I": "cimss-nwp-twp",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ 82.68, -13.43, 224.08, 53],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.wpac.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Total Precipitable Water"
                },
                {
                    "I": "cimss-nwp-twp2",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "R": [ 82.68, -13.43, 224.08, 53],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW2.wpac.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "NorthWest Pacific Total Precipitable Water (version 2)"
                },
                {
                    "I": "cimss-io-ir",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "NC": true,
                    "R": [ 31.45, -30.5922, 128.59, 30.5564],
                    "G": "http://tropic.ssec.wisc.edu/real-time/indian/movies/kml/tiles/RT.indian.m5ir.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Infrared - Unenhanced"
                },
                {
                    "I": "cimss-io-irnhc",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "NC": true,
                    "R": [ 31.45, -30.5922, 128.59, 30.5564],
                    "G": "http://tropic.ssec.wisc.edu/real-time/indian/movies/kml/tiles/RT.indian.m5irn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-io-irdbd",
                    "T": "kml",
                    "H": true,
                    "P": true,
                    "C": true,
                    "NC": true,
                    "R": [ 31.45, -30.5922, 128.59, 30.5564],
                    "G": "http://tropic.ssec.wisc.edu/real-time/indian/movies/kml/tiles/RT.indian.m5irbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-io-wv",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "NC": true,
                    "R": [ 31.45, -30.5922, 128.59, 30.5564],
                    "G": "http://tropic.ssec.wisc.edu/real-time/indian/movies/kml/tiles/RT.indian.m5wv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Water Vapor - Unenhanced"
                },
                {
                    "I": "cimss-io-twp",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "NC": true,
                    "R": [ 23.25, -47.75, 146.75, 35],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.indo.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Total Precipitable Water"
                },
                {
                    "I": "cimss-io-twp2",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "NC": true,
                    "R": [ 22.27, -43.92, 141.73, 33.65],
                    "G": "http://tropic.ssec.wisc.edu/real-time/tpw/TPW2.indo.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Indian Ocean Total Precipitable Water (version 2)"
                },
                {
                    "I": "cimss-au-ir",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "NC": true,
                    "R": [ 79.03, -51.9933, 150.98, 1.957],
                    "G": "http://tropic.ssec.wisc.edu/real-time/austwest/movies/kml/tiles/RT.austwest.gmsir.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Western Australia Infrared - Unenhanced"
                },
                {
                    "I": "cimss-au-irnhc",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "NC": true,
                    "R": [ 79.03, -51.9933, 150.98, 1.957],
                    "G": "http://tropic.ssec.wisc.edu/real-time/austwest/movies/kml/tiles/RT.austwest.gmsirn.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Western Australia Infrared - NHC Enhancement"
                },
                {
                    "I": "cimss-au-irdbd",
                    "T": "kml",
                    "P": true,
                    "C": true,
                    "H": true,
                    "NC": true,
                    "R": [ 79.03, -51.9933, 150.98, 1.957],
                    "G": "http://tropic.ssec.wisc.edu/real-time/austwest/movies/kml/tiles/RT.austwest.gmsirbd.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Western Australia Infrared - Dvorak BD Enhancement"
                },
                {
                    "I": "cimss-au-wv",
                    "T": "kml",
                    "P": true,
                    "H": true,
                    "C": true,
                    "NC": true,
                    "R": [ 79.03, -51.9933, 150.98, 1.957],
                    "G": "http://tropic.ssec.wisc.edu/real-time/austwest/movies/kml/tiles/RT.austwest.gmswv.tiles-8.kml",
                    "S": "CIMSS/SSEC University of Wisconsin-Madison",
                    "U": "http://tropic.ssec.wisc.edu/",
                    "N": "Western Australia Water Vapor - Unenhanced"
                },
            ]
        },
        "usnrl": {
            "N": "U.S. Naval Research Laboratory",
            "icon":  "fa-globe",
            ">": [
                {
                    "P": true,
                    "I": "nrl-cloudtop",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-cloudtop.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/stitched/cloudtop/",
                    "N": "Convective Cloud Top Heights"
                },
                {
                    "P": true,
                    "I": "nrl-ir",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-ir.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/stitched/ir/",
                    "N": "Infrared Clouds"
                },/*
                {
                    "P": true,
                    "H": true,
                    "I": "nrl-irh",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-ir-large.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/geotiff/ir/",
                    "N": "Infrared Clouds (Huge Image)"
                },*/
                {
                    "P": true,
                    "I": "nrl-vis",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-vis.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/stitched/vis/",
                    "N": "Visible Clouds"
                },/*
                {
                    "P": true,
                    "H": true,
                    "I": "nrl-vish",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-vis-large.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/geotiff/vis/",
                    "N": "Visible Clouds (Huge Image)"
                },*/
                {
                    "P": true,
                    "I": "nrl-wv",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-wv.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/stitched/vapor/",
                    "N": "Water Vapor"
                },/*
                {
                    "P": true,
                    "H": true,
                    "I": "nrl-wvh",
                    "T": "kml",
                    "G": "http://climateviewer.org/layers/kml/2018/nrl/nrl-wv-large.kmz",
                    "S": "Imagery: US. Naval Research Laboratory, Marine Meteorology Division.",
                    "U": "http://www.nrlmry.navy.mil/archdat/global/geotiff/wv/",
                    "N": "Water Vapor (Huge Image)"
                },*/
            ]
        }
    },
    "CV": {
        "N": "ClimateViewer Maps",
        "icon": "fa-eye",
        "description": "<h3>Jim Lee, Creator of ClimateViewer 3D</h3><p>This section contains maps created by Jim Lee and found only on ClimateViewer 3D.<br><br><strong>More Info &bull; <a href='https://climateviewer.com/about/'>climateviewer.com/about/</a></strong><br><strong>Subscribe &bull; <a href='https://www.youtube.com/c/JimLee-ClimateViewer'>youtube.com/JimLee-ClimateViewer</a></strong></p><a href='https://climateviewer.com/about/'><img src='/dist/img/menu/Jim-Lee-Tree.jpg' style='width:420px' alt='Photo of Jim Lee' ></a>",
        "Nuclear": {
            "N": "Nuclear Explosions, Radiation, & Waste",
            "icon":  "fa-bomb",
            "description": "<h3>Why should I care about Nuclear Reactors?</h3><blockquote>&ldquo;Electricity is but the fleeting byproduct from nuclear reactors. The actual product is forever deadly radioactive waste.&rdquo;</blockquote><p><p><strong>More Info<br>&bull; <a href='https://climateviewer.com/nuclear-reactor-map/'>climateviewer.com/nuclear-reactor-map/</a></p><a href='https://climateviewer.com/nuclear-reactor-map/'><img src='/dist/img/menu/nuclear-reactor-map.jpg' alt='Nuclear Reactor Map' ></a>",
            ">": [
                {
                    "I": "radioactive-topten",
                    "T": "kml",
                    "R": [ -9.157, -22.066, 103.393,  77.548],
                    "M": true,
                    "G": "/dist/layers/kml/Ten-Most-Radioactive-Locations-On-Earth-CV3D.kmz",
                    "S": "Created by <a href='https://climateviewer.com/about/'>Jim Lee</a>.<a href='https://climateviewer.com/2013/11/24/10-most-radioactive-places-on-earth/'>climateviewer.com/2013/11/24/10-most-radioactive-places-on-earth/</a><br><br><img src='https://climateviewer.org/img/gallery/sellafield-plutonium-teeth1.jpg' alt='nuclear reactor map'>",
                    "U": "https://climateviewer.com/2013/11/24/10-most-radioactive-places-on-earth/",
                    "N": "Ten Most Radioactive Places on Earth"
                },
                {
                    "I": "tmi-fallout",
                    "T": "kml",
                    "NC": true,
                    "R": [ -76.994, 39.821, -76.395, 40.371],
                    "G": "/dist/layers/kml/Three-Mile-Island-meltdown-climateviewer-3d.kmz",
                    "S": "Created by <a href='https://climateviewer.com/about/'>Jim Lee</a>.<br><br><a href='http://en.wikipedia.org/wiki/Three_mile_island#Accident'>Partial melt-down and radioactive release</a> occurred on March 28, 1979 as a result of a loss of coolant systems.<br><br>Radiation Emissions and Cancer Inicidence Within 10 miles of the Three Mile Island nuclear accident, 1979. Source: <a href='http://web.archive.org/web/20150504222753/http://www.southernstudies.org/2009/04/investigation-revelations-about-three-mile-island-disaster-raise-doubts-over-nuclear-plant-s'>Investigation: Revelations about Three Mile Island disaster raise doubts over nuclear plant safety</a>",
                    "U": "https://climateviewer.com/nuclear-reactor-map/",
                    "N": "1979 Three Mile Island Fallout"
                },
                {
                    "I": "fuku-tsunami-seawater",
                    "T": "kml",
                    "R": [ 130, 15, 210, 45],
                    "G": "/dist/layers/kml/radioactive_seawater/part_51.kml",
                    "S": "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    "U": "http://web.archive.org/web/20160313073313/http://www.asrltd.com/japan/plume.php",
                    "N": "2011 Fukushima Radioactive Seawater (by March 2012)"
                },
                {
                    "I": "fuku-tsunami-seawater-anim",
                    "T": "kml",
                    "H": true,
                    "C": true,
                    "R": [ 130, 15, 210, 45],
                    "G": "/dist/layers/kml/fukushima-radioactive-seawater-climateviewer-3d.kmz",
                    "S": "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    "U": "http://web.archive.org/web/20160313073313/http://www.asrltd.com/japan/plume.php",
                    "N": "2011 Fukushima Radioactive Seawater (Animation)"
                },
                {
                    "I": "fuku-tsunami-debris",
                    "T": "kml",
                    "R": [ 130, 15, 210, 45],
                    "G": "/dist/layers/kml/tsunami_debris/part_51.kml",
                    "S": "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    "U": "http://web.archive.org/web/20160507040547/http://www.asrltd.com/japan/debris.php",
                    "N": "2011 Fukushima Tsunami Debris (by March 2012)"
                },
                {
                    "I": "fuku-tsunami-debris-anim",
                    "T": "kml",
                    "H": true,
                    "C": true,
                    "R": [ 130, 15, 210, 45],
                    "G": "/dist/layers/kml/fukushima-tsunami-debris-climateviewer-3d.kmz",
                    "S": "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    "U": "http://web.archive.org/web/20160507040547/http://www.asrltd.com/japan/debris.php",
                    "N": "2011 Fukushima Tsunami Debris (Animation)"
                }
            ]
        }
    },
    "basemaps": {
        "N": "Base Globe",
        "icon": "fa-globe",
        "id":"basemaps",
        ">": [
            {
                "X": true,
                "I": "World_Reference_Overlay",
                "T": "arcgis-base-layer",
                "G": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Reference_Overlay/MapServer",
                "S": "This map is designed to be used by GIS professionals to overlay base maps and thematic maps such as demographics or land cover for reference purposes. The reference map includes administrative boundaries, cities, water features, physiographic features, parks, landmarks, highways, roads, railways, and airports on a transparent background. The map was compiled from a variety of best available sources from several data providers, including the U.S. Geological Survey, National Park Service, DeLorme, and ESRI. The reference map currently provides coverage for the world down to a scale of ~1:1m and coverage for the continental United States and Hawaii to a scale of ~1:70k.",
                "U": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Reference_Overlay/MapServer",
                "N": "ESRI World Reference"
            },
            {
                "X": true,
                "I": "World_Boundaries_and_Places",
                "T": "arcgis-base-layer",
                "G": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer",
                "S": "This map presents country boundaries, first order (State/Province) internal administrative boundaries for most countries, second order administrative boundaries for the United States (counties) and some countries in Europe, and place names for the world. The map was developed by Esri using administrative and cities data from Esri; DeLorme basemap layers for the world; HERE data for North America, Europe, Australia, New Zealand, South America and Central America, Africa, and most of the Middle East; OpenStreetMap data for some features in select African countries; MapmyIndia data in India; and feature names from the GIS user community. This map is designed for use with maps with darker backgrounds, such as World Imagery.",
                "U": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer",
                "N": "ESRI World Boundaries and Places"
            },
            {
                "X": true,
                "I": "World_Boundaries_and_Places_Alternate",
                "T": "arcgis-base-layer",
                "G": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer",
                "S": "This map presents country boundaries, first order (State/Province) internal administrative boundaries for most countries, second order administrative boundaries for the United States (counties) and some countries in Europe, and place names for the world. The map was developed by Esri using administrative and cities data from Esri, HERE, DeLorme basemap layers for the world, and MapmyIndia data in India. Hydrographic names for select countries in Africa from OpenStreetMap contributors. and select features from the GIS user community. This map is designed for use with maps with lighter backgrounds, such as World Shaded Relief.",
                "U": "http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer",
                "N": "ESRI World Boundaries and Places (Alternate)"
            },
            {
                "X": true,
                "I": "World_Imagery",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                "S": "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                "N": "ESRI World Imagery"
            },
            {
                "X": true,
                "I": "World_Street_Map",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
                "S": "This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of Canada; Mexico; Europe; Japan; Australia and New Zealand; India; South America and Central America; Africa; and most of the Middle East. This comprehensive street map includes highways, major roads, minor roads, one-way arrow indicators, railways, water features, administrative boundaries, cities, parks, and landmarks, overlaid on shaded relief imagery for added context. The map also includes building footprints for selected areas. Coverage is provided down to ~1:4k with ~1:1k and ~1:2k data available in select urban areas. The street map was developed by Esri using Esri basemap data, DeLorme basemap layers, U.S. Geological Survey (USGS) elevation data, Intact Forest Landscape (IFL) data for the world; HERE data for Europe, Australia and New Zealand, North America, South America and Central America, Africa, and most of the Middle East; OpenStreetMap contributors for select countries in Africa; MapmyIndia data in India; and select data from the GIS user community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
                "N": "ESRI World Street Map"
            },
            {
                "X": true,
                "I": "Ocean_Basemap",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer",
                "S": "This map is designed to be used as a base map by marine GIS professionals and as a reference map by anyone interested in ocean data. The base map includes bathymetry, marine water body names, undersea feature names, and derived depth values in meters. Land features include administrative boundaries, cities, inland waters, roads, overlaid on land cover and shaded relief imagery. The map was compiled from a variety of best available sources from several data providers, including General Bathymetric Chart of the Oceans GEBCO_08 Grid, IHO-IOC GEBCO Gazetteer of Undersea Feature Names, National Oceanic and Atmospheric Administration (NOAA), and National Geographic, DeLorme, NAVTEQ, Geonames.org, and Esri, and various other contributors. The base map currently provides coverage for the world down to a scale of ~1:577k, and coverage down to 1:72k in US coastal areas, and various other areas. Coverage down to ~ 1:9k is available limited areas based on regional hydrographic survey data. The base map was designed and developed by Esri. NOTE: Data from the GEBCO_08 grid shall not to be used for navigation or for any other purpose relating to safety at sea. The GEBCO_08 Grid is largely based on a database of ship-track soundings with interpolation between soundings guided by satellite-derived gravity data. In some areas, data from existing grids are included. The GEBCO_08 Grid does not contain detailed information in shallower water areas, information concerning the generation of the grid can be found on GEBCO's web site: http://www.gebco.net/data_and_products/gridded_bathymetry_data. The GEBCO_08 Grid is accompanied by a Source Identifier (SID) Grid which indicates which cells in the GEBCO_08 Grid are based on soundings or existing grids and which have been interpolated. The latest version of both grids and accompanying documentation is available to download, on behalf of GEBCO, from the British Oceanographic Data Centre (BODC) https://www.bodc.ac.uk/data/online_delivery/gebco. The names of the IHO (International Hydrographic Organization), IOC (intergovernmental Oceanographic Commission), GEBCO (General Bathymetric Chart of the Oceans), NERC (Natural Environment Research Council) or BODC (British Oceanographic Data Centre) may not be used in any way to imply, directly or otherwise, endorsement or support of either the Licensee or their mapping system.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer",
                "N": "ESRI Oceans"
            },
            {
                "X": true,
                "I": "World_Physical_Map",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer",
                "S": "This map presents the Natural Earth physical map at 1.24km per pixel for the world and 500m for the coterminous United States.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer",
                "N": "ESRI World Physical"
            },
            {
                "X": true,
                "I": "World_Shaded_Relief",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
                "S": "This map portrays surface elevation as shaded relief. This map is used as a basemap layer to add shaded relief to other GIS maps, such as the ArcGIS Online World Street Map. It is especially useful in maps that do not contain orthoimagery. The map resolution (cell size) is as follows: 30 Meters for the U.S. 90 Meters for all land areas between 60° north and 56° south latitude. 1 KM resolution above 60° north and 56° south. The shaded relief imagery was developed by Esri using GTOPO30, Shuttle Radar Topography Mission (SRTM), and National Elevation Data (NED) data from the USGS.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
                "N": "ESRI World Shaded Relief"
            },
            {
                "X": true,
                "I": "World_Topo_Map",
                "T": "arcgis-base-layer",
                "L": "0",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer",
                "S": "This map is designed to be used as a basemap by GIS professionals and as a reference map by anyone. The map includes administrative boundaries, cities, water features, physiographic features, parks, landmarks, highways, roads, railways, and airports overlaid on land cover and shaded relief imagery for added context. The map provides coverage for the world down to a scale of ~1:72k. Coverage is provided down to ~1:4k for the following areas: Australia and New Zealand; India; Europe; Canada; Mexico; the continental United States and Hawaii; South America and Central America; Africa; and most of the Middle East. Coverage down to ~1:1k and ~1:2k is available in select urban areas. This basemap was compiled from a variety of best available sources from several data providers, including the U.S. Geological Survey (USGS), U.S. Environmental Protection Agency (EPA), U.S. National Park Service (NPS), Food and Agriculture Organization of the United Nations (FAO), Department of Natural Resources Canada (NRCAN), GeoBase, Agriculture and Agri-Food Canada, DeLorme, HERE, Esri, OpenStreetMap contributors, and the GIS User Community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer",
                "N": "ESRI World Topographic"
            },
            {
                "X": true,
                "I": "USA_Topo_Maps",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer",
                "S": "This map presents land cover imagery for the world and detailed topographic maps for the United States. The map includes the National Park Service (NPS) Natural Earth physical map at 1.24km per pixel for the world at small scales, i-cubed eTOPO 1:250,000-scale maps for the contiguous United States at medium scales, and National Geographic TOPO! 1:100,000 and 1:24,000-scale maps (1:250,000 and 1:63,000 in Alaska) for the United States at large scales. The TOPO! maps are seamless, scanned images of United States Geological Survey (USGS) paper topographic maps.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer",
                "N": "ESRI USA Topographic"
            },
            {
                "X": true,
                "I": "NatGeo_World_Map",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer",
                "S": "This map is designed to be used as a general reference map for informational and educational purposes as well as a base map by GIS professionals and other users for creating web maps and web mapping applications. The map was developed by National Geographic and Esri and reflects the distinctive National Geographic cartographic style in a multi-scale reference map of the world. The map was authored using data from a variety of leading data providers, including DeLorme, HERE, UNEP-WCMC, NASA, ESA, USGS, and others. This reference map includes administrative boundaries, cities, protected areas, highways, roads, railways, water features, buildings and landmarks, overlaid on shaded relief and land cover imagery for added context. The map currently includes global coverage down to ~1:144k scale and more detailed coverage for North America down to ~1:9k scale.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer",
                "N": "ESRI National Geographic"
            },
            {
                "X": true,
                "I": "DeLorme_World_Base_Map",
                "T": "arcgis-base-layer",
                "G": "https://services.arcgisonline.com/arcgis/rest/services/Specialty/DeLorme_World_Base_Map/MapServer",
                "S": "DeLorme’s basemap is designed to be used by GIS technicians and other mapping professionals, across a variety of industries. The DeLorme World Basemap is a seamless global data set with horizontal accuracy of +/- 50 meters. The map accurately portrays major transportation layers, inland and shoreline hydrography, agreed and disputed jurisdiction boundaries, and major geographic features. The map provides coverage for the world down to a scale of approximately 1:144k. In designing the map, DeLorme applied a rich cartographic look and feel to create a seamless view of the world, combining accurate object placement and projection with a compelling topographic visualization of the Earth. For more information on this map, including the terms of use, visit us online.",
                "U": "http://goto.arcgisonline.com/maps/Specialty/DeLorme_World_Base_Map",
                "N": "DeLorme World Map"
            },
            {
                "I": "bl-std",
                "T": "base-layer",
                "G": "https://stamen-tiles.a.ssl.fastly.net/toner/",
                "S": "A high contrast black and white map. Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                "U": "http://maps.stamen.com/",
                "N": "Stamen Toner"
            },
            {
                "I": "bl-stl",
                "T": "base-layer",
                "G": "https://stamen-tiles.a.ssl.fastly.net/toner-lite/",
                "S": "A high contrast black and white map (light colored version). Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                "U": "http://maps.stamen.com/",
                "N": "Stamen Toner (Light)"
            },
            {
                "I": "bl-swc",
                "T": "base-layer",
                "G": "https://stamen-tiles.a.ssl.fastly.net/watercolor/",
                "S": "Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect area washes and organic edges over a paper texture to add warm pop to any map. Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                "U": "http://maps.stamen.com/",
                "N": "Stamen Watercolor"
            },
            {
                "I": "bl-osm",
                "T": "base-layer",
                "G": "http://a.tile.openstreetmap.org/",
                "S": "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.",
                "U": "http://www.openstreetmap.org",
                "N": "OpenStreetMap (OSM)"
            },
            {
                "I": "bl-dark-matter",
                "T": "cartodb-layer",
                "G": "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                "S": "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                "U": "https://cartodb.com/basemaps/",
                "N": "Dark Matter"
            },
            {
                "I": "bl-dark-matter-nl",
                "T": "cartodb-layer",
                "G": "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
                "S": "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                "U": "https://cartodb.com/basemaps/",
                "N": "Dark Matter (No Labels)"
            },
            {
                "I": "bl-dark-matter-ol",
                "T": "cartodb-layer",
                "G": "http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
                "S": "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                "U": "https://cartodb.com/basemaps/",
                "N": "Dark Matter (Only Labels)"
            },
            {
                "I": "Bing_AERIAL_WITH_LABELS",
                "T": "bing",
                "G": "AERIAL_WITH_LABELS",
                "S": "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                "N": "Bing Maps Aerial with Labels"
            },
            {
                "I": "Bing_AERIAL",
                "T": "bing",
                "G": "AERIAL",
                "S": "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                "N": "Bing Maps Aerial"
            },
            {
                "I": "Bing_ROADS",
                "T": "bing",
                "G": "ROADS",
                "S": "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                "U": "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                "N": "Bing Maps Roads"
            }
        ]
    }
};
