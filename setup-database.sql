-- Create database and user for ea-commerce project
CREATE DATABASE ecommerce_db;
CREATE USER aashish WITH PASSWORD '2411';
ALTER USER aashish WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO aashish;

-- Connect to the database
\c ecommerce_db

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO aashish;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO aashish;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO aashish;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO aashish;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO aashish;