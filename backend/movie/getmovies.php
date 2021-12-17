<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Fetches all movies from database
 */
$db = getConnection();
$region = filter_var($_GET['region'], FILTER_SANITIZE_STRING);
$genre = filter_var($_GET['genre'], FILTER_SANITIZE_STRING);
$genre = $genre . "\r"; // Genre fields in db have "\r" at the end...
responseAsJson($db, "CALL GetMoviesByGenreAndRegion(?, ?)", PDO::FETCH_ASSOC, [$genre, $region]);

