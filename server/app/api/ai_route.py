from fastapi import (APIRouter, Depends)
from app.schemas.ai_schema import ( StudyPlanRequest)
from app.services.ai_service import ( generate_study_plan)
from app.auth.auth_bearer import (get_current_user)
from app.models.user_model import User



router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/generate-study-plan")
def generate_ai_plan(
    request: StudyPlanRequest,
    current_user: User = Depends(get_current_user)
):
    study_plan = generate_study_plan(request)
    return {
        "user": current_user.email,
        "study_plan": study_plan
    }