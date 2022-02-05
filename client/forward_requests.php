<?php
    $url_path = "http://covid-19tweetannotation.cs.colostate.edu/{$_GET["path"]}";
    $url_path = str_replace('"',"",$url_path);


    $METHOD = $_SERVER['REQUEST_METHOD'];
    $BODY = file_get_contents('php://input');
    if(array_key_exists("file",$_FILES)){
        //echo file_get_contents($_FILES['file']['tmp_name']);
        $BODY = file_get_contents($_FILES['file']['tmp_name']);
    }
    //print_r($BODY);

    $HEADERS = getallheaders();


    $ch=curl_init();

    $PARSED_HEADERS = [];
    foreach($HEADERS as $key=>$val){
        //echo $key . ': ' . $val . '<br>';
        array_push($PARSED_HEADERS,"{$key}: {$val}");
      }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $PARSED_HEADERS);


    //Set URL
    curl_setopt($ch,CURLOPT_URL,$url_path);

    //echo $_SERVER["CONTENT_TYPE"];
    if($METHOD != "GET"){
        curl_setopt($ch, CURLOPT_POST, TRUE);
        //echo count($_POST);
        if(count($_POST) != 0){
            curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
        }
        else{
            curl_setopt($ch, CURLOPT_POSTFIELDS, $BODY);
        }
    }

    //Set Cookies
    $COOKIES = "";
    foreach ($_COOKIE as $key=>$val){
        //echo $key.' is '.$val."<br>\n";
        $COOKIES .= "{$key}={$val};" ;
    }
    curl_setopt($ch, CURLOPT_COOKIE, $COOKIES);


    //Set GET|POST|PUT|DELETE
    curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, $METHOD );

    //Disable Printing Body after curl finished
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

    //Result will contain entire http request
    curl_setopt($ch, CURLOPT_HEADER, 1);

    // TRUE to exclude the body from the output.
    curl_setopt($ch, CURLOPT_NOBODY, 0);


    $result = curl_exec($ch);

    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    //Returns all headers in one string
    $header = substr($result, 0, $header_size);
    //SPlit into array for each header and set it.
    $headers = explode("\n",$header);
    foreach($headers as &$h){
        header($h);
    }
    


    $body = substr($result, $header_size);
    echo $body;
    curl_close($ch);

?>