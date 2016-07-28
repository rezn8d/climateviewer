/*
 LEGENED http://climateviewer.com/
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
    I: 'Climate-Viewer',
    Live: {
        N: "Alerts",
        Disasters: {
            N: "Disasters",
            icon: "fa-exclamation-circle",
            '>': [
                {
                    I: "pdc_integrated_active_hazards",
                    T: 'kml',
                    P: true,
                    G: "http://ags.pdc.org/arcgis/services/global_public/pdc_integrated_active_hazards/MapServer/KmlServer?Composite=false&LayerIDs=0%2C1%2C2",
                    S: "PDC's global active hazards mapservice. Data are dynamically updated in real-time. The Pacific Disaster Center's (PDC) Integrated Active Hazards Map Service includes PDC integrated hazards. This Map Service is offered in KML, WMS and WFS formats.",
                    U: "http://www.pdc.org/mde/services.jsp",
                    N: "PDC Integrated Active Hazards "
                },
                {
                    I: "ngdc_hazards",
                    T: 'arcgis-layer',
                    G: "http://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/hazards/MapServer",
                    L: '0,1,2,3,4,5,6,7,8,9,10,11',
                    S: "Natural hazards such as earthquakes, tsunamis, and volcanoes affect both coastal and inland areas. Long-term data from these events can be used to establish the past record of natural hazard event occurrences, which is important for planning, response, and mitigation of future events. NOAA's National Centers for Environmental Information (NCEI) plays a major role in post-event data collection. The data in this archive is gathered from scientific and scholarly sources, regional and worldwide catalogs, tide gauge reports, individual event reports, and unpublished works.",
                    U: "http://ngdc.noaa.gov/hazard/hazards.shtml",
                    N: "Historic Disasters"
                }
            ]
        },
        Earthquake: {
            N: "Earthquake",
            icon: "fa-rss",
            '>': [
                {
                    I: "usgs-all-hour",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - All Earthquakes (Last Hour)"
                },
                //{ I: "usgs-big-today", T: 'geojson', ML: "usgs-eq", MI: "/img/icons/earthquakes.png", G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson", S: "United States Geological Society (USGS) Earthquake Hazards Program", U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php", N: "USGS - Significant Earthquakes (Today)"},
                {
                    I: "usgs-45-today",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M4.5+ Earthquakes (Today)"
                },
                {
                    I: "usgs-25-today",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M2.5+ Earthquakes (Today)"
                },
                {
                    I: "usgs-all-today",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - All Earthquakes (Today)",
                    Y: true
                },
                //{ I: "usgs-big-7day", T: 'geojson', ML: "usgs-eq", MI: "/img/icons/earthquakes.png", G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", S: "United States Geological Society (USGS) Earthquake Hazards Program", U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php", N: "USGS - Significant Earthquakes (Last Week)"},
                {
                    I: "usgs-45-7day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M4.5+ Earthquakes (Last Week)"
                },
                {
                    I: "usgs-25-7day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M2.5+ Earthquakes (Last Week)"
                },
                {
                    I: "usgs-all-7day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - All Earthquakes (Last Week)",
                    Y: true
                },
                //{ I: "usgs-big-30day", T: 'geojson', ML: "usgs-eq", MI: "/img/icons/earthquakes.png", G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", S: "United States Geological Society (USGS) Earthquake Hazards Program", U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php", N: "USGS - Significant Earthquakes (Last Month)"},
                {
                    I: "usgs-45-30day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M4.5+ Earthquakes (Last Month)"
                },
                {
                    I: "usgs-25-30day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - M2.5+ Earthquakes (Last Month)"
                },
                {
                    I: "usgs-all-30day",
                    T: 'geojson',
                    ML: "usgs-eq",
                    MI: "/img/icons/earthquakes.png",
                    G: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
                    S: "United States Geological Society (USGS) Earthquake Hazards Program",
                    U: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
                    N: "USGS - All Earthquakes (Last Month)",
                    Y: true
                },
                {
                    I: "EarthquakesNT",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/EarthquakesNT/MapServer",
                    S: "©2015 Esri, Earthquake data for the last 90 days from the USGS. In addition to web-based maps and html pages, USGS provides several alternative ways to obtain real-time earthquake lists. Earthquake information is extracted from a merged catalog of earthquakes located by the USGS and contributing networks. Earthquakes will be broadcast within a few minutes for California events, and within 30-minutes for worldwide events",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "USGS - M3.0+ Earthquakes (Past 90 Days)"
                },
                {
                    I: "Earthquakes",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Earthquakes/MapServer",
                    S: "©2015 Esri, Earthquake data for the last 90 days from the USGS. In addition to web-based maps and html pages, USGS provides several alternative ways to obtain real-time earthquake lists. Earthquake information is extracted from a merged catalog of earthquakes located by the USGS and contributing networks. Earthquakes will be broadcast within a few minutes for California events, and within 30-minutes for worldwide events",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "USGS - All Earthquakes (Past 90 Days)"
                },
                {
                    I: "kml-emsc",
                    T: 'kml',
                    P: true,
                    G: "http://www.emsc-csem.org/Earthquake/Map/earth/kml.php",
                    S: "Centre Sismologique Euro-Méditerranéen (CSEM) Euro-Med earthquakes",
                    U: "http://www.emsc-csem.org/",
                    N: "Euro-Med Earthquakes - CSEM/EMSC"
                },
                {
                    P: true,
                    I: "kml-buoy",
                    T: 'kml',
                    G: "http://www.ndbc.noaa.gov/kml/marineobs_as_kml.php?sort=owner",
                    S: "National Oceanic and Atmospheric Administration (NOAA) National Data Buoy Center",
                    U: "http://www.ndbc.noaa.gov/",
                    N: "NOAA Buoys"
                }
            ]
        },
        Volcano: {
            N: "Volcano",
            icon: "fa-exclamation-triangle",
            '>': [
                {
                    I: "kml-volcano",
                    P: true,
                    MI: '/img/icons/volcano.png',
                    T: 'kml',
                    G: "http://www.volcano.si.edu/news/WeeklyVolcanoGE-Reports.kmz",
                    S: "Smithsonian Institute National Museum of History, Global Volcanism Program: Latest Volcanic Activity",
                    U: "http://www.volcano.si.edu/",
                    N: "Weekly Activity and Eruptions"
                },
                {
                    I: "gvp-volcanos",
                    T: 'geojson',
                    G: "/layers/geojson/gvp-volcanos-cv3d-v2.geojson",
                    MI: "/img/icons/volcano.png",
                    S: "Smithsonian Institute National Museum of History, Global Volcanism Program",
                    U: "http://www.volcano.si.edu/",
                    N: "Global Vocanoes"
                }
            ]
        },
        Fire: {
            N: "Fire",
            icon: "fa-fire",
            '>': [
                {
                    I: "MODIS_Thermal",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/MODIS_Thermal/MapServer",
                    S: "MODIS Global Fires is a product of NASA’s Earth Observing System Data and Information System (EOSDIS), part of NASA's Earth Science Data. EOSDIS integrates remote sensing and GIS technologies to deliver global MODIS hotspot/fire locations to natural resource managers and other stakeholders around the World.<br><br>MODIS stands for MODerate Resolution Imaging Spectroradiometer. The MODIS instrument is on board NASA’s Earth Observing System (EOS) Terra (EOS AM) and Aqua (EOS PM) satellites. The orbit of the Terra satellite goes from north to south across the equator in the morning and Aqua passes south to north over the equator in the afternoon resulting in global coverage every 1 to 2 days. The EOS satellites have a ±55 degree scanning pattern and orbit at 705 km with a 2,330 km swath width.<br><br>It takes approximately 2 – 4 hours after satellite overpass for MODIS Rapid Response to process the data, and for the Fire Information for Resource Management System (FIRMS) to update the website. Occasionally, hardware errors mean that it takes longer the 2-4 hours to process the data. Additional information on the MODIS system status can be found at MODIS Rapid Response. ",
                    U: "http://earthdata.nasa.gov/data/near-real-time-data/data/instrument/modis",
                    N: "Fire Dectection - NASA MODIS"
                },
                {
                    I: "kml-usda-fire",
                    Z: true,
                    T: 'kml',
                    P: true,
                    G: "http://activefiremaps.fs.fed.us/data/kml/conus.kmz",
                    S: "US Department of Agriculture (USDA) Forest Service Remote Sensing Applications Center, Active Fire Mapping Program",
                    U: "http://activefiremaps.fs.fed.us/",
                    N: "Active Fire Mapping Program - USDA"
                },
                {
                    I: "kml-noaa-fire",
                    T: 'kml',
                    P: true,
                    G: "http://www.ospo.noaa.gov/data/land/fire/fire.kml",
                    S: "National Oceanic and Atmospheric Administration (NOAA) Hazard Mapping System Fire and Smoke Product",
                    U: "http://www.ospo.noaa.gov/Products/land/hms.html",
                    N: "Fires Dectection - NOAA HMS"
                },
                {
                    I: "kml-noaa-smoke",
                    T: 'kml',
                    P: true,
                    G: "http://www.ospo.noaa.gov/data/land/fire/smoke.kml",
                    S: "National Oceanic and Atmospheric Administration (NOAA) Hazard Mapping System Fire and Smoke Product",
                    U: "http://www.ospo.noaa.gov/Products/land/hms.html",
                    N: "Smoke Dectection - NOAA HMS"
                },
                {
                    I: "ndgd-smoke-forecast",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NDGD_SmokeForecast/MapServer",
                    S: "The National Digital Guidance Database (NDGD) is a sister to the National Digital Forecast Database (NDFD). Information in NDGD may be used by NWS forecasters as guidance in preparing official NWS forecasts in NDFD. The experimental/guidance NDGD data is not an official NWS forecast product.<br><br>Smoke Forecast is the projected visible smoke from the Continental United States for 48 hours in 1 hour incriments. This data is updated every 24 hours by NWS ",
                    U: "http://www.nws.noaa.gov/ndgd/",
                    N: "Smoke Forecast - NDGD"
                },
                {
                    I: "nowcoast-wet-thunderstorm-fire",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/guidance_natlcenters_meteoceanhydro_outlooks_time/MapServer",
                    L: "7,11",
                    S: "This nowCOAST time-enabled map service provides maps of the latest NOAA/NWS Outlooks for Severe Thunderstorms (Convective Outlooks) and Critical Fire Weather for both Dry and Non-Dry Thunderstorms. These outlooks are issued by the NOAA/NWS/NCEP Storm Prediction Center (SPC) in Norman, Oklahoma. The colors used on the maps to indicate the locations and risk level of severe thunderstorms and critical fire weather conditions are the same as (or very close to) those used on SPC's outlook maps. To ensure the latest information is displayed, the maps of these outlooks are updated in this nowCOAST map service every half hour, but the underlying outlooks produced by SPC are usually issued only at 0100, 0600, 1300, 1630, 1730, and 2000 UTC However, amendments or more frequent updates will be issued as necessary.",
                    U: "http://www.nws.noaa.gov/ndgd/",
                    N: "Thunderstorm Critical Fire Weather Outlook"
                }
            ]
        },
        FEMA: {
            N: "FEMA",
            icon: "fa-eye",
            '>': [
                {
                    I: "wms-femad",
                    T: 'wms',
                    G: "http://gis.fema.gov/SOAP//FEMA/DECs/MapServer/WMSServer",
                    L: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
                    S: "Federal Emergency Management Agency (FEMA)",
                    U: "http://gis.fema.gov/DataFeeds.html",
                    N: "FEMA Current Disaster Declarations"
                },
                {
                    I: "wms-femah",
                    T: 'wms',
                    G: "http://gis.fema.gov/SOAP//FEMA/HistoricalDesignations/MapServer/WMSServer",
                    L: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
                    S: "Federal Emergency Management Agency (FEMA)",
                    U: "http://gis.fema.gov/DataFeeds.html",
                    N: "FEMA Historical Disaster Declarations"
                },
                {
                    I: "wms-femar",
                    T: 'wms',
                    G: "http://gis.fema.gov/SOAP//FEMA/RegHQs/MapServer/WMSServer",
                    L: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
                    S: "Federal Emergency Management Agency (FEMA)",
                    U: "http://gis.fema.gov/DataFeeds.html",
                    N: "FEMA Regions and Field Offices"
                },
                {
                    I: "wms-femae",
                    T: 'wms',
                    G: "http://gis.fema.gov/SOAP//FEMA/EvacRoutes/MapServer/WMSServer",
                    L: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
                    S: "Federal Emergency Management Agency (FEMA)",
                    U: "http://gis.fema.gov/DataFeeds.html",
                    N: "FEMA Hurricane Evacuation Routes"
                }
            ]
        },
        Report: {
            N: "CV Reports",
            icon: "fa-bullhorn",
            '>': [
                {
                    I: "cvr01",
                    T: 'geojson',
                    M: true,
                    MS: "2",
                    G: "/layers/geojson/cvreports-cv3d-v2.geojson",
                    MI: "/img/cv3d-red.png",
                    S: "Climate Viewer Reports",
                    U: "https://climateviewer.crowdmap.com/",
                    N: "CV Reports - 2011 - 2015"
                }
            ]
        }
/*        News: {
            N: "Energy News",
            icon: "fa-bolt",
            '>': [
                {
                    I: "CCR-Alternative-Energy",
                    T: 'kml',
                    P: true,
                    G: "http://alternative.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=346661585.98164&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Alternative Energy. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content.",
                    U: "http://alternative.carboncapturereport.org/cgi-bin/topic?",
                    N: "Alternative Energy Global News"
                },
                {
                    I: "CCR-Biofuels",
                    T: 'kml',
                    P: true,
                    G: "http://biofuels.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=111562052.54124&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Biofuels. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://biofuels.carboncapturereport.org/cgi-bin/topic?",
                    N: "Biofuels Global News"
                },
                {
                    I: "CCR-Carbon-Capture-Sequestration",
                    T: 'kml',
                    P: true,
                    G: "http://ccs.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=1031827101.41376&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Carbon Capture/Carbon Sequestration. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content.",
                    U: "http://ccs.carboncapturereport.org/cgi-bin/topic?",
                    N: "Carbon Capture/Carbon Sequestration Global News"
                },
                {
                    I: "CCR-Carbon-Credits",
                    T: 'kml',
                    P: true,
                    G: "http://carboncredits.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=1188882282.95717&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Carbon Credits. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content.",
                    U: "http://carboncredits.carboncapturereport.org/cgi-bin/topic?",
                    N: "Carbon Credits Global News"
                },
                {
                    I: "CCR-Climate-Change",
                    T: 'kml',
                    P: true,
                    G: "http://climatechange.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=721335467.961668&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Climate Change. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content.",
                    U: "http://climatechange.carboncapturereport.org/cgi-bin/topic?",
                    N: "Climate Change Global News"
                },
                {
                    I: "CCR-Coal",
                    T: 'kml',
                    P: true,
                    G: "http://coal.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=784447108.648423&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Coal. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://coal.carboncapturereport.org/cgi-bin/topic?",
                    N: "Coal Global News"
                },
                {
                    I: "CCR-Geothermal",
                    T: 'kml',
                    P: true,
                    G: "http://geothermal.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=794285841.080333&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Geothermal. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://geothermal.carboncapturereport.org/cgi-bin/topic?",
                    N: "Geothermal Global News"
                },
                {
                    I: "CCR-Hydroelectric",
                    T: 'kml',
                    P: true,
                    G: "http://hydro.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=540767190.4721&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Hydroelectric. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://hydro.carboncapturereport.org/cgi-bin/topic?",
                    N: "Hydroelectric Global News"
                },
                {
                    I: "CCR-Natural-Gas",
                    T: 'kml',
                    P: true,
                    G: "http://gas.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=928883228.782518&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Natural Gas. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://gas.carboncapturereport.org/cgi-bin/topic?",
                    N: "Natural Gas Global News"
                },
                {
                    I: "CCR-Nuclear",
                    T: 'kml',
                    P: true,
                    G: "http://nuclear.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=342434193.281327&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Nuclear. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://nuclear.carboncapturereport.org/cgi-bin/topic?",
                    N: "Nuclear Global News"
                },
                {
                    I: "CCR-Oil",
                    T: 'kml',
                    P: true,
                    G: "http://oil.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=1402798267.38011&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Oil. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://oil.carboncapturereport.org/cgi-bin/topic?",
                    N: "Oil Global News"
                },
                {
                    I: "CCR-Solar",
                    T: 'kml',
                    P: true,
                    G: "http://solar.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=427206841.047327&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Solar. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://solar.carboncapturereport.org/cgi-bin/topic?",
                    N: "Solar Global News"
                },
                {
                    I: "CCR-Wind",
                    T: 'kml',
                    P: true,
                    G: "http://wind.carboncapturereport.org/cgi-bin//dailyreport_kml?DATE=&r=604425479.159762&type=2",
                    S: "This page summarizes all English-language monitored mainstream and social media coverage worldwide of Wind. For each 24 hour period (midnight-midnight CST), a complete analytical report called the Daily Report summarizes all content. ",
                    U: "http://wind.carboncapturereport.org/cgi-bin/topic?",
                    N: "Wind Global News"
                }
            ]
        } */
    },
    weather: {
        N: "Weather",
        alerts: {
            N: "Weather Alerts",
            icon: "fa-bolt",
            '>': [
                {
                    I: "NOAA_storm_reports",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_storm_reports/MapServer",
                    S: "This map contains continuously updated US tornado reports, wind storm reports and hail storm reports. You can click on each to receive information about the specific location and read a short description about the issue. Each layer is generated hourly from data provided by NOAA’s National Weather Service Storm Prediction Center.",
                    U: "http://www.spc.noaa.gov/climo/reports",
                    N: "Storm Reports - NOAA"
                },
                {
                    I: "NOAA_short_term_warnings",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_short_term_warnings/MapServer",
                    S: "This service contains continuously updated US weather warnings. You can click on each to receive information about the specific location and read a short description about the issue. Each layer is generated hourly from data provided by NOAA’s National Weather Service Storm Prediction Center.",
                    U: "http://www.spc.noaa.gov/climo/reports",
                    N: "Short-term Warnings - NOAA"
                },
                {
                    I: "Weather_Warnings_Watches_Advisories_Statements",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Weather_Warnings_Watches_Advisories_Statements/MapServer",
                    S: "Weather Watches, Warnings, Advisories, and Statements are products of the National Weather Service (NWS). We automatically check these products for updates every 5 minutes from the NWS Public Alerts. The NWS XML Feed is parsed using the Aggregated Live Feeds methodology to take the returned information and serve the data through ArcGIS Server as a map service. ",
                    U: "http://alerts.weather.gov/",
                    N: "Warnings, Watches, Advisories - NOAA"
                },

                {
                    I: "nowcoast_wwa_meteoceanhydro_longduration_hazards_time",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer",
                    S: "This nowCOAST time-enabled map service provides maps depicting the geographic coverage of the latest NOAA/National Weather Service (NWS) WATCHES, WARNINGS, ADVISORIES, and STATEMENTS for long-duration hazardous weather, marine weather, hydrological, oceanographic, wildfire, air quality, and ecological conditions which may or are presently affecting inland, coastal, and maritime areas. A few examples include Gale Watch, Gale Warning, High Surf Advisory, High Wind Watch, Areal Flood Warning, Coastal Flood Watch, Winter Storm Warning, Wind Chill Advisory, Frost Advisory, Tropical Storm Watch, Red Flag Warning, Air Stagnation Warning, and Beach Hazards Statement. (A complete list is given in the Background Information section below.) The coverage areas of these products are usually defined by county or sub-county boundaries. The colors used to identify the different watches, advisories, warnings, and statements are the same colors used by the NWS on their map at weather.gov. The NWS products for long-duration hazardous conditions are updated in the nowCOAST map service approximately every 10 minutes.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "Watches &amp; Warnings for Long-Duration Hazards"
                },
                {
                    I: "nowcoast_wwa_meteoceanhydro_shortduration_hazards_warnings_time",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer",
                    S: "The nowCOAST time-enabled map service provides maps depicting the geographic coverage of the latest NOAA/National Weather Service (NWS) WARNINGS for short-duration hazards for inland, coastal, and maritime areas which are in progress, imminent, or has a very high probability of occurring. These hazards include severe thunderstorms (damaging winds, large hail), tornadoes, waterspouts, flash floods, and extreme winds associated with major land-falling hurricanes. Specifically, the layer includes the following warnings: Special Marine Warnings (winds of 34 knots, 3/4 inch diameter hail, waterspouts), Severe Thunderstorm Warnings (winds of 58 MPH or greater, large hail of 1 inch or greater in diameter), Tornado Warnings, Flash Flood Warnings, and Extreme Wind Warnings (sustained surface winds of 115 MPH or greater during major [Category 3 or higher]land-falling hurricane within one hour). The colors used to identify the different warnings are the same colors used by the NWS on their map at weather.gov. The map is updated in the nowCOAST map service every minute.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "Warnings for Short-Duration Hazards"
                },
                {
                    I: "nowcoast_wwa_meteoceanhydro_shortduration_hazards_watches_time",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer",
                    S: "This nowCOAST time-enabled map service provides maps depicting the geographic coverage of the latest NOAA/National Weather Service (NWS) WATCHES for the following short-duration hazardous weather and hydrological events which may affect inland and coastal areas: severe thunderstorms (surface winds of 58 MPH (93 KM/H, 50 knots) or greater, large hail of 1 inch (2.5 cm) or greater in diameter, tornadoes, and flash floods. A watch indicates that the risk of hazardous weather or hydrologic event has increased significantly, but its occurrence, location, and/or timing is still uncertain. The geographic areas covered by Severe Thunderstorm, Tornado, and Flash Flood Watches are usually indicated by county or subdivided-county boundaries. The colors used to identify the different watches are the same colors used by the NWS on their map at weather.gov. The NWS watches are updated in the nowCOAST map service approximately every 10 minutes.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "Watches for Short-Duration Hazards"
                },
                {
                    X: true,
                    I: "nowcoast-thunderstorm-outlook",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/guidance_natlcenters_meteoceanhydro_outlooks_time/MapServer",
                    L: "3,7,11",
                    S: "This nowCOAST time-enabled map service provides maps of the latest NOAA/NWS Outlooks for Severe Thunderstorms (Convective Outlooks) and Critical Fire Weather for both Dry and Non-Dry Thunderstorms. These outlooks are issued by the NOAA/NWS/NCEP Storm Prediction Center (SPC) in Norman, Oklahoma. The colors used on the maps to indicate the locations and risk level of severe thunderstorms and critical fire weather conditions are the same as (or very close to) those used on SPC's outlook maps. To ensure the latest information is displayed, the maps of these outlooks are updated in this nowCOAST map service every half hour, but the underlying outlooks produced by SPC are usually issued only at 0100, 0600, 1300, 1630, 1730, and 2000 UTC However, amendments or more frequent updates will be issued as necessary.",
                    U: "http://www.nws.noaa.gov/ndgd/",
                    N: "NOAA NWS NCEP Severe Thunderstorm Outlooks"
                },
                {
                    X: true,
                    I: "nowcoast_sat_meteo_emulated_imagery_lightningstrikedensity_goes_time",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer",
                    S: "This nowCOAST time-enabled map service provides maps of experimental lightning strike density data from the NOAA/National Weather Service/NCEP's Ocean Prediction Center (OPC) which emulate (simulate) data from the future NOAA GOES-R Global Lightning Mapper (GLM). The purpose of this experimental product is to provide mariners and others with enhanced &ldquo;awareness of developing and transitory thunderstorm activity, to give users the ability to determine whether a cloud system is producing lightning and if that activity is increasing or decreasing...&rdquo; Lightning Strike Density, as opposed to display of individual strikes, highlights the location of lightning cores and trends of increasing and decreasing activity. The maps depict the density of lightning strikes during a 15 minute time period at an 8 km x 8 km spatial resolution. The lightning strike density maps cover the geographic area from 25 degrees South to 80 degrees North latitude and from 110 degrees East to 0 degrees West longitude. The map units are number of strikes per square km per minute multiplied by a scaling factor of 10^3. The strike density is color coded using a color scheme which allows the data to be easily seen when overlaid on GOES imagery and to distinguish values at low density values. The maps are updated on nowCOAST approximately every 15 minutes. The latest data depicted on the maps are approximately 12 minutes old (or older). The OPC lightning strike density product is still experimental and may not always be available. Given the spatial resolution and latency of the data, the data should NOT be used to activite your lightning safety plans. Always follow the safety rule: when you first hear thunder or see lightning in your area, activate your emergency plan. If outdoors, immediately seek shelter in a substantial building or a fully enclosed metal vehicle such as a car, truck or a van. Do not resume activities until 30 minutes after the last observed lightning or thunder.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "Lightning Strike Density - GOES-R"
                },
                {
                    P: true,
                    I: "kml-nwshlog",
                    T: 'kml',
                    M: true,
                    MI: "/img/icons/lightning_bolt.png",
                    G: "http://wdssii.nssl.noaa.gov/geotiff/kml/NwsHourlyStormLogs.kml",
                    S: "NOAA National Severe Storms Laboratory, Warning Decision Support System - Integrated Information (WDSS-II)",
                    U: "http://wdssii.nssl.noaa.gov/",
                    N: "NOAA/NWS Hourly Storm Log"
                },
                {
                    P: true,
                    I: "kml-nwsdlog",
                    T: 'kml',
                    M: true,
                    MI: "/img/icons/lightning_bolt.png",
                    G: "http://wdssii.nssl.noaa.gov/geotiff/kml/NwsDailyStormLogs.kml",
                    S: "NOAA National Severe Storms Laboratory, Warning Decision Support System - Integrated Information (WDSS-II)",
                    U: "http://wdssii.nssl.noaa.gov/",
                    N: "NOAA/NWS Daily Storm Log"
                }
            ]
        },
        radar: {
            N: "Weather Radar",
            icon: "fa-signal",
            '>': [
                {
                    X: true,
                    I: "mesonet-nexrad",
                    T: 'wms',
                    G: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi",
                    L: "nexrad_base_reflect",
                    S: "Iowa State University of Science and Technology MESONET",
                    U: "http://mesonet.agron.iastate.edu/ogc/",
                    N: "NEXRAD Radar - Base Reflectivity"
                },
                {
                    X: true,
                    I: "nowcoast_radar_meteo_imagery_nexrad_time",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer",
                    S: "This nowCOAST time-enabled map service provides maps of NOAA/National Weather Service RIDGE2 mosaics of base reflectivity images across the Continental United States (CONUS) as well as Puerto Rico, Hawaii, Guam and Alaska with a 2 kilometer (1.25 mile) horizontal resolution. The mosaics are compiled by combining regional base reflectivity radar data obtained from 158 Weather Surveillance Radar 1988 Doppler (WSR-88D) also known as NEXt-generation RADar (NEXRAD) sites across the country operated by the NWS and the Dept. of Defense and also from data from Terminal Doppler Weather Radars (TDWR) at major airports. The colors on the map represent the strength of the energy reflected back toward the radar. The reflected intensities (echoes) are measured in dBZ (decibels of z). The color scale is very similar to the one used by the NWS RIDGE2 map viewer. The radar data itself is updated by the NWS every 10 minutes during non-precipitation mode, but every 4-6 minutes during precipitation mode. To ensure nowCOAST is displaying the most recent data possible, the latest mosaics are downloaded every 5 minutes. For more detailed information about the update schedule, see:",
                    U: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer",
                    N: "NEXRAD Radar - RIDGE2 mosaics"
                },
                {
                    I: "radar_coverage_230km",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/geo/radar_coverage/MapServer",
                    L: "0",
                    S: "National Climatic Data Center, NESDIS, NOAA, U.S. Department of Commerce",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "Maximum Radar Ranges (230 km)"
                },
                {
                    I: "radar_coverage_4k",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/geo/radar_coverage/MapServer",
                    L: "1",
                    S: "National Climatic Data Center, NESDIS, NOAA, U.S. Department of Commerce",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "Radar Coverage 4,000 ft Above Ground"
                },
                {
                    I: "radar_coverage_6k",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/geo/radar_coverage/MapServer",
                    L: "2",
                    S: "National Climatic Data Center, NESDIS, NOAA, U.S. Department of Commerce",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "Radar Coverage 6,000 ft Above Ground"
                },
                {
                    I: "radar_coverage_10k",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/geo/radar_coverage/MapServer",
                    L: "3",
                    S: "National Climatic Data Center, NESDIS, NOAA, U.S. Department of Commerce",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "Radar Coverage 10,000 ft Above Ground"
                },
                {
                    I: "radar_coverage_max",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/geo/radar_coverage/MapServer",
                    L: "4",
                    S: "National Climatic Data Center, NESDIS, NOAA, U.S. Department of Commerce",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "Maximum Radar Coverage"
                }
            ]
        },
        surface: {
            N: "Surface Observations",
            icon: "fa-location-arrow",
            '>': [
                {
                    I: "nws_wfo_conus",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer",
                    S: "The National Oceanic and Atmospheric Administration (NOAA) provided METARs (The acronym roughly translates from French as Aviation Routine Weather Report) typically come from airports or permanent weather observation stations. Reports are generated once an hour or half an hour, but if conditions change significantly, a report known as a special (SPECI) may be issued. Some METARs are encoded by automated airport weather stations located at airports, military bases, and other sites. Some locations still use augmented observations, which are recorded by digital sensors, encoded via software, and then reviewed by certified weather observers or forecasters prior to being transmitted. Observations may also be taken by trained observers or forecasters who manually observe and encode their observations prior to transmission.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Wind Speed &amp; Direction - NOAA METAR"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_weather",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "1",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Surface Weather Observation Stations"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_ocean",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "4",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Ocean/Estuary/Lake Observation Stations"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_river",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "7",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "River Observation Stations"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_water",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "10",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Water Quality Observation Stations"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_air",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "13",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Air Quality Observation Stations"
                },
                {
                    I: "obs_meteoceanhydro_insitu_pts_geolinks_radiosonde",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteoceanhydro_insitu_pts_geolinks/MapServer",
                    L: "16",
                    S: "Maps depicting locations of surface weather, oceanographic, river, water quality, and air quality observing stations, gages, and other types of observing platforms in the USA. These includes but not limited to observations from airports (ASOS, AWOS), coastal stations (C-MAN, NWLON, PORTS, NERRS), oil rigs, state mesonets, state air quality stations, state water quality stations, fixed buoys, drifting buoys, USGS river gages, weather stations, and water quality stations, voluntary observing ships, regional ocean observing systems and other networks (e.g. RAWS, Climate Reference Network) along with hyperlinks to web pages posting recent data from these observing platforms. It also provides maps of upper-air observations from radiosonde stations and hyperlinks to web pages posting recent data from these sounding stations.",
                    U: "http://www.ncdc.noaa.gov/oa/wdc/metar/",
                    N: "Upper-Air Radiosonde (Atmospheric Soundings)"
                },
                {
                    I: "obs_meteocean_insitu_sfc_time",
                    T: 'arcgis-layer',
                    G: "http://new.nowcoast.noaa.gov/arcgis/rest/services/nowcoast/obs_meteocean_insitu_sfc_time/MapServer",
                    S: "This nowCOAST time-enabled map service provides map depicting the latest surface weather and marine weather observations at observing sites using the international station model. The station model is method for representing information collected at an observing station using symbols and numbers. The station model depicts current weather conditions, cloud cover, wind speed, wind direction, visibility, air temperature, dew point temperature, sea surface water temperature, significant wave height, air pressure adjusted to mean sea level, and the change in air pressure over the last 3 hours. The circle in the model is centered over the latitude and longitude coordinates of the station. The total cloud cover is expressed as a fraction of cloud covering the sky and is indicated by the amount of circle filled in. (Cloud cover is not presently displayed due to a problem with the source data. Present weather information is also not available for display at this time.) Wind speed and direction are represented by a wind barb whose line extends from the cover cloud circle towards the direction from which the wind is blowing. The short lines or flags coming off the end of the long line are called barbs. The barb indicates the wind speed in knots. Each normal barb represents 10 knots, while short barbs indicate 5 knots. A flag represents 50 knots. If there is no wind barb depicted, an outer circle around the cloud cover symbol indicates calm winds. The map of observations are updated in the nowCOAST map service approximately every 10 minutes. However, since the reporting frequency varies by network or station, the observation at a particular station may have not updated and may not update until after the next hour.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "METAR Observations"
                }
            ]
        },
        rain: {
            N: "Precipitation",
            icon: "fa-umbrella",
            ">": [
                {
                    I: "usdroughtoutlook",
                    T: 'arcgis-layer',
                    G: "http://gis.ncdc.noaa.gov/arcgis/rest/services/nidis/usdroughtoutlook/MapServer",
                    S: "Climate Prediction Center (CPC)",
                    U: "http://www.cpc.ncep.noaa.gov/",
                    N: "US Drought Outlook"
                },
                {
                    P: true,
                    I: "kml-usdrought",
                    T: 'kml',
                    G: "http://torka.unl.edu:8080/dm/data/kml/current/usdm_current.kmz",
                    S: "University of Nebraska-Lincoln, US. Drought Monitor",
                    U: "http://droughtmonitor.unl.edu/",
                    N: "US. Drought Monitor"
                },
                {
                    I: "AHPS-StreamGauge",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/StreamGauge/MapServer",
                    S: "NOAA Advanced Hydrologic Prediction Service (AHPS). Stream Gauge is a product of National Oceanic and Atmospheric Administration (NOAA). This gives us readings of stream gauges around the US, which depict the current water level in the measured areas.",
                    U: "http://water.weather.gov/ahps/",
                    N: "USGS - All Earthquakes (Past 90 Days)"
                },

                {
                    P: true,
                    I: "kml-usshour",
                    T: 'kml',
                    G: "http://www.wpc.ncep.noaa.gov/kml/qpf/QPF6hr_f00-f06_latest.kml",
                    S: "NOAA National Weather Service, Weather Prediction Center, HPC Quantitative Precipitation Forecasts (QPFs)",
                    U: "http://www.wpc.ncep.noaa.gov/",
                    N: "US. 6-hour Forecast"
                },
                {
                    P: true,
                    I: "kml-usstfhour",
                    T: 'kml',
                    G: "http://www.wpc.ncep.noaa.gov/kml/qpf/QPF24hr_Day1_main.kml",
                    S: "NOAA National Weather Service, Weather Prediction Center, HPC Quantitative Precipitation Forecasts (QPFs)",
                    U: "http://www.wpc.ncep.noaa.gov/",
                    N: "US. 24-hour Forecast"
                },
                {
                    P: true,
                    I: "kml-ussfd",
                    T: 'kml',
                    G: "http://www.wpc.ncep.noaa.gov/kml/qpf/QPF120hr_Day1-5_latest.kml",
                    S: "NOAA National Weather Service, Weather Prediction Center, HPC Quantitative Precipitation Forecasts (QPFs)",
                    U: "http://www.wpc.ncep.noaa.gov/",
                    N: "US. 5-day Forecast"
                },
                {
                    P: true,
                    I: "kml-ussfdflood",
                    T: 'kml',
                    G: "http://www.wpc.ncep.noaa.gov/kml/fop/fop.kml",
                    S: "NOAA National Weather Service, Weather Prediction Center, 5-Day Significant River Flood Outlook",
                    U: "http://www.wpc.ncep.noaa.gov/",
                    N: "US. Significant Flood Risk"
                },
                {
                    P: true,
                    H: true,
                    I: "kml-usfloods",
                    T: 'kml',
                    G: "http://water.weather.gov/ahps/worldfiles/ahps_national_fcst.kmz",
                    S: "NOAA National Weather Service, River Observations",
                    U: "http://water.weather.gov/ahps/",
                    N: "US. River Flood Levels"
                },
                {
                    P: true,
                    I: "kml-trmmgf",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_hydro_model_b.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/publications_dir/potential_flood_hydro.html",
                    N: "Global Flood Forecast"
                },
                {
                    P: true,
                    I: "kml-trmmgff",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_G5_extended_hydro_model.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/publications_dir/potential_flood_hydro.html",
                    N: "5-day Flood Forecast"
                },
                {
                    P: true,
                    I: "kml-trmmthr",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/3B42_rain_accumulation_3hr.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "3-hour Accumulated Rainfall"
                },
                {
                    P: true,
                    I: "kml-trmmtfhr",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/3B42_rain_accumulation_24hr_b.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "24-hour Accumulated Rainfall"
                },
                {
                    P: true,
                    I: "kml-trmmsthr",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/3B42_rain_accumulation_72hr_b.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "72-hour Accumulated Rainfall"
                },
                {
                    P: true,
                    I: "kml-trmmosehr",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/3B42_rain_accumulation_168hr_b.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "168-hour Accumulated Rainfall"
                },
                {
                    P: true,
                    I: "kml-trmmav",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/30_day_average.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "30-day Average Rainfall"
                },
                {
                    P: true,
                    I: "kml-trmman",
                    T: 'kml',
                    G: "http://trmm.gsfc.nasa.gov/trmm_rain/Events/30_day_anomaly.kml",
                    S: "NASA Tropical Rainfall Measuring Mission (TRMM)",
                    U: "http://trmm.gsfc.nasa.gov/",
                    N: "30-day Anomaly Rainfall"
                },
                {
                    P: true,
                    I: "kml-eumetod",
                    T: 'kml',
                    G: "http://oiswww.eumetsat.int/IPPS/html/GE/MET0D_VP-MPE.kml",
                    S: "European Organisation for the Exploitation of Meteorological Satellites (EUMETSAT) Meteosat 0 degree Multi-Sensor Precipitation Estimate (MPE) ",
                    U: "http://www.eumetsat.int/website/home/Data/Products/index.html",
                    N: "Meteosat METOD"
                },
                {
                    P: true,
                    I: "kml-euiodc",
                    T: 'kml',
                    G: "http://oiswww.eumetsat.int/IPPS/html/GE/IODC_VP-MPE.kml",
                    S: "European Organisation for the Exploitation of Meteorological Satellites (EUMETSAT) Meteosat IODC Multi-Sensor Precipitation Estimate (MPE) ",
                    U: "http://www.eumetsat.int/website/home/Data/Products/index.html",
                    N: "Meteosat IODC"
                },
                {
                    P: true,
                    I: "kml-usdanrcs",
                    T: 'kml',
                    G: "http://www.wcc.nrcs.usda.gov/ftpref/data/water/wcs/earth/snotelwithoutlabels.kmz",
                    S: "USDA Natural ReSs Conservation Service (NRCS)",
                    U: "http://www.wcc.nrcs.usda.gov/",
                    N: "SNOTEL Snowfall Monitors"
                },
                {
                    P: true,
                    I: "kml-nohrsc",
                    T: 'kml',
                    G: "http://www.nohrsc.noaa.gov/snow_model/GE/latest_nohrsc_nsm.kmz",
                    S: "National Weather Service, National Operational Hydrologic Remote Sensing Center (NOHRSC)",
                    U: "http://www.nohrsc.noaa.gov/",
                    N: "NOHRSC Snowfall Monitors"
                }
            ]
        },
        canes: {
            N: "Tropical Cyclones",
            icon: "fa-cloud",
            '>': [
                {
                    I: "hc_nc_observed_track",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "8",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Observed Track"
                },
                {
                    I: "hc_nc_observed_positions",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "7",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Observed Positions"
                },
                {
                    I: "hc_nc_forecast_track",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "4",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Forecast Track"
                },
                {
                    I: "hc_nc_forecast_positions",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "3",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Forecast Positions"
                },
                {
                    I: "hc_nc_error_cone",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "5",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Cone of Error"
                },
                {
                    I: "hc_nc_coast_watch_warn",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "2",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Watches and Warnings"
                },
                {
                    I: "hc_nc_surface_winds",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    L: "9",
                    S: "This nowCOAST time-enabled map service provides maps depicting the latest official NWS tropical cyclone forecast tracks and watches and warnings for all active systems in the Atlantic, Caribbean Sea, Gulf of Mexico, Eastern Pacific Ocean, and Central Pacific Ocean. The map layer displays the cyclone's present location, past locations (best track), maximum estimated sustained surface wind (MPH), wind gusts, mean sea level pressure (millibars), forecasts of the cyclone's surface positions, maximum sustained winds and gusts at 12, 24, 36, 48, 72, 96 and 120 hours, and uncertainty of the forecast track depicted as a cone. Best track information is available for all storms in the Atlantic, Caribbean Sea, Gulf of Mexico and Eastern Pacific Ocean but not for storms in the Central Pacific Ocean. The track forecasts are based on information from the NWS/National Hurricane Center (NHC) and NWS/Central Pacific Hurricane Center (CPHC) Tropical Cyclone Public Advisories. This map service is updated twice per hour in order to obtain and display the latest information from the regularly scheduled NHC tropical cyclone public advisories as well as any intermediate or special public advisories.",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "nowCOAST Observed Surface Wind Swath"
                },
                {
                    I: "hc_observed_track",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "3",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Observed Track"
                },
                {
                    I: "hc_past_position",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "1",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Past Positions"
                },
                {
                    I: "hc_forecast_track",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "2",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Forecast Track"
                },
                {
                    I: "hc_forecast_position",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "0",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Forecast Positions"
                },
                {
                    I: "hc_error_cone",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "4",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Cone of Error"
                },
                {
                    I: "hc_warn_watch",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    L: "5",
                    S: "NOAA NWS National Hurricane Center (NHC), Central Pacific Hurricane Center (CPHC), Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments., Joint Typhoon Warning Center (JTWC)<br><br>This product aids in the visualization of an NHC official track forecast, the forecast points are connected by black line segments. The track line(s) are not a forecast product, however, and because there are an infinite number of ways to connect a set of forecast points, the lines should not be interpreted as representing a specific forecast for the location of a tropical cyclone in between official forecast points. It is also important to remember that tropical cyclone track forecasts are subject to error, and that the effects of a tropical cyclone can span many hundreds of miles from the center.",
                    U: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer",
                    N: "NOAA/USNO Watches and Warnings"
                },
                {
                    I: "hc_historic_tracks",
                    T: 'arcgis-layer',
                    G: "http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Recent/MapServer",
                    S: "Past Positions and Observed Track are products of the National Hurricane Center (NHC). We automatically check these products for updates every 15 minutes from the NHC GIS Data page.",
                    U: "http://www.nhc.noaa.gov/gis/",
                    N: "Past Hurricane Tracks"
                },
                {
                    P: true,
                    I: "kml-hurrgdacs",
                    T: 'kml',
                    G: "http://www.gdacs.org/xml/gdacs.kml",
                    S: " Global Disaster Alert and Coordination System (GDACS)",
                    U: "http://www.gdacs.org/",
                    N: "Hurricane Tracker (GDACS)"
                }
            ]
        }
    },
    satellites: {
        N: "Satellites",
        sat: {
            N: "Satellite Imagery",
            icon: "fa-globe",
            '>': [
                {
                    I: "MODIS_Terra_CorrectedReflectance_TrueColor",
                    T: 'nasa-gibs',
                    S: "NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Service (GIBS)",
                    U: "https://earthdata.nasa.gov/",
                    N: "MODIS Terra - Corrected Reflectance (True Color)"
                },
                {
                    I: "MODIS_Terra_CorrectedReflectance_Bands721",
                    T: 'nasa-gibs',
                    S: "NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Service (GIBS)",
                    U: "https://earthdata.nasa.gov/",
                    N: "MODIS Terra - Corrected Reflectance (Bands 7-2-1)"
                },
                {
                    I: "MODIS_Terra_CorrectedReflectance_Bands367",
                    T: 'nasa-gibs',
                    S: "NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Service (GIBS)",
                    U: "https://earthdata.nasa.gov/",
                    N: "MODIS Terra - Corrected Reflectance (Bands 3-6-7)"
                },
                {
                    I: "MODIS_Terra_SurfaceReflectance_Bands121",
                    T: 'nasa-gibs',
                    S: "NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Service (GIBS)",
                    U: "https://earthdata.nasa.gov/",
                    N: "MODIS Terra - Land Surface Reflectance (Bands 1-2-1)"
                },
                {
                    P: true,
                    I: "kml-usnmsir",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/3rdparty/weather/clouds/USN-multisat-ir-CVDB.kmz",
                    S: "Image S: US. Naval Research Laboratory, Marine Meteorology Division. Google Earth overlay by Jim Lee",
                    U: "http://www.nrlmry.navy.mil/archdat/global/stitched/ir/",
                    N: "Infrared Clouds - NRL"
                },
                {
                    I: "nowcoast_sat_meteo_imagery_goes_time_im",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_goes_time/MapServer",
                    L: "1,2,3",
                    S: "This nowCOAST time-enabled map service provides maps depicting visible, infrared, and water vapor imagery composited from NOAA/NESDIS GOES-EAST and GOES-WEST. The horizontal resolutions of the IR, visible, and water vapor composite images are approximately 1km, 4km, and 4km, respectively. The visible and IR imagery depict the location of clouds. The water vapor imagery indicates the amount of water vapor contained in the mid to upper levels of the troposphere. The darker grays indicate drier air while the brighter grays/whites indicates more saturated air. The GOES composite imagers are updated in the nowCOAST map service every 30 minutes. ",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "GOES E+W - Visible"
                },
                {
                    I: "nowcoast_sat_meteo_imagery_goes_time_wv",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_goes_time/MapServer",
                    L: "4,5,6,7",
                    S: "This nowCOAST time-enabled map service provides maps depicting visible, infrared, and water vapor imagery composited from NOAA/NESDIS GOES-EAST and GOES-WEST. The horizontal resolutions of the IR, visible, and water vapor composite images are approximately 1km, 4km, and 4km, respectively. The visible and IR imagery depict the location of clouds. The water vapor imagery indicates the amount of water vapor contained in the mid to upper levels of the troposphere. The darker grays indicate drier air while the brighter grays/whites indicates more saturated air. The GOES composite imagers are updated in the nowCOAST map service every 30 minutes. ",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "GOES E+W - Water Vapor"
                },
                {
                    I: "nowcoast_sat_meteo_imagery_goes_time_ir",
                    T: 'arcgis-layer',
                    G: "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_goes_time/MapServer",
                    L: "8,9,10,11",
                    S: "This nowCOAST time-enabled map service provides maps depicting visible, infrared, and water vapor imagery composited from NOAA/NESDIS GOES-EAST and GOES-WEST. The horizontal resolutions of the IR, visible, and water vapor composite images are approximately 1km, 4km, and 4km, respectively. The visible and IR imagery depict the location of clouds. The water vapor imagery indicates the amount of water vapor contained in the mid to upper levels of the troposphere. The darker grays indicate drier air while the brighter grays/whites indicates more saturated air. The GOES composite imagers are updated in the nowCOAST map service every 30 minutes. ",
                    U: "http://new.nowcoast.noaa.gov/help/#section=updateschedule",
                    N: "GOES E+W - Longwave Infrared"
                }
            ]
        },
        satAnimation: {
            N: "Satellite Animations",
            icon: "fa-film",
            '>': [
                {
                    P: true,
                    C: true,
                    I: "sat15",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.natl.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North Atlantic - Total Precipitable Water"
                },
                {
                    P: true,
                    C: true,
                    I: "sat16",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.epac.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North East Pacific - Total Precipitable Water"
                },
                {
                    P: true,
                    C: true,
                    I: "sat17",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.wpac.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North West Pacific - Total Precipitable Water"
                },
                {
                    P: true,
                    C: true,
                    I: "sat18",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.indo.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "Indian Ocean - Total Precipitable Water"
                },
                {
                    P: true,
                    C: true,
                    I: "sat19",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/tpw/TPW.ausf.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "Western Australia - Total Precipitable Water"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat09",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaiceir.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "East North Atlantic Region - Infrared"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat10",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaicewv.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North Atlantic Region - Water Vapor"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat11",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaicwir.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North Pacific Region - Infrared"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat12",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaicwwv.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "North Pacific Region - Water Vapor"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat13",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaicsir.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "South Pacific Region - Infrared"
                },
                {
                    P: true,
                    H: true,
                    C: true,
                    I: "sat14",
                    T: 'kml',
                    G: "http://tropic.ssec.wisc.edu/real-time/mosaic/movies/kml/tiles/RT.mosaic.mosaicswv.tiles.kml",
                    S: "CIMSS/SSEC University of Wisconsin-Madison",
                    U: "http://tropic.ssec.wisc.edu/",
                    N: "South Pacific Region - Water Vapor"
                }
            ]
        }
    },
    pollution: {
        N: "Pollution",
        fossilfuel: {
            N: "Fossil Fuel",
            icon: "fa-plug",
            '>': [
                {
                    H: true,
                    T: 'geojson',
                    MS: "3",
                    MI: '/img/icons/oil_well.png',
                    I: "p07",
                    G: "/layers/geojson/Fracking-Chemical-Reports-cv3d-v2.geojson",
                    S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>SkyTruth released a database on the chemicals used during the process of hydraulic fracturing, or “fracking,” at oil and gas wells across the United States. These data (which took a heckuva lot of work for us to compile) are being made freely available to the public for research and analysis. We're doing this in the hope that this information will facilitate credible research on this nationally significant issue, and will promote discussion about effective public disclosure. </p>",
                    U: "http://blog.skytruth.org/2012/11/skytruth-releases-fracking-chemical.html",
                    N: "Fracking America"
                },
                {
                    C: true,
                    Z: true,
                    I: "nrdc-drinking-water-impacts",
                    T: 'geojson',
                    G: "/layers/geojson/nrdc-drinking-impacts-2011-cv3d-v2.geojson",
                    MI: "/img/icons/poison.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>National Resource Defense Council (NRDC) List of Suspected Drinking Water Impacts (2011)",
                    U: "http://www.fractracker.org/downloads/nrdc-list-of-suspected-drinking-water-impacts-2011/",
                    N: "NRDC Drinking Water Impacts 2011"
                },
                {
                    I: "coal-power-now",
                    Z: true,
                    T: 'geojson',
                    MS: 3,
                    MI: '/img/icons/smoke-red.png',
                    G: "/layers/geojson/Contaminated-Coal-Waste-NRDC-current-factories-cv3d-v2.geojson",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Natural Resource Defense Council (NRDC) “Power plants produce about 130 million tons of contaminated waste every year, and the federal government has failed to regulate it.” Across the nation, coal-fired power plants aren’t just polluting our skies and water. Each year, they generate millions of tons of waste contaminated with toxic metals -- more than two-thirds of which is dumped into landfills, storage ponds or old mines or otherwise stored somewhere, just waiting for disaster to strike.<br><br>More than four hundred forty existing coal-fired power plants in 47 states produced over 126 million tons of coal waste in 2005, contaminated by over 91 thousand tons of toxic metals. This table lists totals by state, ranked by total coal waste per state.",
                    U: "http://www.nrdc.org/energy/coalwaste",
                    N: "Coal Power Plants (current)"
                },
                {
                    I: "coal-power-future",
                    Z: true,
                    T: 'geojson',
                    MS: 3,
                    MI: '/img/icons/smoke-grey.png',
                    G: "/layers/geojson/Contaminated-Coal-Waste-NRDC-future-factories-cv3d-v2.geojson",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Natural Resource Defense Council (NRDC) “Power plants produce about 130 million tons of contaminated waste every year, and the federal government has failed to regulate it.” Across the nation, coal-fired power plants aren’t just polluting our skies and water. Each year, they generate millions of tons of waste contaminated with toxic metals -- more than two-thirds of which is dumped into landfills, storage ponds or old mines or otherwise stored somewhere, just waiting for disaster to strike.<br><br>More than eighty new coal-fired power plants have been proposed around the country. If built, the plants will annually produce nearly 18 million tons of coal ash, contaminated by over 18 thousand tons of toxic metals. Over the course of their operating lives, these new power plants will produce approximately one billion tons of coal ash, with a million tons of toxic metals.",
                    U: "http://www.nrdc.org/energy/coalwaste",
                    N: "Coal Power Plants (future)"
                },
                {
                    I: "coal-ash",
                    Z: true,
                    T: 'geojson',
                    MS: 3,
                    MI: '/img/icons/mryuk.png',
                    G: "/layers/geojson/Coal-Ash-Ponds-cv3d-v2.geojson",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Natural Resource Defense Council (NRDC) “The horror is unimaginable.  A community suffering severe health effects, with more than a thousand resIents blaming coal ash contamination for causing their sickness, including grisly birth defects in their children.”",
                    U: "http://switchboard.nrdc.org/blogs/rperks/coal_ash_wreaking_havoc_on_hea.html",
                    N: "Coal Ash in Ponds"
                },
                {
                    I: "us-shale-gas",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/Shale-Gas-Basins-CV3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/rezn8d/",
                    N: "Shale Gas Basins"
                },
                {
                    H: true,
                    I: "etzel-fracking",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/cavern-field-Etzel-Germany-CV3D.kmz",
                    S: "Provided by Anonymous Climate Viewer",
                    U: "http://www.bi-lebensqualität.de/",
                    N: "Fracking Cavern Field, Etzel, Germany"
                },
                {
                    I: "methane-release",
                    T: 'geojson',
                    G: "/layers/geojson/drilling-methane-release-cv3d-v3.geojson",
                    MS: "6",
                    MI: "/img/icons/firedept.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/2014/04/01/haarp-lucy-sky-diamonds/",
                    N: "Drilling Wells and Methane Release"
                },
                {
                    I: "fracking-alaska",
                    Z: true,
                    T: 'geojson',
                    G: "/layers/geojson/fracking-alaska-cv3d-v2.geojson",
                    MS: "6",
                    MI: "/img/icons/oil_well.png",
                    S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Gas Hydrate Prospecting Using Well Cuttings and Mud-Gas Geochemistry from 35 Wells, North Slope, Alaska.</p>",
                    U: "http://pubs.usgs.gov/sir/2011/5195/sir2011-5195_text.pdf",
                    N: "Fracking Alaska"
                },
                {
                    I: "oil-spills",
                    T: 'geojson',
                    G: "/layers/geojson/black-tides-oil-spills-cv3d-v2.geojson",
                    MI: "/img/icons/oil-well.png",
                    S: "David Tryse's Google Earth files",
                    U: "http://earth.tryse.net/",
                    N: "Black Tides: Worst Oil Spills in History"
                }
            ]
        },
        nuclear: {
            N: "Nuclear",
            icon: "fa-recycle",
            '>': [
                {
                    I: "bw-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-bw-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-red.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Boiling Water Reactors"
                },
                {
                    I: "pw-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-pw-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-green.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Pressurized Water Reactors"
                },
                {
                    I: "phw-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-phw-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-dkblue.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Pressurized Heavy Water Reactors"
                },
                {
                    I: "lwg-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-lwg-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-yellow.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Light Water Graphite Reactors"
                },
                {
                    I: "gc-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-gc-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-blue.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Gas Cooled Reactors"
                },
                {
                    I: "other-reactor",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-other-reactor-cv3d-v3.geojson",
                    MI: "/img/icons/nuke-purple.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='http://blogs.nature.com/news/2011/03/the_worlds_nuclear_reactors_as_1.html'>Declan Butler</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Other Reactors"
                },
                {
                    H: true,
                    I: "nuke-war",
                    T: 'geojson',
                    G: "/layers/geojson/nuclear-test-explosions-cv3d-v2.geojson",
                    MI: "/img/icons/nuke-boom.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Based on the work of <a href='https://productforums.google.com/d/msg/gec-history-illustrated-moderated/DncXs6kPWXM/uM26F3CDq18J'>Wm. Robert Johnston and Lyle McElhaney</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "Nuclear Test Explosions",
                    Y: true,
                },
                {
                    I: "radioactive-topten",
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Ten-Most-Radioactive-Locations-On-Earth-CV3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/2013/11/24/10-most-radioactive-places-on-earth/",
                    N: "Ten Most Radioactive Places on Earth"
                },
                {
                    I: "hibakusha",
                    T: 'geojson',
                    G: "/layers/geojson/hibakusha-worldwide-cv3d-v2.geojson",
                    MI: "/img/icons/nuke.png",
                    S: "Dr. Alex Rosen, Hibakusa 'explosion-affected people' Worldwide",
                    U: "http://www.ippnw-students.org/Japan/hibakushamap.html",
                    N: "50 Nuclear Nightmares (Hibakusha Worldwide)"
                },
                {
                    I: "tmi-meltdown",
                    Z: true,
                    T: 'geojson',
                    G: "/layers/geojson/three-mile-island-meltdown-cv3d-v2.geojson",
                    MI: "/img/icons/nuke.png",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "1979 Three Mile Island Meltdown"
                },
                {
                    I: "tmi-fallout",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Three-Mile-Island-meltdown-Climate-Viewer-3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "1979 Three Mile Island Fallout"
                },
                {
                    I: "chernobyl-meltdown",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Chernobyl-meltdown-Climate-Viewer-3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "1986 Chernobyl Meltdown"
                },
                {
                    I: "chernobyl-fallout-fallout",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Chernobyl-meltdown-fallout-Climate-Viewer-3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "1986 Chernobyl Fallout"
                },
                {
                    I: "fukushima-meltdown",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Fukushima-Daiichi-meltdown-Climate-Viewer-3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "2011 Fukushima-Daiichi Meltdown"
                },
                {
                    I: "fukushima-fallout",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Fukushima-Daiichi-meltdown-fallout-Climate-Viewer-3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                    U: "http://climateviewer.com/nuclear-reactor-map/",
                    N: "2011 Fukushima-Daiichi Fallout"
                },
                {
                    I: "fuku-tsunami-seawater",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/3rdparty/pollution/nuclear/radioactive_seawater/part_51.kml",
                    S: "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    U: "http://www.asrltd.com/japan/plume.php",
                    N: "2011 Fukushima Radioactive Seawater (by March 2012)"
                },
                {
                    I: "fuku-tsunami-debris",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/3rdparty/pollution/nuclear/tsunami_debris/part_51.kml",
                    S: "Ocean scientists at ASR Limited have used the Japan tsunami as a research tool to push the limits of our modelling and research capabilities. We have focussed on three aspects of the Japan event: 1) Developing and fine tuning a real time tsunami assessment tool for vulnerable ports an harbours in New Zealand. 2) Tracking the transport and distribution of debris washed in to the ocean as it crosses the Pacific Ocean and 3) Modelling the distribution of radioactive seawater emanating from the stricken Fukushima nuclear power plant.",
                    U: "http://www.asrltd.com/japan/debris.php",
                    N: "2011 Fukushima Tsunami Debris (by March 2012)"
                },
                {
                    P: true,
                    I: "fuku-tsunami",
                    Z: true,
                    T: 'kml',
                    G: "http://nctr.pmel.noaa.gov/honshu20110311/honshu_tsunami_2011-03-11.kmz",
                    S: "NOAA Center for Tsunami Research, Maximum amplitude plot for Google Earth (KMZ)",
                    U: "http://nctr.pmel.noaa.gov/honshu20110311/index.html",
                    N: "2011 Fukushima Tsunami Wave Height"
                },
                {
                    C: true,
                    I: "honeywell-uf6",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/pollution/nuclear/Honeywell-Uranium-Hexafluoride-Release-10-27-2014-CV3D.kmz",
                    S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Radiation Release 10-27-2014",
                    U: "http://climateviewer.com/2014/10/27/metropolis-get-nuked-last-night-2/",
                    N: "2014 Honeywell UF6 Processing Facility Radiation Release"
                }
            ]
        },
        toxicrelease: {
            N: "Toxic Release",
            icon: "fa-exclamation-triangle",
            '>': [
                {
                    I: "toxmap-tri-all",
                    T: 'arcgis',
                    G: "http://toxmap.nlm.nih.gov/arcgis/rest/services/toxmap5/facilities/MapServer",
                    L: "0",
                    S: "<a href='http://www.epa.gov/toxics-release-inventory-tri-program'>EPA TRI</a> is a resource for learning about toxic chemical releases and pollution prevention activities reported by industrial and federal facilities. TRI data support informed decision-making by communities, government agencies, industries, and others..",
                    U: "http://toxmap.nlm.nih.gov/toxmap/",
                    N: "All Toxic Release Inventory (TRI) Facilities (1988-2013)"
                },
                {
                    I: "toxmap-superfund",
                    T: 'arcgis',
                    G: "http://toxmap.nlm.nih.gov/arcgis/rest/services/toxmap5/superfund/MapServer",
                    L: "1",
                    S: "<a href='http://www.epa.gov/superfund'>EPA’s Superfund program</a> is responsible for cleaning up some of the nation’s most contaminated land and responding to environmental emergencies, oil spills and natural disasters. To protect public health and the environment, the Superfund program focuses on making a visible and lasting difference in communities, ensuring that people can live and work in healthy, vibrant places.",
                    U: "http://toxmap.nlm.nih.gov/toxmap/",
                    N: "Superfund National Priority List (toxic cleanup sites)"
                }
            ]
        }
    },
    N: "Big Brother",
    bigbrother: {
        N: "Surveillance",
        '>': [
            {
                I: "f05",
                T: 'geojson',
                MI: '/img/gallery/eye-green.gif',
                G: '/layers/geojson/NWO-Surveillance-facilities-cv3d.geojson',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>Map of surveillance facilities including NSA, AUSCANNZUKUS, and the Fourteen Eyes.",
                U: "http://climateviewer.com/new-world-order/",
                N: "Government Spy Facilities"
            },
            {
                I: "f06",
                T: 'kml',
                G: '/layers/kml/3rdparty/places/submarine-cables-CV3D.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>Map of ocean floor cables tapped by the NSA.",
                U: "http://www.submarinecablemap.com/",
                N: "Submarine (underwater) Communication Cables"
            },
            {
                I: "f061",
                T: 'kml',
                G: '/layers/kml/3rdparty/places/fusion-landing-points-CV3D.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>Map of ocean floor cables tapped by the NSA.",
                U: "http://www.submarinecablemap.com/",
                N: "Submarine (underwater) Communication Cable Landings"
            },
            {
                I: "f07",
                T: 'kml',
                Z: true,
                G: '/layers/kml/places/DHS-Fusion-Centers-CV3D.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>Map of the U.S. Department of Homeland Security surveillance facilities.",
                U: "http://climateviewer.com/new-world-order/",
                N: "DHS Fusion Centers"
            },
            {
                I: "f08",
                T: 'geojson',
                Z: true,
                MI: '/img/icons/airports.png',
                G: '/layers/geojson/uav-drones-over-USA-cv3d-v2.geojson',
                S: 'Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br>Map of drone operators resulting from FOIA requests.<ul><li><a href="https://www.google.com/fusiontables/data?docid=1WuTyH62PmUF97oxo6IreT1BL_aw9HJN5pocwmwg&h#rows:id=1">EFF Map of Domestic Drone Flights</a></li><li><a href="https://www.eff.org/deeplinks/2012/07/faa-releases-thousands-pages-drone-records">FAA Releases Thousands of Pages of Drone Records</a></li> <li><a href="http://www.afceaboston.com/documents/events/cnsatm2011/Briefs/03-Wednesday/Wednesday-PM%20Track-2/02-LtCol%20Howard-GBSAA%20Safety%20Case-%20Wednesday%20Track2.pdf">US Air Force Drone Map PDF</a></li><li><a href="http://climateviewer.com/gallery/Drones-in-the-USA-RPA-DoD-Ops-Activities 06-13-2011.pdf">US Air Force Drone Map PDF Mirror</a></li></ul><a href="http://climateviewer.org/img/gallery/Drones-in-the-USA-RPA-DoD-Ops-Activities-06-13-2011.jpg"><img src="http://climateviewer.org/img/gallery/Drones-in-the-USA-RPA-DoD-Ops-Activities-06-13-2011-sm.jpg"></a><br><br><a href="http://climateviewer.org/img/gallery/Drones-in-the-USA-RPA-DoD-Ops-Future-Activities-06-13-2011.jpg"><img src="http://climateviewer.org/img/gallery/Drones-in-the-USA-RPA-DoD-Ops-Future-Activities-06-13-2011-sm.jpg" style="width:400px;height:300px;" /></a><br><br><ul><li><a href="http://www.wired.com/dangerroom/2012/06/64-drone-bases-on-us-soil/">Wired.com: Revealed: 64 Drone Bases on American Soil</a></li><li><a target="_blank" href="https://www.eff.org/deeplinks/2012/04/faa-releases-its-list-drone-certificates-leaves-many-questions-unanswered">EFF.org: FAA Releases Lists of Drone Certificates, Many Questions Left Unanswered</li><li><a href="http://publicintelligence.net/dod-us-drone-activities-map/">PublicIntelligence.net: DoD Current and Future U.S. Drone Activities Map</a></li></ul><br><br><p><a href="http://www.scribd.com/doc/91826967/JFCOM-UAS-PocketGuide">UAS TACTICAL POCKET GUIDE<br>JUAS-COE Training Document Organic/Non Organic UAS</a></p><hr><p>Large UAVs</p><hr><p><a href="http://en.wikipedia.org/wiki/Boeing_X-37">Boeing X-37</a></p><p><a href="http://en.wikipedia.org/wiki/Lockheed_Martin_RQ-170_Sentinel">RQ-170 Sentinel Stealth UAV</a></p><ul><li><a href="https://r3zn8d.wordpress.com/2012/10/01/iranian-hacker-tells-the-usa-to-stfu-and-the-chinese-can-shut-our-power-off-we-are-not-prepared-for-ww3/">Iranian Hackers Steal US Stealth Drone</a></li></ul><img src="http://climateviewer.org/img/gallery/rq170-in-iran.jpg"><br><br><p><a href="http://en.wikipedia.org/wiki/RQ-3_DarkStar">RQ-3 DarkStar</a></p><img src="http://climateviewer.org/img/gallery/RQ-3-DarkStar_Tier_III.jpg"><br><br><p><a href="http://en.wikipedia.org/wiki/Northrop_Grumman_X-47A_Pegasus">X-47A Pegasus</a></p><p><a href="http://en.wikipedia.org/wiki/Northrop_Grumman_X-47B">X-47B UCAS-D</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/global-hawk-rq-4-unmanned-vehicle-uav-specifications-data-sheet/">Global Hawk (RQ-4) BAMS (RQ-4N)</a></p><img src="http://climateviewer.org/img/gallery/BAMS-RQ4N.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/mq-4c-bams-uas-specifications/">MQ-4C BAMS UAS</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/predator-specifications/">Predator</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/predator-b-mq-9-reaper-specifications/">Predator B – MQ-9 Reaper</a></p><img src="http://climateviewer.org/img/gallery/predator-b-mq-9.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/predator-c-avenger-unmanned-aerial-vehicle-uav-specifications-data-sheet/">Predator C Avenger</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/gray-eagle-uas-unmanned-aerial-vehicle-uav-specifications-data-sheet/">Gray Eagle MQ-1C "Warrior"</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/mariner-unmanned-vehicle-uav-specifications-data-sheet/">Mariner</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/i-gnat-unmanned-vehicle-uav-specifications-data-sheet/">I-GNAT</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/i-gnat-er-sky-warrior-alpha-specifications/">I-GNAT ER (Sky Warrior Alpha)</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/hunter-specifications/">Hunter</a></p><img src="http://climateviewer.org/img/gallery/Hunter.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/mq-5b-hunter-specifications/">Hunter MQ-5B</a></p><p><a href="http://www2.l-3com.com/uas/tech_uas/viking300.htm">Viking 300</a></p><p><a href="http://edocs.nps.edu/npspubs/scholarly/theses/2008/Mar/08Mar_Demirel.pdf">Rascal</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/shadow-200-specifications/">Shadow 200</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/shadow-400-specifications/">Shadow 400</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/shadow-600-specifications/">Shadow 600</a></p><img src="http://climateviewer.org/img/gallery/Shadow-600.jpg"><br><br><hr><p>Hand-held</p><hr><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/wasp-unmanned-vehicle-uav-specifications-data-sheet-2/">Wasp</a></p><p><a href="http://www.unmanned.co.uk/unmanned-vehicles-news/unmanned-aerial-vehicles-uav-news/us-air-force-include-wasp-ae-micro-uav-in-its-battlefield-program/">WASP-AE Micro</a></p><img src="http://climateviewer.org/img/gallery/Wasp-AE.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/raven-rq-11b-unmanned-vehicle-uav-specifications-data-sheet/">Raven (RQ-11B, RQ-11A)</a></p><img src="http://climateviewer.org/img/gallery/raven-uav.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/puma-unmanned-vehicle-uav-specifications-data-sheet/">Puma-AE</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/scaneagle-specifications/">Scan Eagle</a></p><img src="http://climateviewer.org/img/gallery/scaneagle.jpg"><br><br><hr><p>Vertical Take-off (VTOL)</p><hr><p><a href="http://www.globalsecurity.org/intell/systems/vigilante.htm">Vigilante UAV</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/a160-hummingbird-specifications/">A160 Hummingbird</a></p><img src="http://climateviewer.org/img/gallery/a160-hummingbird.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/rmax-type-ii-unmanned-vehicle-uav-specifications-data-sheet/">RMAX (Type II, Type IIG)</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/shadowhawk-unmanned-aerial-vehicle-uav-specifications/">Shadowhawk</a></p><img src="http://climateviewer.org/img/gallery/Shadowhawk.jpg"><br><br><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/cypher-ii-unmanned-vehicle-uav-specifications-data-sheet/">Cypher II</a></p><p><a href="http://www.youtube.com/watch?v=pC8V5sinYA">gMAV (Ducted Fan UAV)</a></p><p><a href="http://www.unmanned.co.uk/autonomous-unmanned-vehicles/uav-data-specifications-fact-sheets/shrike-unmanned-aerial-vehicle-uav-specifications-and-data-sheet/">Shrike</a></p><img src="http://climateviewer.org/img/gallery/Shrike-UAV-1.jpg">',
                U: "https://www.google.com/fusiontables/data?docid=1WuTyH62PmUF97oxo6IreT1BL_aw9HJN5pocwmwg&h#rows:id=1",
                N: "UAV Drones over the USA"
            },
            {
                I: "drone-nofly",
                T: 'arcgis',
                X: true,
                G: "http://tiles1.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/Drone_No_Fly_Zones_USA_story_map_Millitary_Parks/MapServer",
                S: "This layer includes areas in the United States where drones are banned from flying: national parks and military installations. See the FAA's web site (http://www.faa.gov/uas) for details on current guidance and regulations for the various types of drones. For example, the guidance for hobbyists is particularly clear, and useful (http://www.faa.gov/uas/publications/model_aircraft_operators). If you know of additions / corrections, please email Jim Herries (jherries@esri.com).",
                U: "http://www.faa.gov/uas",
                N: "Drone No-Fly Zones"
            },
            {
                I: "drones-pakistan",
                T: 'kml',
                Z: true,
                G: '/layers/kml/places/Pakistan-drone-strikes-CV3D.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>Map of CIA drone strikes in Pakistan.",
                U: "http://climateviewer.com/new-world-order/",
                N: "U.S. drone strikes in Pakistan"
            },
            {
                I: "prisons",
                T: 'kml',
                H: true,
                G: '/layers/kml/3rdparty/places/World-Prison-Brief-5659.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>World Prison Brief (2010) by SergeyUA - World Prison Brief – 143 countries, 5660 places (September, 2010) Africa – 35 countries, 179 places. North America - 14 countries, 1767 places. South America – 13 countries, 191 places. Asia – 35 countries, 819 places. Australia &amp; Oceania – 7 countries, 119 places. Europe – 39 countries, 2585 places. Foto - 2513. References on website - 4586. Including Wikipedia - 2223.",
                U: "https://productforums.google.com/forum/#!msg/gec-earth-browsing-moderated/Ey216sRE2Z0/xgt4bLhYriEJ",
                N: "Prisons Worldwide"
            },
            {
                I: "us-border-crisis",
                T: 'kml',
                P: true,
                Z: true,
                G: '/layers/kml/3rdparty/places/US-border-crisis-Gmap.kml',
                S: "Relocations of Unaccompanied Immigrant Minors (Updated by NumbersUSA.com on 9/30/14 at 11:28 a.m. EST)<br><br>UPDATE 9/30: Schools in every state struggle to help kids who crossed the border<br><br>UPDATE 8/25: The Obama administration has abandoned its months-long search for emergency shelters across the nation<br><br>County-by-county figures for UACs being released to adult sponsors: <a href='http://www.acf.hhs.gov/programs/orr/unaccompanied-children-released-to-sponsors-by-county'>http://www.acf.hhs.gov/programs/orr/unaccompanied-children-released-to-sponsors-by-county</a>",
                U: "https://www.google.com/maps/d/viewer?msa=0&mid=zLmpuCst6-hQ.kJd89w3O8yas",
                N: "Relocations of Unaccompanied Immigrant Minors (2014)"
            },
            /*            {
             I: "fema-camps",
             T: 'kml',
             Z: true,
             G: '/layers/kml/places/FEMA-Camps-CV3D.kmz',
             S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a><br>I have included the FEMA camp maps as a result of much public debate on the matter. If you inspect the markers that the two map creators made, it will be hard for you to find anything that resembles a holding cage. I will verify these locations over the coming months and see if any of this has truth to it. Until then, here are the two sources of the &quot;FEMA Camp&quot; images that are making the rounds in social media, verify it before you believe it. The creators of these two maps did a poor job in placing markers at the least, and did not do the proper research to locate the facilities they claim are &quot;federal holding pens&quot;.",
             U: "http://climateviewer.com/new-world-order/",
             N: "FEMA Camps"
             }, */
            {
                I: "mh17",
                T: 'kml',
                Z: true,
                G: '/layers/kml/places/MH17-CV3D-locs.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>",
                U: "http://climateviewer.com/new-world-order/",
                N: "Malaysian Airlines MH17 shot down by SA-11"
            },
            {
                I: "mh17-map1",
                T: 'kml',
                Z: true,
                G: '/layers/kml/places/MH17-CV3D-map1.kmz',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>",
                U: "http://mashable.com/2014/07/22/russia-mh17-plane-evidence/",
                N: "Malaysian Airlines MH17 (Overlay)"
            },
            {
                I: "surface-to-air",
                T: 'kml',
                H: true,
                G: '/layers/kml/3rdparty/places/SAM-Site-Overview-June-2013-CV3D.kmz',
                S: "Worldwide SAM Site Overview, updated June 2013",
                U: "http://geimint.blogspot.com/2008/06/worldwide-sam-site-overview.html",
                N: "Surface-to-Air Missiles (SAM) Worldwide"
            },
            {
                I: "russian-sam",
                Z: true,
                T: 'kml',
                G: '/layers/kml/3rdparty/places/Fortress-Russia-CV3D.kmz',
                S: "Defending Mother Russia - Bluffer’s Guide to Fortress Russia (Part 1): Integrated Air Defence of Russia 2010",
                U: "https://productforums.google.com/forum/#!msg/gec-dynamic-data-layers/K7LgrqY1d_8/pmH2BocgvR4J",
                N: "Russian Surface-to-Air Missiles (SAM) Sites"
            }
        ]
    },
    WXMOD: {
        N: "Geoengineering",
        '>': [
            {
                I: "geoengineering-SRM",
                T: 'kml',
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Geoengineering-SRM-Field-Experiments-CV3D.kmz",
                S: "Cloud creation experiments and Solar Radiation Management trials. Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/geoengineering/",
                N: "Geoengineering SRM Field Experiments"
            },
            {
                I: "p01",
                T: 'geojson',
                G: "/layers/geojson/weather-modification-association-projects-cv3d-v2.geojson",
                MI: '/img/icons/rainy.png',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://www.weathermodification.com/projects.php'>Weather Modification Inc.</a>",
                U: "http://climateviewer.com/geoengineering/",
                N: "Weather Modification Inc. Projects (Worldwide)"
            },
            {
                I: "p03",
                T: 'geojson',
                G: "/layers/geojson/ucar-eol-field-projects-cv3d-v2.geojson",
                MI: '/img/icons/eol.gif',
                S: "National Center for Atmospheric Research (NCAR)/Earth Observing Laboratory (EOL)",
                U: "https://www.eol.ucar.edu/all-field-projects-and-deployments",
                N: "UCAR Earth Observing Lab Field Projects (Worldwide)"
            },
            {
                I: "wxmod-WWMPP",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Wyoming-Weather-Modification-Pilot-Program-WWMPP-Generators-CV3D.kmz",
                S: 'Source: <a href="http://wwdc.state.wy.us/weathermod/WYWeatherModPilotProgramExecSummary.html">http://wwdc.state.wy.us/weathermod/WYWeatherModPilotProgramExecSummary.html</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><h3>More Information</h3><a href="http://climateviewer.com/2014/12/29/cloud-seeding-gambling-weather/" target="_blank">Cloud Seeding: Gambling With Your Weather</a><br><a href="http://www.livescience.com/49263-cloud-seeding-experiment-debate.html" target="_blank">Biggest Cloud-Seeding Experiment Yet Only Sparks More Debate</a><br><a href="https://www.ral.ucar.edu/projects/wyoming/" target="_blank">https://www.ral.ucar.edu/projects/wyoming/</a><br><a href="http://wwdc.state.wy.us/weathermod/WYWeatherModPilotProgramExecSummary.html" target="_blank">http://wwdc.state.wy.us/weathermod/WYWeatherModPilotProgramExecSummary.html</a><br><a href="https://www.wmo.int/pages/prog/arep/wwrp/new/documents/ANL.Breed_USA_paper2.pdf" target="_blank">https://www.wmo.int/pages/prog/arep/wwrp/new/documents/ANL.Breed_USA_paper2.pdf</a><br><a href="http://www.weathermodification.org/Fargo%20Presentations/BreedWWMPP2015.pdf" target="_blank">http://www.weathermodification.org/Fargo%20Presentations/BreedWWMPP2015.pdf</a><br><a href="http://www.weathermodification.com/projects.php?id=64" target="_blank">http://www.weathermodification.com/projects.php?id=64</a><br><a href="https://ams.confex.com/ams/pdfpapers/139288.pdf" target="_blank">https://ams.confex.com/ams/pdfpapers/139288.pdf</a><br><h3>Reference</h3><img src="/layers/kml/weather/Wind-River-Range-Wyoming-Weather-Modification-Pilot-Program.jpg" /><br><br><img src="/layers/kml/weather/Sierra-Madre-Wyoming-Weather-Modification-Pilot-Program.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Wyoming Weather Modification Pilot Program (Generators)"
            },
            {
                I: "wxmod-ccrmp",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Central-Colorado-Rocky-Mountain-Program-Cloud-Seeding-Generators.kmz",
                S: 'Source: <a href="http://cwcb.state.co.us/water-management/water-projects-programs/Documents/WeatherModification/DWagenda_materials.pdf">"Weather Modification Permit Application Public Hearing for Western Weather Consultants Target Area Upper Colorado River Basin," Colorado Water Conservation Board, Department of Natural Resources</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><br><img src="/layers/kml/weather/Central-Colorado-Rocky-Mountain-Program-Cloud-Seeding.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Central Colorado Rocky Mountain Program (Generators)"
            },
            {
                I: "wxmod-grand-mesa",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Grand-Mesa-Weather-Modification-Cloud-Seeding-Generators-CV3D.kmz",
                S: 'Source: <a href="http://cwcb.state.co.us/water-management/water-projects-programs/Documents/WeatherModification/PermitAreas/GrandMesaTargetAreas.pdf">http://cwcb.state.co.us/water-management/water-projects-programs/Documents/WeatherModification/PermitAreas/GrandMesaTargetAreas.pdf</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><br><img src="/layers/kml/weather/Grand-Mesa-Colorado-Cloud-Seeding-Sites.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Grand Mesa Colorado Cloud-Seeding (Generators)"
            },
            {
                I: "wxmod-humboldt",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Humboldt-River-Basin-Cloud-Seeding-Generators-CV3D.kmz",
                S: 'Source: <a href="http://drought.nv.gov/uploadedFiles/droughtnvgov/Content/Meetings/2015/HumboldtRiverBasinCloudSeedingDocument.pdf">PRELIMINARY FEASIBILITY STUDY AND COST ESTIMATES OF POSSIBLE WINTER CLOUD SEEDING IN THE HUMBOLDT RIVER BASIN, NEVADA. August 2014</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><h3>Reference</h3><img src="/layers/kml/weather/Humboldt-River-Basin-Nevada-Cloud-Seeding-Generators.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Humboldt River Basin Cloud-Seeding (Generators)"
            },
            {
                I: "wxmod-carson-walker",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Carson-Walker-Basin-Cloud-Seeding-Generators-CV3D.kmz",
                S: 'Source: <a href="http://www.dri.edu/images/stories/news/media_kits/DRI_Cloud_Seeding_Program_2014-2.pdf">Desert Research Institute, Weather Modification Brochure</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><h3>Reference</h3><img src="/layers/kml/weather/Desert-Research-Institute-cloud-seeding-generators.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Carson-Walker Basin Cloud-Seeding (Generators)"
            },
            {
                I: "wxmod-santa-barbara",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Santa-Barbara-California-Cloud-Seeding-Generators-CV3D.kmz",
                S: '<a href="http://cosb.countyofsb.org/uploadedFiles/pwd/Water/WaterAgency/Final%20Report%2015-1.pdf">Summary of Operations for a Winter Cloud Seeding Program for the Upper Santa Ynez Drainage in Southeastern Santa Barbara County and the Huasna-Alamo Drainage in Northern Santa Barbara and Southern San Luis Obispo Counties Water Year 2015</a><br>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><h3>More Info</h3><a href="http://cosb.countyofsb.org/pwd/pwwater.aspx?id=3740">Santa Barbara County Water Agency Cloud Seeding</a><br><br><img src="/layers/kml/weather/santa-barbara-california-cloud-seeding.jpg"/><br><br>Flare burning inside a spark arrestor<br><br><a href="http://cosb.countyofsb.org/uploadedFiles/pwd/Water/WaterAgency/Final%20Report%2015-1.pdf"><img src="/layers/kml/weather/AHOGS-cloud-seeding-station-flare-burning-santa-barbara-california.jpg"/></a><br><br>Close-up photo of spark arrestors<br><br><a href="http://cosb.countyofsb.org/uploadedFiles/pwd/Water/WaterAgency/Final%20Report%2015-1.pdf"><img src="/layers/kml/weather/AHOGS-cloud-seeding-station-close-up-santa-barbara-california.jpg"/></a>',
                U: "http://climateviewer.com/geoengineering/",
                N: "Santa Barbara California Cloud-Seeding (Generators)"
            },
            {
                I: "wxmod-idaho-power",
                T: 'kml',
                Z: true,
                P: true,
                G: "http://climateviewer.org/layers/kml/weather/Idaho-Power-Cloud-Seeding-Project-Generators-CV3D.kmz",
                S: 'Source: <a href="http://www.idwr.idaho.gov/WaterBoard/WaterPlanning/CAMP/TV_CAMP/PDF/2010/09-29-2010_IdahoPower_Cloud_Seeding_Program.pdf">Shaun Parkinson, PhD, PE, "Idaho Power Company’s Cloud Seeding Program"</a><br> Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-stations-2010.jpg" /><br><br><img src="/layers/kml/weather/idaho-power-ground-based-cloud-seeding-station-schematic-2010.png" />',
                U: "http://climateviewer.com/geoengineering/",
                N: "Idaho Power Company Cloud-Seeding (Generators)"
            },
            {
                I: "wxmod2012",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2012-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2012-noaa-weather-modification-programs-12wxmod5-partial.pdf'>NOAA 2012 (partial) Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2012)"
            },
            {
                I: "wxmod2011",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2011-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2011-noaa-weather-modification-programs-11wxmod5-partial.pdf'>NOAA 2011 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2011)"
            },
            {
                I: "wxmod2010",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2010-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2010-noaa-weather-modification-programs-10wxmod5.pdf'>NOAA 2010 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2010)"
            },
            {
                I: "wxmod2009",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2009-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2009-noaa-weather-modification-programs-09wxmod5.pdf'>NOAA 2009 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2009)"
            },
            {
                I: "wxmod2008",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2008-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2008-noaa-weather-modification-programs-08wxmod5.pdf'>NOAA 2008 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2008)"
            },
            {
                I: "wxmod2007",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2007-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2007-noaa-weather-modification-programs-07wxmod5.pdf'>NOAA 2007 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2007)"
            },
            {
                I: "wxmod2006",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2006-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2006-noaa-weather-modification-programs-06wxmod5.pdf'>NOAA 2006 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2006)"
            },
            {
                I: "wxmod2005",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2005-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2005-noaa-weather-modification-programs-05wxmod5.pdf'>NOAA 2005 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2005)"
            },
            {
                I: "wxmod2004",
                T: 'kml',
                P: 'true',
                G: "http://climateviewer.org/layers/kml/weather/NOAA-Reported-Weather-Modifications-Activities-2004-CV3D.kml",
                S: "Created by <a href='http://stilltheman2.wix.com/myreadingmapped'>George Stiller</a> and <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>. Source: <a href='http://climateviewer.org/layers/kml/weather/2004-noaa-weather-modification-programs-04wxmod5.pdf'>NOAA 2004 Report</a> converted to <a href='https://www.google.com/fusiontables/DataSource?docid=1XgB7-IKoX7y2tkmmU0zSED1TlBsa3WDaOL6py4zk'>Google Fusion Tables</a><br><br>This map plots those weather modifications for rain and snow augmentation and fog and hail suppression reported by NOAA for the years 2004 through 2012 west of the Mississippi River. The locations were identified by researching the sponsoring organization and the project name. However, due to the lack of specific data, the placemarks represent only the general region covered by the sponsor and do not reflect the actual path of the cloud-seeding.",
                U: "http://climateviewer.com/geoengineering/",
                N: "NOAA Reported Weather Modification Activities (2004)"
            }
        ]
    },
    electromagnetic: {
        N: "Electromagnetic",
        '>': [
            {
                I: "star-wars",
                T: 'geojson',
                G: "/layers/geojson/star-wars-radar-cv3d-v3.geojson",
                MI: '/img/icons/radar-black.png',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/haarp/",
                N: "Missile Defense Radars (Star Wars)"
            },
            {
                I: "sky-heaters",
                T: 'geojson',
                G: "/layers/geojson/ionospheric-heaters-cv3d-v3.geojson",
                MI: '/img/icons/radar-red.png',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/haarp/",
                N: "Ionospheric Heaters"
            },
            {
                I: "haarp",
                Z: true,
                T: 'geojson',
                G: "/layers/geojson/haarp-cv3d-v2.geojson",
                MI: '/img/icons/radar-ltblue.png',
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/haarp/",
                N: "High-Frequency Active Auroral Research Project"
            },
            {
                I: "superdarn",
                T: 'geojson',
                G: "/layers/geojson/superdarn-cv3d-v2.geojson",
                MI: '/img/icons/radar-yellow.png',
                S: '<p>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a>.<br>The Super Dual Auroral Radar Network (SuperDARN) is an international radar network for studying the upper atmosphere and ionosphere, comprising eleven radars in the northern hemisphere and seven in the southern hemisphere that operate in the High Frequency (HF) bands between 8 and 22 MHz. The radars measure the Doppler velocity of plasma density irregularities in the ionosphere.<br><br>In their standard operating mode each radar scans through 16 beams of azimuthal separation 3.24°, with a total scan time of 1 min. Each beam is divided into 75 range gates of length 45 km, and so in each full scan the radars each cover 52° in azimuth and over 3000 km in range, an area of over 4×106 km².<br><br>SuperDARN began in 1983, when the first radar installation was constructed in Labrador, Canada. Source: <a href="http://en.wikipedia.org/wiki/Super_Dual_Auroral_Radar_Network" target="_blank">Wikipedia</a><br><a href="http://superdarn.jhuapl.edu/" target="_blank">John&#39;s Hopkins Applied Physics Lab</a><br><a href="http://sd-software.ece.vt.edu/tiki/tiki-print.php?page=VT%20SuperDARN%20Home" target="_blank">Virginia Tech SuperDARN</a><br><a href="http://cedarweb.hao.ucar.edu/wiki/index.php/Documents:Ground_Based_Instruments#B_-_Coherent_Ionospheric_Radars_.28.7E29.29" target="_blank">CEDAR: Ground Based Instruments</a><br><a href="http://articles.adsabs.harvard.edu//full/1995SSRv...71..761G/0000761.000.html" target="_blank">SuperDARN - A Global View of the Dynamics of High-Latitude Convection</a></p>',
                U: "http://superdarn.ece.vt.edu/tiki-index.php",
                N: "Super Dual Auroral Radar Network (SuperDARN)"
            },
            {
                I: "digisonde",
                T: 'geojson',
                G: "/layers/geojson/digisonde-cv3d-v2.geojson",
                MI: '/img/icons/digisonde.png',
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br><a href='http://umlcar.uml.edu/stationlist.html'>Station List</a><br><br>Lowell Digisonde International manufactures and markets the Digisonde-Portable-Sounder-4D (DPS4D), the latest model in the DIGISONDE® series of advanced ionosondes built in Lowell since 1969. The Digisonde is an ionospheric radar that uses high-frequency radio waves for the remote sensing of the ionosphere, the ionosonde technology pioneered by Sir Edward Appleton in the late 1920s. DIGISONDE stands for “Digitally Integrating Goniometric IonoSONDE”. The DPS4D is the only commercially available ionosonde system that measures all parameters of the ionospherically reflected HF radio signals, and automatically calculates the local ionospheric electron density profile in real time.</p><img alt='Digisonde Network Map' src='http://www.digisonde.com/images/homepage-map.jpg' /><br><br>",
                U: "http://www.digisonde.com/",
                N: "DIGISONDE® Ionosonde Network"
            },
            {
                I: "elf-vlf",
                T: 'geojson',
                G: "/layers/geojson/elf-vlf-cv3d-v3.geojson",
                MI: "/img/icons/rf-warning.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Alpha RSDN-20, Beta Time Signal, LORAN-C, AWESOME VLF Network, Ground Wave Emergency Network (GWEN), and ELF transmission facilities.",
                U: "http://climateviewer.com/haarp/",
                N: "ELF and VLF Transmitters",
            },
            {
                I: "elf-vlf-ref",
                T: 'geojson',
                G: "/layers/geojson/elf-vlf-antennas-cv3d-v2.geojson",
                MI: "/img/icons/antenna.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Visual reference (Antennas) for the Alpha RSDN-20, Beta Time Signal, LORAN-C, AWESOME VLF Network, Ground Wave Emergency Network (GWEN), and ELF transmission facilities.",
                U: "http://climateviewer.com/haarp/",
                N: "ELF and VLF Visual Reference"
            },
            {
                I: "directed-energy",
                T: 'geojson',
                G: "/layers/geojson/xfiles-cv3d-v2.geojson",
                MI: "/img/icons/laser.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/rezn8d/",
                N: "Lasers and Directed-Energy"
            },
            {
                I: "nexrad",
                T: 'geojson',
                G: "/layers/geojson/radar-nexrad-cv3d-v2.geojson",
                MI: "/img/icons/doppler-green.png",
                S: '<p>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a>.<br><a href="http://radar.weather.gov/">radar.weather.gov</a><br><a href="http://www.roc.noaa.gov/WSR88D/About.aspx">WSR-88D Specifications</a><br><br>In 1988, the NEXRAD Agencies established the WSR-88D (Weather Surveillance Radar - 1988 Doppler) Radar Operations Center (ROC) in Norman, Oklahoma. The ROC employees come from the National Weather Service, Air Force, Navy, FAA, and support contractors. The ROC provides centralized meteorological, software, maintenance, and engineering support for all WSR-88D systems. WSR-88D systems will be modified and enhanced during their operational life to meet changing requirements, technology advances, and improved understanding of the application of these systems to real-time weather operations. The ROC also operates WSR-88D test systems for the development of hardware and software upgrades to enhance maintenance, operation, and provide new functionality.<br><br></p>',
                U: "http://www.roc.noaa.gov/WSR88D/Program/NetworkSites.aspx",
                N: "NEXRAD Doppler Radar Stations"
            },
            {
                I: "sigmet",
                T: 'geojson',
                G: "/layers/geojson/radar-sigmet-cv3d-v2.geojson",
                MI: "/img/icons/doppler-green.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br><p>The Canadian weather radar network consists of 31 weather radars spanning Canada's most populated regions. Their primary purpose is the early detection of precipitation, its motion and the threat it poses to life and property. Each has a range of 256 km (159 mi) in radius around the site to detect reflectivity, and a range of 128 km (80 mi) for detecting velocity patterns (Doppler effect).</p>",
                U: "http://weather.gc.ca/radar/index_e.html",
                N: "Canadian Sigmet Doppler Radar Stations"
            },
            {
                I: "tdwr",
                T: 'geojson',
                G: "/layers/geojson/radar-tdwr-cv3d-v2.geojson",
                MI: "/img/icons/doppler-yellow.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>The Terminal Doppler Weather Radar (TDWR) network is a Doppler weather radar system used primarily for the detection of hazardous wind shear conditions, precipitation, and winds aloft on and near major airports situated in climates with great exposure to thunderstorms in the United States. NCEI archives the derived products (called Level III), which are in the same data format as Next Generation Weather Radar (NEXRAD) Level III. NCEI does not archive the base data (called Level II).",
                U: "https://www.ncdc.noaa.gov/data-access/radar-data/tdwr",
                N: "Terminal Doppler Weather Radar (TDWR) Stations"
            },
            {
                I: "jss",
                T: 'geojson',
                G: "/layers/geojson/radar-jss-cv3d-v2.geojson",
                MI: "/img/icons/doppler-red.png",
                S: '<p>Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a>.<br>The JSS is a joint United States Air Force and Federal Aviation Administration system for the atmospheric air defense of North America. It replaced the Semi Automatic Ground Environment (SAGE) system in 1983.<br><br>The JSS consists of long range surveillance radars, primarily operated and maintained by the Federal Aviation Administration (FAA), but providing communication and radar data to both FAA and United States Air Force control centers.</p><h3>Air Route Surveillance Radar (ARSR)</h3><p>FAA equipment is a primarily a mixture of Long Range Air Route Surveillance Radars (ARSR) of various types, although some use legacy AN/FPS radars. They are co-located with UHF ground-air-ground (G/A/G) transmitter/receiver (GATR) facilities at many locations. Fourteen sites have VHF radios as well. The GATR facility provides radio access to fighters and Airborne early warning and control (AEW&C) aircraft from the SOCCs. The JSS has been enhanced under the FAA/Air Force Radar Replacement Program with 44 ARSR-4/FPS-130 radars to replace some of the many previous long-range radars. This provides common, high-performance, unattended radars. The ARSR-4/FPS-130 is a 3-D long range radar with an effective detection range of some 250 miles and has been fully integrated with JSS at all joint use sites.<br /><br />These radars are generally unattended except for periodic FAA maintenance crews which visit the sites as necessary.<br>Source: <a href="http://en.wikipedia.org/wiki/Joint_Surveillance_System">Joint Surveillance System Wikipedia</a><br><a href="https://www.fas.org/nuke/guide/usa/airdef/arsr-4.htm">ARSR-4 Reference FAS.org</a></p>',
                U: "http://climateviewer.com/rezn8d/",
                N: "Joint Surveillance System (JSS), FAA Long-range Radar"
            },
            {
                I: "ioos",
                T: 'geojson',
                G: "/layers/geojson/radar-ioos-cv3d-v2.geojson",
                MI: "/img/icons/doppler-blue.png",
                S: 'Created by <a href="http://climateviewer.com/rezn8d/">Jim Lee</a>.<br><p>High frequency (HF) radar systems measure the speed and direction of ocean surface currents in near real time. Currents in the ocean are equivalent to winds in the atmosphere because they move things from one location to another. These currents carry nutrients as well as pollutants, so it is important to know the currents for ecological and economic reasons. The currents carry any floating object, which is why U.S. Coast Guard search and rescue operators use HF radar data to make critical decisions when rescuing disabled vessels and people stranded in the water.</p><p>These radars can measure currents over a large region of the coastal ocean, from a few kilometers offshore up to 200 km, and can operate under any weather conditions. They are located near the water’s edge, and need not be situated atop a high point of land.  Traditionally, crews placed current measuring devices directly into the water to retrieve current speeds.  While these direct measurement systems are still widely used as a standard reference, HF radars are the only sensors that can measure large areas at once with the detail required for the important applications described here.  Not even satellites have this capability.</p>',
                U: "http://www.ioos.noaa.gov/hfradar/welcome.html",
                N: "Integrated Ocean Observing System (IOOS) Radar"
            },
            {
                I: "npn-wind-radar",
                T: 'geojson',
                G: "/layers/geojson/npn-wind-radar-cv3d-v2.geojson",
                MI: "/img/icons/radar-pink.png",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Wind profilers are specifically designed to measure vertical profiles of horizontal wind speed and direction from near the surface to above the tropopause. Data from this network are distributed in real-time to government and university atmospheric researchers, private meteorologists, the National Centers for Environmental Prediction, the Storm Prediction Center, all National Weather Service (NWS) Forecast Offices, and foreign agencies responsible for weather prediction.</p>",
                U: "http://www.profiler.noaa.gov/npn/npnSiteLocationsAsText.jsp",
                N: "NOAA Profiler Network (NPN) Wind Radar"
            },
            {
                I: "madis-wind-radar",
                T: 'geojson',
                G: "/layers/geojson/madis-cap-wind-radar-cv3d-v2.geojson",
                MI: "/img/icons/radar-purple.png",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>Cooperative Agency Profilers (CAP) is a cooperative venture between GSD (formerly FSL) and many participating agencies enabling GSD to; acquire profiler and RASS data in near real-time, apply GSD's data quality control algorithms, and make these value-added data available on the web and to the National Weather Service. At this time, data from approximately 100 CAP sites from over 35 different agencies from around the world are being acquired by GSD. The majority of CAP systems are 915 MHz Boundary Layer Profilers, there are also several 449 MHz and 50 MHz profilers in the CAP network.</p>",
                U: "https://madis-data.noaa.gov/cap/",
                N: "MADIS CAP Wind Radar"
            },
            {
                I: "aeronet",
                T: 'geojson',
                G: "/layers/geojson/aeronet-cv3d-v2.geojson",
                MI: "/img/icons/nasa.png",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>The AERONET (AErosol RObotic NETwork) program is a federation of ground-based remote sensing aerosol networks established by NASA and PHOTONS (Univ. of Lille 1, CNES, and CNRS-INSU) and is greatly expanded by collaborators from national agencies, institutes, universities, individual scientists, and partners. The program provides a long-term, continuous and readily accessible public domain database of aerosol optical, microphysical and radiative properties for aerosol research and characterization, validation of satellite retrievals, and synergism with other databases. The network imposes standardization of instruments, calibration, processing and distribution.</p>",
                U: "http://aeronet.gsfc.nasa.gov/",
                N: "AERONET (AErosol RObotic NETwork)"
            },
            {
                I: "bsrn",
                T: 'geojson',
                G: "/layers/geojson/bsrn-cv3d-v2.geojson",
                MI: "/img/icons/partly_cloudy.png",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>It is believed that the radiation budget of the Earth-atmosphere system plays a fundamental role in determining the thermal conditions and the circulation of the atmosphere and the ocean, shaping the main characteristics of the Earth's climate. The irradiances at the Earth's surface are especially important in understanding the climate processes, since the Earth's surface transforms approximately 60% of the solar radiation absorbed by the planet. These irradiances also occupy an important position in the ocean surface energy budget, ultimately influencing the major features of ocean currents.</p><p>While a small change in irradiance at the Earth's surface may cause a profound change in climate, the existing radiometric network is not capable of arriving at the required accuracy for climate research. In fact our present understanding of the radiation distribution both - horizontally and vertically - is not sufficient to understand the present climate. The simulation of the past and future climate changes, which would be induced by the change in radiation, is even more uncertain.</p><p>This was the background for the World Climate Research Programme (WCRP) Radiative Fluxes Working Group to initiate a new Baseline Surface Radiation Network (BSRN) to support the research projects of the WCRP and other scientific programs. Some years later the BSRN incorporated into the WCRP Global Energy and Water Cycle Experiment (GEWEX) Radiation Panel.</p>",
                U: "http://www.bsrn.awi.de/",
                N: "Baseline Surface Radiation Network (BSRN)"
            },
            {
                I: "esrl",
                T: 'geojson',
                G: "/layers/geojson/esrl-cv3d-v2.geojson",
                MI: "/img/icons/noaa.gif",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>NOAA Earth Systems Research Lab (ESRL). ESRL was formed to pursue a broad and comprehensive understanding of the Earth system. This system comprises many physical, chemical and biological processes that need to be dynamically integrated to better predict their behavior over scales from local to global and periods of minutes to millennia.</p>",
                U: "http://www.esrl.noaa.gov/psd/data/obs/sites/",
                N: "Earth Systems Research Lab (ESRL) Instruments"
            },
            {
                I: "doris",
                T: 'geojson',
                G: "/layers/geojson/doris-cv3d-v2.geojson",
                MI: "/img/icons/ids.png",
                S: "<p>Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.<br>DORIS is a Doppler satellite tracking system developped for precise orbit determination and precise ground location. It is onboard the Cryosat-2, Jason-1, Jason-2, ENVISAT and HY-2A altimetric satellites and the remote sensing satellites SPOT-4 and SPOT-5. It also flew with SPOT-2, SPOT-3 and TOPEX/POSEIDON.</p><p>IDS is an international service which provides a support, through DORIS data and products, to geodetic, geophysical, and other research and operational activities. New proposals for Analysis Centers and temporary or permanent DORIS stations are welcome.</p>",
                U: "http://Is-doris.org/network/googleearth.html",
                N: "DORIS (Doppler Orbitography and Radiopositioning Integrated by Satellite)"
            },
            {
                I: "f16",
                T: 'geojson',
                G: "/layers/geojson/atmospheric-observatories-cv3d-v4.geojson",
                MI: "/img/icons/radar-dish.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/rezn8d/",
                N: "Other Radars, Observatories, Telescope Arrays, Satellite Communications"
            },
            {
                I: "f161",
                T: 'geojson',
                G: "/layers/geojson/atmospheric-sensors-overlay-cv3d.geojson",
                MI: "/img/icons/radar-dish.png",
                S: "Created by <a href='http://climateviewer.com/rezn8d/'>Jim Lee</a>.",
                U: "http://climateviewer.com/rezn8d/",
                N: "Other Radars, Observatories, Telescope Arrays, Satellite Comm (OVERLAY)",
                Y: true,
            },
            {
                H: true,
                I: "f17",
                T: 'geojson',
                G: "/layers/geojson/FCC-cell-towers-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. Cellular (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "Cell Phone Towers (USA FCC)"
            },
            {
                H: true,
                I: "f24",
                T: 'geojson',
                G: "/layers/geojson/FCC-paging-towers-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. Paging (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "Paging Towers (USA FCC)"
            },
            {
                H: true,
                I: "f18",
                T: 'geojson',
                G: "/layers/geojson/FCC-AM-radio-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. AM (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "AM Radio (USA FCC)"
            },
            {
                H: true,
                I: "f19",
                T: 'geojson',
                G: "/layers/geojson/FCC-FM-radio-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. FM (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "FM Radio (USA FCC)"
            },
            {
                H: true,
                I: "f20",
                T: 'geojson',
                G: "/layers/geojson/FCC-Digital-TV-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. TV - Digital (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "Digital Television (USA FCC)"
            },
            {
                H: true,
                I: "f21",
                T: 'geojson',
                G: "/layers/geojson/FCC-NTSC-TV-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. TV - NTSC (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "NTSC Television (USA FCC)"
            },
            {
                H: true,
                I: "f22",
                T: 'geojson',
                G: "/layers/geojson/FCC-LM-broadcast-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. Land Mobile - Broadcast (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "Land Mobile Broadcast (USA FCC)"
            },
            {
                H: true,
                I: "f23",
                T: 'geojson',
                G: "/layers/geojson/FCC-BRS-EBS-2012-cv3d-v2.geojson",
                MI: "/img/icons/radioz.png",
                S: "Federal Communications Commission (FCC) Licensing Database Extracts. BRS/EBS (zip) (06-14-2012) .SHP file to GeoJSON conversion by Jim Lee",
                U: "http://web.archive.org/web/20140522193524/http://wireless.fcc.gov/geographic/index.htm?job=licensing_database_extracts",
                N: "Educational Broadcast (BRS/EBS) (USA FCC)"
            }
        ]
    },
    other: {
        N: "Other",
        MRMSunkenShips: {
            N: "Abandoned and Sunken Ships",
            icon: "fa-ship",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-01",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Historic-Ships-Preserved-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Historic Ships Preserved in Google Map"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-02",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Interactive-Map-of-Ship-Graveyards.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ship Graveyards"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-03",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Interactive-Map-of-the-Sunken-Ships-of-the-Atlantic.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sunken Ships of the Atlantic"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-04",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Interactive-Map-of-the-Sunken-Ships-of-the-Great-Lakes.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sunken Ships of the Great Lakes"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-05",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Interactive-Map-of-the-Sunken-Ships-of-the-Indian-Ocean-and-Red-Sea.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sunken Ships of the Indian Ocean and Red Sea"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-06",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Interactive-Map-of-the-Sunken-Ships-of-the-Pacific-Ocean.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sunken Ships of the Pacific Ocean"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-07",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Shipwrecks-Seen-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Shipwrecks Seen in Google Map"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-08",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Abandoned-and-Sunken-Ships/Sunken-Ships-of-the-Mediterranean-North-Baltic-and-Black-Seas.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sunken Ships of the Mediterranean, North Baltic, and Black Seas"
                }
            ]
        },
        MRMAncientRuins: {
            N: "Ancient Ruins",
            icon: "fa-university",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-09",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/American-Ghost-Towns.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ghost Towns of America"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-10",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/The-Ghost-Towns-of-Asia-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ghost Towns of Asia"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-11",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/Interactive-Map-of-Classic-European-Castles.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Classic European Castles"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-12",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/Interactive-Map-of-the-Ancient-and-Other-Ruins-of-Europe.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ancient and other Ruins of Europe"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-13",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/Interactive-map-of-the-Ancient-Lost-Cities.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ancient Lost Cities"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-14",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/Interactive-Map-of-the-Ancient-Ruins-of-Africa.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ancient Ruins of Africa"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-15",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/InteractiveMapoftheAncientandOtherRuinsofSouthCentralAmerica.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ancient and other Ruins of South Central America"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-16",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/The-Ruins-of-The-United-States-and-Other-Historic-Sites.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Ruins of the United States and other Historic Sites"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-17",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Ancient-Ruins/Interactive-Map-of-Aztec-Egyptian-Inca-Mayan-and-Chinese-Pyramids.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Aztec, Egyptian, Inca, Mayan, and Chinese Pyramids"
                }
            ]
        },

        MRMArchitecture: {
            N: "Architecture",
            icon: "fa-building-o",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-18",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Antarctic-Research-Bases-Cold-and-Desolate-Places.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Antarctic Research Bases Cold and Desolate Places"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-19",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/CitiesoftheDeadHeavenorHell.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Cities of the Dead - Heaven or Hell"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-20",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Google-Map-of-Bridge-Disasters.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Bridge Disasters"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-21",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Great-Libraries-of-Knowledge.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Great Libraries of Knowledge"
                },
                {
                    P: true,
                    I: "mrm-22",
                    Z: true,
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Interactive-Map-of-the-Top-10-Longest-Suspension-Bridges.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Top 10 Longest Suspension Bridges"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-23",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Interactive-Map-of-the-Works-of-Frank-Lloyd-Wright.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Map of the Works of Frank Lloyd Wright"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-24",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Mind-Blowing-Open-Pit-Mines.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mind Blowing Open Pit Mines"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-25",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/Road-and-Rail-Tunnel-prowess-found-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Road and Rail Tunnels"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-26",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/SpaceCenters-Non-Military-Space-Launch-Sites.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Space Centers and Non-Military Launch Sites"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-27",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-MRM-Unofficial-Guide-of-Royal-Palaces-(A-D).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "MRM Unofficial Guide of Royal Palaces (A-D)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-28",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-MRM-Unofficial-Guide-to-Royal-Palaces-(E-J).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "MRM Unofficial Guide of Royal Palaces (E-J)"
                },
                {
                    Z: true,
                    P: true,
                    I: "mrm-29",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-Oldest-Lighthouses-Aged-Protectors-of-Globalization.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Oldest Lighthouses Aged Protectors of Globalization"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-30",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-Roller-Coasters-of-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Roller Coasters"
                },
                {
                    Z: true,
                    P: true,
                    I: "mrm-31",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-World's-Best-Botanical-Gardens-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The World's Best Botanical Gardens"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-32",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-World's-Best-Zoos-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The World's Best Zoos"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-33",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Architecture/The-World's-Largest-Sports-Stadiums.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The World's Largest Sports Stadiums"
                }
            ]
        },
        MRMConquerors: {
            N: "Conquerors and Wars",
            icon: "fa-fighter-jet",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-34",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Battles-of-the-War-of-1812/1812.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battles of the War of 1812 (1812)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-35",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Battles-of-the-War-of-1812/1813.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battles of the War of 1812 (1813)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-36",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Battles-of-the-War-of-1812/1814.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battles of the War of 1812 (1813)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-37",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Battles-of-the-War-of-1812/1815.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battles of the War of 1812 (1815)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-38",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Battle-of-Waterloo-1815.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battle of Waterloo 1815"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-39",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-Pizarro's-Conquering-of-Peru.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Pizarro's Conquering of Peru"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-40",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-adventures-of-Blackbeard-the-pirate.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Adventures of Blackbeard the Pirate"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-41",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-American-Revolution.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "American Revolution"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-42",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-Battles-of-Spartacus.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battles of Spartacus"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-43",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-conquering-of-Mexico-by-Hernan-Cortés.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Conquering of Mexico by Hernan Cortés"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-44",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-travels-of-the-7th-Portuguese-India-Armada-(Almeida).kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Travels of the 7th Portuguese India Armada (Almeida)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-45",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Interactive-Map-of-the-Wars-of-Alexander-the-Great.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Wars of Alexander the Great"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-46",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Le-Train-The-Rescuing-of-the-German-Looted-French-Art-Train-(1944)-Fact-vs-Fiction.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Wars of Alexander the Great"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-46",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Mexican-American-War-of-1846-1848.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mexican-American War of 1846-1848"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-47",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Part-1-of-Interactive-Map-of-The-Civil-War-Southern-Assertiveness-(1861-1863).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Civil War - Southern Assertiveness (1861-1863) (Part 1)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-48",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Part-2-of-Interactive-Map-of-the-Civil-War-Divide-and-Conquer-(1863-1865).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Civil War - Divide and Conquer (1863-1865) (Part 2)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-49",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/Sir-Francis-Drake's-1572-expedition-against-the-Spanish-treasure-house-at-Nombre-de-Dios.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sir Francis Drake's 1572 expedition against the Spanish treasure house at Nombre de Dios"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-50",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/The-conquering-of-North-America-by-Hernando-de-Soto.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Conquering North America by Hernando de Soto"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-51",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/WWII-Battles-The-Eastern-Front-The-German-Offense-(1939-1942).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "WWII Battles - The Eastern Front - German-Offensive (1939-1942)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-52",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/WWII-Battles-The-Eastern-Front-Soviet-Offensive-(1943-1945).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "WWII Battles - The Eastern Front - Soviet-Offensive (1943-1945)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-53",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/WWII-Battles-The-Mediterranean-and-North-African-Front.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "WWII Battles - The Mediterranean and North African Front"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-54",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Conquerors-and-Wars/WWII-Battles-The-Western-Front.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "WWII Battles - The Western Front"
                }
            ]
        },
        MRMCrimeSprees: {
            N: "Crime Sprees",
            icon: "fa-user-secret",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-55",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Crime-sprees/Bonnie-and-Clyde-Crime-Spree-of-1932-1934.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Bonnie and Clyde Crime Spree of 1932-1934"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-56",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Crime-sprees/Boston-Marathon-Manhunt-as-it-happened.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Boston Marathon Manhunt as it happened"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-57",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Crime-sprees/Corporatecrimethathelpedsetthestageforthe2008collapseoftheworldeconomy.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Corporate Crime that helped set the stage for the 2008 collapse of the world economy"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-58",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Crime-sprees/Google-Map-of-the-John-Dillinger-Crime-Spree.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The John Dillinger Crime Spree"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-59",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Crime-sprees/The-Trayvon-Martin-murder-scene-timeline-in-a-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Trayvon Martin murder scene timeline"
                }
            ]
        },
        MRMDisease: {
            N: "Disease Outbreaks",
            icon: "fa-hospital-o",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-60",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/Google-Map-of-Infectious-Disease-Quarantines.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Map of Infectious Disease Quarantines"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-61",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/Mad-Cow-Disease-Outbreaks.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mad Cow Disease Outbreaks"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-62",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/Middle-East-Respiratory-Syndrome-(MERS)-Outbreaks.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Middle East Respiratory Syndrome (MERS) Outbreaks"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-63",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/The-Spread-of-Ebola-Outbreaks-(1976-2015).kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Spread of Ebola Outbreaks (1976-2015)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-64",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/The-Worldwide-Outbreak-of-SARS.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Worldwide Outbreak of SARS"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-65",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Disease-Outbreaks/USA-Meningitis-Outbreak-2012-2013.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "U.S. Meningitis Outbreak (2012-2013)"
                }
            ]
        },
        economic: {
            N: "Economic",
            icon: "fa-money",
            '>': [
                {
                    I: "native-american1",
                    Z: true,
                    T: 'kml',
                    G: "/layers/kml/3rdparty/other/Indian-Lands.kmz",
                    S: "This map layer shows Indian lands of the United States. Only areas of 640 acres or more are included. Federally-administered lands within a reservation are included for continuity; these may or may not be consIered part of the reservation and are simply described with their feature type and the administrating Federal agency. This is an updated version of the December 2005 map layer.",
                    U: "http://nationalatlas.gov/atlasftp.html#indlanp",
                    N: "Native American Lands 2005"
                },
                {
                    I: "urban_areas_fill",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "urban_areas_fill",
                    S: "NOAA Ocean Service's nowCOAST's Map Services - U.S. Urban Area Boundaries (color-filled polygons)",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Urban Areas"
                },
                {
                    I: "eez",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "eez",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Exclusive Economic Zone Boundaries"
                },
                {
                    I: "world_countries",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "world_countries",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "World Country Boundaries"
                }
            ]
        },
        MRMExplorers: {
            N: "Explorers",
            icon: "fa-compass",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-66",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Adventures-of-the-big-game-hunter-and-explorer-Ewart-Scott-Grogan.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Adventures of the big game hunter and explorer Ewart Scott Grogan"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-67",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/CabralCacellas1626-28explorationofBhutanTibet.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Cabral Cacellas exploration of Bhutan Tibet (1626-28)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-68",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Fridtjof-Nansen's-Farthest-North-Arctic-Expedition.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fridtjof Nansen's Farthest North Arctic Expedition"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-69",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Garcia's-1524-search-for-and-plundering-the-White-King's-cities-of-incomparable-wealth.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Garcia's 1524 search for and plundering the White King's cities of incomparable wealth"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-70",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Herrons1899ExplorationofAlaska.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Herron's Exploration of Alaska (1899)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-71",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-BurkeWills-Exploration-of-the-Interior-of-Australia-1860.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "BurkeWills Exploration of the Interior of Australia (1860)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-72",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Dampier's-1699-Voyage-to-New-Holland.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Dampier's Voyage to New Holland (1699)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-73",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-George-Simpson's-1828-Canoe-Voyage-Across-Canada.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "George Simpson's Canoe Voyage Across Canada (1828)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-74",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Gerhard-Rohlfs'-Adventures-in-Morocco.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Gerhard Rohlfs' Adventures in Morocco"
                },
                /*{
                 P: true,
                 Z: true,
                 I: "mrm-75",
                 T: 'kml',
                 G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Gustav-Nachtigal's-1861-Sahara-and-Sudan-Adventure.kmz",
                 S: "Created by George Stiller of MyReadingMapped&trade;",
                 U: "http://stilltheman2.wix.com/myreadingmapped",
                 N: "Gustav Nachtigal's Sahara and Sudan Adventure (1861)"
                 }, */
                {
                    P: true,
                    Z: true,
                    I: "mrm-76",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Herndon's-Exploration-of-the-Amazon-Valley-1851.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Herndon's Exploration of the Amazon Valley (1851)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-77",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Isabella-Bird's-1896-Exploration-of-the-Yangtze-River-and-Beyond.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Isabella Bird's Exploration of the Yangtze River and Beyond (1896)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-78",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-James-Cook's-1772-Voyage-to-the-South-Pole-and-Round-the-World.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "James Cook's Voyage to the South Pole and Round the World (1772)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-79",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Lewis-and-Clark's-Expedition-1804-through-1805.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Lewis and Clark's Expedition (1804-1805)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-80",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Mikael-Strandberg's-Siberian-Expedition.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mikael Strandberg's Siberian Expedition"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-81",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Mungo-Park's-African-Travels.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mungo Park's African Travels"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-82",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Roald-Amundsen's-Northwest-Passage.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Roald Amundsen's Northwest Passage"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-83",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Shackleton's-Trans-Antarctic-Expedition-of-1914–17.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Shackleton's Trans-Antarctic Expedition (1914–1917)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-84",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Stanley's-Rescue-of-Emin-Pasha-(In-Darkest-Africa).kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Stanley's Rescue of Emin Pasha (In Darkest Africa)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-85",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-map-of-the-1866-de-LagréeGarnier-Exploration-of-the-Mekong-River.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "de LagréeGarnier Exploration of the Mekong River (1866)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-86",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-adventures-of-Blackbeard-the-pirate.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Adventures of Blackbeard the pirate"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-87",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Adventures-of-Charles-Darwin-1832-1836.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Adventures of Charles Darwin (1832-1836)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-88",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Explorations-of-Nain-Singh-Rawat.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Explorations of Nain Singh Rawat"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-89",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Mutiny-on-the-Bounty.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mutiny on the Bounty"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-90",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Travels-of-Benjamin-of-Tudela-(1160-A.D.).kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Travels of Benjamin of Tudela (1160)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-91",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Travels-of-Marco-Polo.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Travels of Marco Polo"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-92",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-the-Voyage-of-Pytheas.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Voyage of Pytheas"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-93",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Vitus-Bering's-fatal-expedition-of-1734.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Vitus Bering's fatal expedition (1734)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-94",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-Willem-Barentsz-fatal-3rd-Arctic-Voyage.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Willem Barentsz fatal 3rd Arctic Voyage"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-95",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Interactive-Map-of-William-Gifford-Palgrave’s-1862-Journey-through-Central-and-Eastern-Arabia.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "William Gifford Palgrave’s Journey through Central and Eastern Arabia (1862)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-96",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/InteractiveMapofAfanasyNikitins1466ExplorationofIndia.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Afanasy Nikitins Exploration of India (1466)"
                },
                {
                    P: true,
                    I: "mrm-97",
                    Z: true,
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Livingstone's-1866-Source-of-the-Nile-River-Expedition.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Livingstone's Source of the Nile River Expedition (1866)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-98",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Livingstone's-Trans-African-Expedition-Loanda-to-Quilimane-1854-1856.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Livingstone's Trans-African Expedition - Loanda to Quilmane (1854-1856)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-99",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Mikael-Strandberg's-2012-Yemen-Expedition.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mikael Strandberg's Yemen Expedition (2012)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-100",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Samuel-White-Baker's-Exploration-of-the-Nile-tributaries-of-Abyssinia.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Samuel White Baker's Exploration of the Nile tributaries of Abyssinia"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-101",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Schwatka's-1878-Arctic-Search-for-Sir-John-Franklin.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Schwatka's Arctic Search for Sir John Franklin (1878)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-102",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/SiberianExplorationsofDemidPyanda1620-1623.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Siberian Explorations of Demid Pyanda (1620-1623)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-103",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/TeddyRooseveltexplorestheBrazilianwilderness.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Teddy Roosevelt Explores the Brazilian Wilderness"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-104",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/The-7-voyages-of-Zheng-He.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The 7 voyages of Zheng He"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-105",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Explorers/Xuanzang'-s-629-Pilgrimage-to-India.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Xuanzang's Pilgrimage to India (629)"
                }
            ]
        },
        flight: {
            N: "Flight",
            icon: "fa-plane",
            '>': [
                {
                    I: "us_runways",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "us_runways",
                    S: "NOAA Ocean Service's nowCOAST's Map Services - Locations/Footprints of U.S. Airport Runways",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Airport Runways"
                },
                {
                    I: "artcc",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "artcc",
                    S: "NOAA Ocean Service's nowCOAST's Map Services - Air Route Traffic Control Centers - Areas of Responsibility",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "Air Route Traffic Control Center Boundaries"
                }
            ]
        },
        MRMFossils: {
            N: "Fossil Sites",
            icon: "fa-flask",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-106",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Fossil-sites/Fossil-Sites-in-Africa-A-Paleontology-Primer-in-a-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fossil Sites in Africa (A Paleontology Primer)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-107",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Fossil-sites/Fossil-Sites-of-Antarctica-and-Oceania-A-Paleontology-Primer-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fossil Sites of Antarctica and Oceania (A Paleontology Primer)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-108",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Fossil-sites/Fossil-Sites-of-Asia-A-Paleontology-Primer-in-a-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fossil Sites of Asia (A Paleontology Primer)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-109",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Fossil-sites/Fossil-Sites-of-Europe-A-Paleontology-Primer-in-a-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fossil Sites of Europe (A Paleontology Primer)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-110",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Fossil-sites/Fossil-Sites-of-North-and-South-America-A-Paleontology-Primer-in-a-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fossil Sites of North and South America (A Paleontology Primer)"
                }
            ]
        },
        geographic: {
            N: "Geographic",
            icon: "fa-globe",
            '>': [
                {
                    I: "pyramids",
                    T: 'kml',
                    G: "/layers/kml/3rdparty/other/Pyramids-FR-CV3D.kmz",
                    S: "based on the film &quot;Revelations of the PyramIs&quot;",
                    U: "http://www.youtube.com/watch?v=GhC6lhAD4xY",
                    N: "Pyramids of the World"
                },
                {
                    I: "world_rivers",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "world_rivers",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "World Rivers"
                },
                {
                    I: "world_lakes",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "world_lakes",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "World Lakes"
                },
                {
                    I: "great_lakes",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "great_lakes",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "World Great Lakes"
                },
                {
                    I: "rivers",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "rivers",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Rivers"
                },
                {
                    I: "lakes",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "lakes",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Lakes"
                },
                {
                    I: "watersheds",
                    T: 'wms',
                    G: "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs",
                    L: "watersheds",
                    S: "NOAA Ocean Service's nowCOAST's Map Services",
                    U: "http://nowcoast.noaa.gov/help/mapservices.shtml",
                    N: "U.S. Watershed Boundaries"
                }
            ]
        },
        MRMGeoscience: {
            N: "Geoscience and Oceanography",
            icon: "fa-globe",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-111",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/A-Depth-Gauge-for-understanding-Oceans-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "A Depth Gauge for understanding Oceans"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-112",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Darwin's-Origin-of-the-Species-Google-Mapped.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Darwin's Origin of the Species"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-114",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Geography-of-the-Köppen-Climate-Classification-System.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Geography of the Köppen Climate Classification System"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-115",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Google-Map-of-Climate-Change.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Climate Change"
                },
                {
                    P: true,
                    I: "mrm-116",
                    Z: true,
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Google-Map-of-Terrestrial-Biomes-and-Ecoregions.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Terrestrial Biomes and Ecoregions"
                },
                {
                    P: true,
                    I: "mrm-117",
                    Z: true,
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Google-Map-of-the-Topography-of-the-Thermohaline-Circulation-of-the-Oceans.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Topography of the Thermohaline Circulation of the Oceans"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-118",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Google-Map-of-the-World's-Vanishing-Lakes-and-Rivers.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The World's Vanishing Lakes and Rivers"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-119",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Interactive-Map-of-Environmental-Disasters.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Map of Environmental Disasters"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-120",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Interactive-Map-of-Oceanic-Trenches-and-other-Undersea-Phenomena.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Oceanic Trenches and other Undersea Phenomena"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-121",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Its-Raining-Frogs-Fish-and-What.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "It's Raining Frogs, Fish, and What?"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-122",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Mass-Whale-Stranding-Sites.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Mass Whale Stranding Sites"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-123",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/The-Atmosphere-of-Earth-in-Google-Earth.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Atmosphere of Earth"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-124",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/The-El-Niño-Zone.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The El-Niño Zone"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-125",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/The-price-of-progress-One-state's-toxic-legacy.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The price of progress - One state's toxic legacy"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-126",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/The-Submarine-Topography-of-Hydrothermal-Vents-Cold-Seeps-and-the-likey-Origins-of-Life.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Submarine Topography of Hydrothermal Vents - Cold Seeps and the likey Origins of Life"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-127",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/The-Topography-of-Giant-Wave-Zones.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Topography of Giant Wave Zones"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-128",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Topography-of-Plate-Tectonics.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Topography of Plate Tectonics"
                }
            ]
        },
        MRMGovernment: {
            N: "Government",
            icon: "fa-gavel",
            '>': [
                {
                    Z: 'home',
                    I: "mrm-113",
                    T: 'geojson',
                    MI: "/img/icons/dollar.png",
                    G: "/layers/kml/MyReadingMapped/Geoscience-and-Oceanography/Democracy-of-Chaos-Places-affected-by-the-2013-US-Government-Shutdown.geojson",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Democracy of Chaos - Places affected by the 2013 U.S. Government Shutdown"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-129",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Government/Fortune-500-Companies-that-received-government-subsidies-while-avoiding-paying-taxes.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Fortune 500 Companies that received government subsidies while avoiding paying taxes"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-130",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Government/Google-Map-of-The-Italian-Renaissance.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Italian Renaissance"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-131",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Government/History-of-Republic-Forms-of-Government-Good-Bad-and-Troubled-as-of-2013.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "History of Republic, Forms of Government - The Good, Bad, and Troubled as of 2013"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-132",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Government/In-Search-of-Utopia-The-ultimate-paradox.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "In Search of Utopia - The ultimate paradox"
                }
            ]
        },
        MRMGreenEnergy: {
            N: "Green Energy Solutions",
            icon: "fa-recycle",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-133",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Green-Energy-Solutions/Municipal-Waste-To-Energy-Plants-the-privatization-of-government-services.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Municipal Waste To Energy Plants - the privatization of government services"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-134",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Green-Energy-Solutions/Operational-Solar-Power-Facilities-seen-in-Google-Map-as-of-2013.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Operational Solar Power Facilities (2013)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-135",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Green-Energy-Solutions/Restored-Renewable-Recreational-and-Residential-Toxic-Trash-Dumps.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Restored, Renewable, Recreational, and Residential Toxic Trash Dumps"
                }
            ]
        },
        MRMLandscapePaintings: {
            N: "Landscape Painting Sites",
            icon: "fa-tint",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-136",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Landscape-painting-sites/Battle-sites-valor-and-carnage-expressed-in-paintings.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Battle sites - valor and carnage expressed in paintings"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-137",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Landscape-painting-sites/Interactive-Map-of-the-Life-and-Art-Vincent-van-Gogh.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Life and Art of Vincent van-Gogh"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-138",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Landscape-painting-sites/Landscape-painting-locations-of-impressionist-Claude-Monet.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Landscape painting locations of impressionist Claude Monet"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-139",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Landscape-painting-sites/The-Life-and-Art-of-Paul-Cézanne.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Life and Art of Paul Cézanne"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-140",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Landscape-painting-sites/The-world-as-seen-in-Landscape-Paintings.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The World seen in Landscape Paintings"
                }
            ]
        },
        boats: {
            N: "Marine Traffic",
            icon: "fa-anchor",
            '>': [
                {
                    P: true,
                    I: "kml-noaabuoy",
                    T: 'kml',
                    G: "http://www.ndbc.noaa.gov/kml/marineobs_as_kml.php?sort=owner",
                    S: "National Oceanic and Atmospheric Administration (NOAA) National Data Buoy Center",
                    U: "http://www.ndbc.noaa.gov/",
                    N: "NOAA Buoy Tracker"
                },
                {
                    P: true,
                    I: "kml-noaaship",
                    T: 'kml',
                    G: "http://egisws02.nos.noaa.gov/shiptracker/kml/All_Ships_CL.kmz",
                    S: "National Oceanic and Atmospheric Administration (NOAA)",
                    U: "http://egisws02.nos.noaa.gov/shiptracker/",
                    N: "NOAA Ship Tracker"
                }
            ]
        },
        MRMMigration: {
            N: "Migration",
            icon: "fa-users",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-141",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/Exodus-According-to-the-Book-of-Wikipedia-and-Other-Sources.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Exodus According to the Book of Wikipedia and Other Sources"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-142",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/Native-American-Settlement-in-Alaska.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Native American Settlement in Alaska"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-143",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/The-Amistad-Slave-Route-and-Revolt.kmz",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Amistad Slave Route and Revolt"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-144",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/The-Oregon-California-and-Mormon-Trails.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Oregon, California, and Mormon Trails"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-145",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/The-rise-fall-and-migration-of-civilization-due-to-climate-change.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Rise, Fall, and Migration of Civilizations due to Climate Change"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-146",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Migration/The-Sante-Fe-Trail-and-El-Camino-Real-Trade-Route.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The Sante-Fe Trail and El-Camino Real Trade Route"
                }
            ]
        },
        MRMMountainClimbs: {
            N: "Mountain Climbing Expeditions",
            icon: "fa-area-chart",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-147",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Mountain-climbing-expeditions/Hillary's-1953-Mount-Everest-Climb.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Hillary's 1953 Mount Everest Climb"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-148",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Mountain-climbing-expeditions/K2-The-First-Successful-Mountain-Climb-of-the-World's-2nd-Highest-Mountain-in-Google-Map-1954.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "K2 The First Successful Mountain Climb of the World's 2nd Highest Mountain (1954)"
                }
            ]
        },
        MRMPlaneCrashSites: {
            N: "Plane Crash Sites",
            icon: "fa-plane",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-155",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Interactive-Map-of-Commercial-Propeller-Driven-Airplane-Crashes-1920-1960.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Propeller-driven Aviation Crashes (1920-1960)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-149",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-1961-1970.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (1961-1970)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-150",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-1971-1980.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (1971-1980)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-151",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-1981-1990.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (1981-1990)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-152",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-1991-2000.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (1991-2000)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-153",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-2001-2010.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (2001-2010)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-154",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Commercial-Aviation-Crashes-2011-2020.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Commercial Aviation Crashes (2011-2020)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-155",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Plane-crash-sites/Plane-Wrecks-Seen-in-Google-Map.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Plane Wrecks seen by Satellite"
                }
            ]
        },
        MRMTrainCrashSites: {
            N: "Train Crash Sites",
            icon: "fa-train",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-156",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Train-crash-sites/The-Great-Train-Wrecks-of-1830-to-1930.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Great Train Wrecks (1830-1930)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-157",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Train-crash-sites/Great-Train-Crashes-1930-1949.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Great Train Crashes (1930-1949)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-158",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/Train-crash-sites/Train-Crashes-2010-through-2014.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Train Crashes (2010-2014)"
                }
            ]
        },
        MRMWorldFairOlympics: {
            N: "World Fairs and Olympics",
            icon: "fa-trophy",
            '>': [
                {
                    P: true,
                    Z: true,
                    I: "mrm-159",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/World-Fairs-and-Olympics/2014-Sochi-Olympics.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "Sochi Olympics (2014)"
                },
                {
                    P: true,
                    Z: true,
                    I: "mrm-160",
                    T: 'kml',
                    G: "http://climateviewer.org/layers/kml/MyReadingMapped/World-Fairs-and-Olympics/The-History-of-World's-Fair-Expositions-1851-2017.kml",
                    S: "Created by George Stiller of MyReadingMapped&trade;",
                    U: "http://stilltheman2.wix.com/myreadingmapped",
                    N: "The History of World's Fair Expositions (1851-2017)"
                }
            ]
        }
    },
    basemaps: {
        N: "Base Layer",
        '>': [
            {
                I: "bl-dark-matter",
                T: 'cartodb-layer',
                G: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                S: "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                U: "https://cartodb.com/basemaps/",
                N: "Dark Matter"
            },
            {
                I: "bl-dark-matter-nl",
                T: 'cartodb-layer',
                G: "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
                S: "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                U: "https://cartodb.com/basemaps/",
                N: "Dark Matter (No Labels)"
            },
            {
                I: "bl-dark-matter-ol",
                T: 'cartodb-layer',
                G: "http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
                S: "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
                U: "https://cartodb.com/basemaps/",
                N: "Dark Matter (Only Labels)"
            },
            {
                I: "Bing_AERIAL_WITH_LABELS",
                T: 'bing',
                G: "AERIAL_WITH_LABELS",
                S: "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                N: "Bing Maps Aerial with Labels"
            },
            {
                I: "Bing_AERIAL",
                T: 'bing',
                G: "AERIAL",
                S: "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                N: "Bing Maps Aerial"
            },
            {
                I: "Bing_ROADS",
                T: 'bing',
                G: "ROADS",
                S: "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                N: "Bing Maps Roads"
            },
            {
                X: true,
                I: "World_Imagery",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
                S: "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. The map includes 15m TerraColor imagery at small and mid-scales (591M down to 72k) and 2.5m SPOT Imagery (288k to 72k) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from Digital Globe. Recent 1m USDA NAIP imagery is available in select states of the US. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, Getmapping, AeroGRID, IGN Spain, and IGP Portugal. Additionally, imagery at different resolutions has been contributed by the GIS User Community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                N: "ESRI World Imagery"
            },
            {
                X: true,
                I: "World_Street_Map",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
                S: "This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of Canada; Mexico; Europe; Japan; Australia and New Zealand; India; South America and Central America; Africa; and most of the Middle East. This comprehensive street map includes highways, major roads, minor roads, one-way arrow indicators, railways, water features, administrative boundaries, cities, parks, and landmarks, overlaid on shaded relief imagery for added context. The map also includes building footprints for selected areas. Coverage is provided down to ~1:4k with ~1:1k and ~1:2k data available in select urban areas. The street map was developed by Esri using Esri basemap data, DeLorme basemap layers, U.S. Geological Survey (USGS) elevation data, Intact Forest Landscape (IFL) data for the world; HERE data for Europe, Australia and New Zealand, North America, South America and Central America, Africa, and most of the Middle East; OpenStreetMap contributors for select countries in Africa; MapmyIndia data in India; and select data from the GIS user community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
                N: "ESRI World Street Map"
            },
            {
                X: true,
                I: "Ocean_Basemap",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer",
                S: "This map is designed to be used as a base map by marine GIS professionals and as a reference map by anyone interested in ocean data. The base map includes bathymetry, marine water body names, undersea feature names, and derived depth values in meters. Land features include administrative boundaries, cities, inland waters, roads, overlaid on land cover and shaded relief imagery. The map was compiled from a variety of best available sources from several data providers, including General Bathymetric Chart of the Oceans GEBCO_08 Grid, IHO-IOC GEBCO Gazetteer of Undersea Feature Names, National Oceanic and Atmospheric Administration (NOAA), and National Geographic, DeLorme, NAVTEQ, Geonames.org, and Esri, and various other contributors. The base map currently provides coverage for the world down to a scale of ~1:577k, and coverage down to 1:72k in US coastal areas, and various other areas. Coverage down to ~ 1:9k is available limited areas based on regional hydrographic survey data. The base map was designed and developed by Esri. NOTE: Data from the GEBCO_08 grid shall not to be used for navigation or for any other purpose relating to safety at sea. The GEBCO_08 Grid is largely based on a database of ship-track soundings with interpolation between soundings guided by satellite-derived gravity data. In some areas, data from existing grids are included. The GEBCO_08 Grid does not contain detailed information in shallower water areas, information concerning the generation of the grid can be found on GEBCO's web site: http://www.gebco.net/data_and_products/gridded_bathymetry_data. The GEBCO_08 Grid is accompanied by a Source Identifier (SID) Grid which indicates which cells in the GEBCO_08 Grid are based on soundings or existing grids and which have been interpolated. The latest version of both grids and accompanying documentation is available to download, on behalf of GEBCO, from the British Oceanographic Data Centre (BODC) https://www.bodc.ac.uk/data/online_delivery/gebco. The names of the IHO (International Hydrographic Organization), IOC (intergovernmental Oceanographic Commission), GEBCO (General Bathymetric Chart of the Oceans), NERC (Natural Environment Research Council) or BODC (British Oceanographic Data Centre) may not be used in any way to imply, directly or otherwise, endorsement or support of either the Licensee or their mapping system.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer",
                N: "ESRI Oceans"
            },
            {
                X: true,
                I: "World_Physical_Map",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer",
                S: "This map presents the Natural Earth physical map at 1.24km per pixel for the world and 500m for the coterminous United States.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer",
                N: "ESRI World Physical"
            },
            {
                X: true,
                I: "World_Shaded_Relief",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer",
                S: "This map portrays surface elevation as shaded relief. This map is used as a basemap layer to add shaded relief to other GIS maps, such as the ArcGIS Online World Street Map. It is especially useful in maps that do not contain orthoimagery. The map resolution (cell size) is as follows: 30 Meters for the U.S. 90 Meters for all land areas between 60° north and 56° south latitude. 1 KM resolution above 60° north and 56° south. The shaded relief imagery was developed by Esri using GTOPO30, Shuttle Radar Topography Mission (SRTM), and National Elevation Data (NED) data from the USGS.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
                N: "ESRI World Shaded Relief"
            },
            {
                X: true,
                I: "World_Topo_Map",
                T: 'arcgis-base-layer',
                L: "0",
                G: "//services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
                S: "This map is designed to be used as a basemap by GIS professionals and as a reference map by anyone. The map includes administrative boundaries, cities, water features, physiographic features, parks, landmarks, highways, roads, railways, and airports overlaid on land cover and shaded relief imagery for added context. The map provides coverage for the world down to a scale of ~1:72k. Coverage is provided down to ~1:4k for the following areas: Australia and New Zealand; India; Europe; Canada; Mexico; the continental United States and Hawaii; South America and Central America; Africa; and most of the Middle East. Coverage down to ~1:1k and ~1:2k is available in select urban areas. This basemap was compiled from a variety of best available sources from several data providers, including the U.S. Geological Survey (USGS), U.S. Environmental Protection Agency (EPA), U.S. National Park Service (NPS), Food and Agriculture Organization of the United Nations (FAO), Department of Natural Resources Canada (NRCAN), GeoBase, Agriculture and Agri-Food Canada, DeLorme, HERE, Esri, OpenStreetMap contributors, and the GIS User Community.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer",
                N: "ESRI World Topographic"
            },
            {
                X: true,
                I: "USA_Topo_Maps",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer",
                S: "This map presents land cover imagery for the world and detailed topographic maps for the United States. The map includes the National Park Service (NPS) Natural Earth physical map at 1.24km per pixel for the world at small scales, i-cubed eTOPO 1:250,000-scale maps for the contiguous United States at medium scales, and National Geographic TOPO! 1:100,000 and 1:24,000-scale maps (1:250,000 and 1:63,000 in Alaska) for the United States at large scales. The TOPO! maps are seamless, scanned images of United States Geological Survey (USGS) paper topographic maps.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer",
                N: "ESRI USA Topographic"
            },
            {
                X: true,
                I: "NatGeo_World_Map",
                T: 'arcgis-base-layer',
                G: "//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer",
                S: "This map is designed to be used as a general reference map for informational and educational purposes as well as a base map by GIS professionals and other users for creating web maps and web mapping applications. The map was developed by National Geographic and Esri and reflects the distinctive National Geographic cartographic style in a multi-scale reference map of the world. The map was authored using data from a variety of leading data providers, including DeLorme, HERE, UNEP-WCMC, NASA, ESA, USGS, and others. This reference map includes administrative boundaries, cities, protected areas, highways, roads, railways, water features, buildings and landmarks, overlaid on shaded relief and land cover imagery for added context. The map currently includes global coverage down to ~1:144k scale and more detailed coverage for North America down to ~1:9k scale.",
                U: "http://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer",
                N: "ESRI National Geographic"
            },
            {
                I: "bl-std",
                T: 'base-layer',
                G: "//stamen-tiles.a.ssl.fastly.net/toner/",
                S: "A high contrast black and white map. Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                U: "http://maps.stamen.com/",
                N: "Stamen Toner"
            },
            {
                I: "bl-stl",
                T: 'base-layer',
                G: "//stamen-tiles.a.ssl.fastly.net/toner-lite/",
                S: "A high contrast black and white map (light colored version). Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                U: "http://maps.stamen.com/",
                N: "Stamen Toner (Light)"
            },
            {
                I: "bl-swc",
                T: 'base-layer',
                G: "//stamen-tiles.a.ssl.fastly.net/watercolor/",
                S: "Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect area washes and organic edges over a paper texture to add warm pop to any map. Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                U: "http://maps.stamen.com/",
                N: "Stamen Watercolor"
            },
            {
                I: "bl-osm",
                T: 'base-layer',
                G: "//a.tile.openstreetmap.org/",
                S: "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.",
                U: "http://www.openstreetmap.org",
                N: "OpenStreetMap (OSM)"
            },
            {
                I: "bl-mq",
                T: 'base-layer',
                G: "//otile1-s.mqcdn.com/tiles/1.0.0/osm/",
                S: "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.",
                U: "http://www.openstreetmap.org",
                N: "MapQuest OpenStreetMap"
            }
        ]
    }
};

