<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Fetches movie's `primary_title` field edit history
 */
try {
    $db = getConnection();
    responseAsJson($db, "SELECT id, title_id, old_title, new_title, update_time FROM GetEditHistory", PDO::FETCH_ASSOC, []);
} catch (Exception $e) {
    responseError($e);
}

