CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO notes (message) VALUES ('Hello from a persisted volume!');
