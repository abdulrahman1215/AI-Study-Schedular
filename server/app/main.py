from fastapi import FastAPI

from app.db.database import engine, Base
from app.models.user_model import User

from app.api.auth_route import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "AI Study Schedular API",
    version ="1.0.0"
)
app.include_router(auth_router)

@app.get("/")
def home():
    return{
        "message":"Backend running successfully"
    }