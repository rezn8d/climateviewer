<?php
    require(__DIR__ . "/config.php");

    // get and decode the request (POST) string from scripts.js/insert_event to retrieve the json object:
    if (isset($_POST['event'])) {
        $eventObj = json_decode($_POST['event']);    
    }
    else {
        http_response_code(400);
        exit;
    }
    // if you use JSON.stringify(EventObject) in scripts.js:
    // $eventObj = json_decode(file_get_contents('php://input'));
    // echo $eventObj;
    
    // ensure proper usage
    if (empty($eventObject))
    {
        http_response_code(400);
        exit;
    }
    else {
        // TODO: More error checking!
        // Insert object to the event db:
        $result = query(
                "INSERT 
                    INTO events 
                    (id, type, time, longitude, latitude, depth, scalar, place, AnomalyScore, AnomalyMean_Windowsize, AnomalyLikelihood, logLikelihood, prediction, iterCount) 
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                    $eventObj[id],
                    $eventObj[eventType],
                    $eventObj[time],
                    $eventObj[lng],
                    $eventObj[lat],
                    $eventObj[depth],
                    $eventObj[scalar],
                    $eventObj[place],
                    $eventObj[AnomalyScore],
                    $eventObj[Anomaly_mean],
                    $eventObj[AnomalyLikelihood],
                    $eventObj[logLikelihood],
                    $eventObj[prediction],
                    $eventObj[prediction],
                    $eventObj[iterCount]          
        );
            
        // verify
        if ($result === false)
        {
            print("Error inserting event " . json_encode($eventObj, JSON_PRETTY_PRINT) . "\n");
        }
        else
        {
            // output event as JSON (pretty-printed for debugging convenience)
            header("Content-type: application/json");
            print(json_encode($eventObj, JSON_PRETTY_PRINT));
            // echo "OK";
        }
    }
?>
