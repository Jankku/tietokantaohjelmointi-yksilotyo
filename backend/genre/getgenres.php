<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Finds all unique genres from the database
 */
$db = getConnection();
responseAsJson($db, "CALL GetGenres()", PDO::FETCH_COLUMN);
