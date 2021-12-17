-- TABLES

CREATE TABLE IF NOT EXISTS titles_edit_history
(
    `id`          INT AUTO_INCREMENT,
    `title_id`    VARCHAR(255),
    `old_title`   TEXT,
    `new_title`   TEXT,
    `update_time` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`id`)
);

-- VIEWS

CREATE VIEW IF NOT EXISTS GetEditHistory AS
SELECT id, title_id, old_title, new_title, update_time
FROM titles_edit_history;

-- PROCEDURES
DROP PROCEDURE IF EXISTS GetMoviesByGenreAndRegion;
DROP PROCEDURE IF EXISTS GetRegions;
DROP PROCEDURE IF EXISTS GetGenres;

CREATE PROCEDURE GetMoviesByGenreAndRegion(
    IN genreName VARCHAR(255),
    IN regionName VARCHAR(255)
)
BEGIN
    SELECT tgenres.title_id, aliases.title
    FROM `title_genres` AS tgenres
             INNER JOIN titles ON titles.title_id = tgenres.title_id
             INNER JOIN aliases ON aliases.title_id = tgenres.title_id
    WHERE tgenres.genre = genreName
      AND aliases.region = regionName;
END;

CREATE PROCEDURE GetRegions()
BEGIN
    SELECT DISTINCT region FROM aliases WHERE region IS NOT NULL;
END;

CREATE PROCEDURE GetGenres()
BEGIN
    SELECT DISTINCT genre FROM title_genres;
END;

-- INDEXES

ALTER TABLE aliases
    ADD INDEX `region_index` (`region`);

ALTER TABLE titles
    ADD INDEX titles_year_minute_index (`start_year`, `end_year`, `runtime_minutes`);

ALTER TABLE names_
    ADD INDEX name_years_index (`name_`, `birth_year`, `death_year`);

-- TRIGGERS

CREATE TRIGGER IF NOT EXISTS title_edit_trigger
    AFTER UPDATE
    ON titles
    FOR EACH ROW INSERT INTO titles_edit_history (`title_id`, `old_title`, `new_title`)
                 VALUES (OLD.title_id, OLD.primary_title, NEW.primary_title);
