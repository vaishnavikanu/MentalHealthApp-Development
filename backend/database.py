from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:5916vaish@localhost/mental_health_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)