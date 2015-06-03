<?php

//$url = 'http://' . $_GET["url"];
$url = urldecode($_SERVER['QUERY_STRING']);


//http://stackoverflow.com/questions/11733876/how-to-get-content-ot-remote-html-page
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$output = curl_exec($curl);
curl_close($curl);
header("Access-Control-Allow-Origin: *");

echo $output;


?>

