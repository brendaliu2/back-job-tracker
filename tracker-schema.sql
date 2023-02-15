-- CREATE TABLE users (
--   username VARCHAR(25) PRIMARY KEY,
--   password TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL
-- );

CREATE TABLE companies (
  handle VARCHAR(25) PRIMARY KEY,
  career_page TEXT NOT NULL,
  last_visited TIMESTAMP
  -- username VARCHAR(25)
  --   REFERENCES users ON DELETE CASCADE
);

-- CREATE TABLE jobs (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   company_handle VARCHAR(25) NOT NULL
--     REFERENCES companies ON DELETE CASCADE,
--   username VARCHAR(25)
--     REFERENCES users ON DELETE CASCADE
-- );
