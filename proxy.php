<?php
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
    case "xml":
        header('Content-Type: text/xml');
    case "json":
        header('Content-Type: application/javascript');
    case "jsonp":
        header('Content-Type: application/javascript');
    default:
        header('Content-Type: image/png');
    }

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
//proxy suport
curl_setopt($ch, CURLOPT_PROXYTYPE, 'HTTP');
curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
//https
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 100);

$output = curl_exec($ch);
curl_close($ch);
echo $output;
?>