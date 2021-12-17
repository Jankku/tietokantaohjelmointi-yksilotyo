<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Finds all unique regions from database
 */
$db = getConnection();
responseAsJson($db, "CALL GetRegions()", PDO::FETCH_COLUMN);
