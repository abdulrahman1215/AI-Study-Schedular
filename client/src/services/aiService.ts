import API from "./api"

export const generateStudyPlan = async (
    data: any
) => {
    const response = await API.post("/ai/generate-study-plan", data)
    return response.data
}