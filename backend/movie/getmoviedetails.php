<?php

require "../include/headers.php";
require "../include/functions.php";

/**
 * Fetches movie's information such as title, runtime, genres, actors
 */
$db = getConnection();
$id = filter_var($_GET['id'], FILTER_SANITIZE_STRING);
$region = filter_var($_GET['region'], FILTER_SANITIZE_STRING);

$basicInfoSql = "SELECT tgenres.title_id, titles.primary_title, aliases.title AS region_title, titles.start_year, titles.end_year, titles.runtime_minutes
                FROM `title_genres` AS tgenres
                INNER JOIN titles ON titles.title_id = tgenres.title_id
                INNER JOIN aliases ON aliases.title_id = tgenres.title_id
                WHERE tgenres.title_id=? AND aliases.region=?
                GROUP BY tgenres.title_id;";

$genresSql = "SELECT DISTINCT tgenres.genre FROM `title_genres` AS tgenres
            INNER JOIN aliases ON aliases.title_id = tgenres.title_id
            WHERE tgenres.title_id=? AND aliases.region=?
            GROUP BY tgenres.genre;";

$actorsSql = "SELECT hr.name_id, names.name_ AS name, hr.role_ AS role, worked.profession, names.birth_year, names.death_year FROM had_role hr
            INNER JOIN names_ AS names ON names.name_id=hr.name_id
            INNER JOIN name_worked_as worked ON worked.name_id=hr.name_id
            WHERE hr.title_id=?
            GROUP BY hr.name_id, hr.role_;";

$basicInfo = getQueryResult($db, $basicInfoSql, PDO::FETCH_ASSOC, [$id, $region]);
$genres = getQueryResult($db, $genresSql, PDO::FETCH_COLUMN, [$id, $region]);
$actors = getQueryResult($db, $actorsSql, PDO::FETCH_ASSOC, [$id]);

$response = [
    "basic" => $basicInfo,
    "genres" => $genres,
    "actors" => $actors
];
echo json_encode($response);
