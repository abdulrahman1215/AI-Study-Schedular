from fastapi import FastAPI

from app.db.database import engine, Base
from app.models.user_model import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "AI Study Schedular API",
    version ="1.0.0"
)

@app.get("/")
def home():
    return{
        "message":"Backend running successfully"
    }