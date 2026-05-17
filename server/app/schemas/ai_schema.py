from pydantic import BaseModel
from typing import List

class StudyPlanRequest(BaseModel):
    subjects: List[str]
    study_hours_per_day: int
    weak_topics: List[str]
    exam_date: str