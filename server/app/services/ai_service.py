from openai import OpenAI
from app.core.config import OPENAI_API_KEY

client = OpenAI(
    api_key=OPENAI_API_KEY
)

def generate_study_plan(data):
    prompt = f"""
    Create a personalized study plan.
    Subjects: {data.subjects}
    Study hours per day:
    {data.study_hours_per_day}
    Weak topics:
    {data.weak_topics}

    Exam date:
    {data.exam_date}
    Create:
    - daily schedule
    - revision plan
    - productivity suggestions
    - time management strategy
    """
    response = client.chat.completions.create(
        model="gpt-5.4-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content