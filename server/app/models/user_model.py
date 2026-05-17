from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key= True, index=True)
    name = Column (String, nullable=False)
    email = Column (String, unique=True, nullable=False)
    password = Column (String,  nullable=False)
    create_at = Column(DateTime, default=datetime.utcnow) 
    tasks = relationship("Task", back_populates="owner")