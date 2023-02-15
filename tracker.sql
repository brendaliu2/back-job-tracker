\echo 'Delete and recreate tracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE tracker;
CREATE DATABASE tracker;
\connect tracker

\i tracker-schema.sql
\i tracker-seed.sql

\echo 'Delete and recreate tracker_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE tracker_test;
CREATE DATABASE tracker_test;
\connect tracker_test

\i tracker-schema.sql
