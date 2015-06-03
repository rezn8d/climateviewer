<?php
$url = $_POST["url"];
header("Access-Control-Allow-Origin: *");
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$output = curl_exec($curl);
curl_close($curl);
echo $output;
?>