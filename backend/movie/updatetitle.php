<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Updates `primary_title` field of a movie
 */
try {
    $db = getConnection();
    $title = filter_var($_GET['title'], FILTER_SANITIZE_STRING);
    $id = filter_var($_GET['id'], FILTER_SANITIZE_STRING);

    if (!$title) throw new Exception('Title can\'t be empty');
    if (!$id) throw new Exception('ID can\'t be empty');

    $sql = "UPDATE titles SET primary_title=? WHERE title_id=?";
    responseString($db, $sql, "Movie updated", "Error: movie wasn't updated", [$title, $id]);
} catch (Exception $e) {
    responseError($e);
}

