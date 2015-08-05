<?php

//$url = 'http://' . $_GET["url"];
$url = urldecode($_SERVER['QUERY_STRING']);
$ext = pathinfo($url, PATHINFO_EXTENSION);
 
switch ($ext) {
    case "kml":
        header('Content-Type: application/vnd.google-earth.kml+xml');
    case "kmz":
        header('Content-Type: application/vnd.google-earth.kmz');
    case "jpg":
        header('Content-Type: image/jpeg');
    case "gif":
        header('Content-Type: image/gif');
    case "png":
        header('Content-Type: image/png');
    default:
        header('Content-Type: text/xml');
    }


//http://stackoverflow.com/questions/11733876/how-to-get-content-ot-remote-html-page
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$output = curl_exec($curl);
curl_close($curl);
// header("Access-Control-Allow-Origin: *");
echo $output;


?>

