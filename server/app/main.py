from fastapi import FastAPI

from app.db.database import engine, Base
from app.models.user_model import User

from app.api.auth_route import router as auth_router
from app.api.user_route import router as user_router
from app.api.task_route import router as task_router
from app.api.ai_route import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "AI Study Schedular API",
    version ="1.0.0"
)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(task_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return{
        "message":"Backend running successfully"
    }