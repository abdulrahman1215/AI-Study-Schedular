from sqlalchemy import (Column, Integer, String, ForeignKey, DateTime, Boolean )
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Task(Base):

    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    priority = Column(String, default="medium")
    completed = Column(Boolean, default=False)
    deadline = Column(DateTime)
    created_at = Column( DateTime, default=datetime.utcnow )
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")