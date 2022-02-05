<?php
    $url_path = "http://covid-19tweetannotation.cs.colostate.edu/{$_GET["path"]}";
    $url_path = str_replace('"',"",$url_path);


    $METHOD = $_SERVER['REQUEST_METHOD'];
    $BODY = file_get_contents('php://input');
    $HEADERS = getallheaders();

    //echo $url_path;

    $ch=curl_init();
    //Set URL
    curl_setopt($ch,CURLOPT_URL,$url_path);

    if($METHOD != "GET"){
        curl_setopt($ch, CURLOPT_POSTFIELDS,$BODY);
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