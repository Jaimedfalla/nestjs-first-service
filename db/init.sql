SELECT 'CREATE DATABASE first_nest'
WHERE NOT EXISTS(SELECT 1 FROM pg_database WHERE datname='first_nest')