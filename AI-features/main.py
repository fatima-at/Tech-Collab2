try:
    import random
    import uvicorn
    import logging

    from utils.utils import *
    from utils.prompts import *
    from utils.GeneratorModel import *

    from fastapi import FastAPI, File, Form
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware
except Exception as e:
    logging.error("Error loading modules in main.py: ", str(e))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load the vector db
GeneratorModel_1 = GeneratorModel()

# tested successfully
@app.post("/recommend_project_1")
async def recommend_project_1(student_ID: int = Form(),
                            preference: str = Form()):
    """
    This API recommends a project based on CV and preferences list; using Semantic search on between student's profile and projects Database
    Input:  - student_ID integer
            # - Resume PDF base64 encoded
            - List of fields preferences
    Output: JSON string
    """
    try:  
        # assert isinstance(preference, str) , "Preference must be a string"
        resume_json = get_resume_by_id(GeneratorModel_1.students_collection, student_ID)
        # pdf_path = save_b64_as_pdf(pdf_b64)
        # resume_text = extract_text_from_pdf(pdf_path)
        resume_dict = json.loads(resume_json)
        resume_text = resume_dict['skills']
        student_text = str(resume_text) + "\n" + preference
        projects_IDs, projects_text = query_projects_DB(student_text, 10, GeneratorModel_1.projects_collection)
        # print(projects_text[0])
        # print(type(projects_text[0]))
        recommended_projects = []
        for project in projects_text[0]:
            project = json.loads(project)
            # print(project['title'])
            recommended_projects.append(project)
        return JSONResponse(content=recommended_projects, status_code=200)

    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# tested successfully
@app.post("/recommend_project_2")
async def recommend_project_2(student_ID: int = Form()):
    """
    This API recommends a project based on CV and preferences list; using RAG on our projects Database, given student ID or resume
    Input:  - Resume PDF base64 encoded
            - List of fields preferences
    Output: JSON string
    """
    try:
        resume_json = get_resume_by_id(GeneratorModel_1.students_collection, student_ID)
        recommended_project = GeneratorModel_1.match_S2P_RAG(resume_json)
        recommended_project = clean_json_string1(recommended_project)
        # If clean_json_string1 returns a string, convert it to a dictionary
        if isinstance(recommended_project, str):
            recommended_project = json.loads(recommended_project)
    
        return JSONResponse(content=recommended_project, status_code=200)

    except Exception as e:
        logging.error('In recommend_project_2 in main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# problem with parsing json response of resumes [skipped succefully for now]
# tested successfully
@app.post("/Match_S2S")
async def Match_S2S(student_ID):
    """
    This API recommends a project based on CV and preferences list; using RAG on our projects Database, given student ID or resume
    Input:  
        - student ID 
    Output: JSON string:
        - list of string of student IDs
    """
    try:
        # assert isinstance(student_ID, str) , "Preference must be a string"
        # assert isinstance(str(student_ID), int) , "Student ID must be an integer"

        students_IDs = []
        resume_text = get_resume_by_id(GeneratorModel_1.students_collection, str(student_ID))
        # print(resume_text)
        resume_text = json.loads(resume_text)
        resume_skills = resume_text['skills']
        resume_skills_summary = resume_skills + [resume_text['summary']]
        students_IDs = GeneratorModel_1.match_S2S(resume_skills, number_similar=30)
        for i in ['27','37','38', '46', '63', '69', '73', '82']:
            if i in students_IDs:
                students_IDs.remove(i)
        # print(students_IDs)
        # students_IDs = GeneratorModel_1.match_S2S(resume_skills_summary)
        # students_IDs = GeneratorModel_1.match_S2S(resume_text)
        similar_skills = []
        for ID in students_IDs:
            resume_text = get_resume_by_id(GeneratorModel_1.students_collection, str(ID))
            resume_text = json.loads(resume_text)
            similar_skills.append(resume_text['skills'])
        
        # print('Resume skills: ')
        # print(resume_skills)
        # print("Similar skills: ")
        # print(similar_skills)
        similar_10_IDs = random.sample(students_IDs, 10)
        return JSONResponse(content=similar_10_IDs, status_code=200)

    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# tested successfully
@app.post("/add_Student_To_DB")
async def Add_student_to_DB(pdf_b64: str = Form()):
    """
    This API recommends a project based on CV and preferences list; using RAG on our projects Database, given student ID or resume
    Input:  - Resume PDF base64 encoded
    Output: JSON string
            - student ID 
    """
    try:
        pdf_path = save_b64_as_pdf(pdf_b64)
        # resume_text = extract_text_from_pdf(pdf_path)
        resume_json, resume_text = preprocess_pdf(pdf_path)
        student_ID = GeneratorModel_1.add_student_to_DB(resume_json)
        return JSONResponse(content=student_ID, status_code=200)

    except Exception as e:
        print("Failed to add New Student")
        logging.error('In Add_student_to_DB function in main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# tested successfully
@app.post("/retrieve_projects")
async def retrieve_projects(n_results,
                            category):
    """
    This API retrieves list of projects based on 1 given category from the database.
    Input:  - category: AI, Android, Cloud, ...
            - number of results
    Output: JSON string
    """
    try:
        n_results = int(n_results)
        assert isinstance(category, str) , "category must be a string"
        assert isinstance(n_results, int) , "n_results must be a integer number"

        # Method 1
        projects_json = retrieve_projects_by_category(GeneratorModel_1.projects_collection, category, n_results)
        recommended_projects = []
        for project in projects_json:
            recommended_projects.append(json.loads(project))
        
        # Method 2
        # if category == "Android":
        #     AndroidProjects = load_projects(r"data\projects_text_json\android_projects.txt")
        #     projects = AndroidProjects[:n_results]
        
        # elif category == "Cloud":
        #     CloudProjects = load_projects(r"data\projects_text_json\cloud_projects.txt")
        #     projects = CloudProjects[:n_results]
        
        # elif category == "AI":
        #     ArtificialIntelligenceProjects = load_projects(r"data\projects_text_json\ai_projects.txt")
        #     projects = ArtificialIntelligenceProjects[:n_results]
        
        # elif category == "SecurityEncryption":
        #     SecurityEncryptionProjects = load_projects(r"data\projects_text_json\SecurityEncryption_projects.txt")
        #     projects = SecurityEncryptionProjects[:n_results]
        
        # elif category == "raspberrypi":
        #     RaspberryPiProjects = load_projects(r"data\projects_text_json\raspberrypi_projects.txt")
        #     projects = RaspberryPiProjects[:n_results]
        
        # elif category == "ML":
        #     MachineLearningProjects = load_projects(r"data\projects_text_json\ml_projects.txt")
        #     projects = MachineLearningProjects[:n_results]
        
        # elif category == "IoT":
        #     IoTProjects = load_projects(r"data\projects_text_json\clouiot_projects.txt")
        #     projects = IoTProjects[:n_results]
        
        # elif category == "GPS_GSM":
        #     GPS_GSM_projects = load_projects(r"data\projects_text_json\GPS_GSM_projects.txt")
        #     projects = GPS_GSM_projects[:n_results]
        
        # elif category == "ImageProcessing":
        #     imageProcessingProjects = load_projects(r"data\projects_text_json\ImageProcessing_projects.txt")
        #     projects = imageProcessingProjects[:n_results]

        # projects_json = json.dumps(projects)
        return JSONResponse(content=recommended_projects, status_code=200)

    except Exception as e:
        logging.error('In retrieve_projects function in main.py: %s', str(e))
        return JSONResponse(content={'Error': str(e)}, status_code=500)
                             
@app.post("/generate_project_1")
async def generate_project_1(preference: str = Form()):
    """
    This API takes a list of preferences from the user and generates a project.
    Input: JSON string of preferences
    Output: JSON string
    """

    try:
        assert isinstance(preference, str) , "Preference must be a JSON string"
        
        generated_project = recommend_project(preference, approach=1)
        # print(generated_project)
        generated_project = clean_json_string(generated_project)
        print()
        # print('after cleaning: ')
        # print(generated_project)
        return JSONResponse(content=generated_project, status_code=200)
    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# tested successfully
@app.post("/generate_project_2")
async def generate_project_2(student_ID: int = Form(),
                        preference: str = Form()):
    """
    This API takes a list of preferences from the user and generates a project.
    Input:  - Resume PDF base64 encoded
            - List of fields preferences
    Output: JSON string
    """
    try:
        assert isinstance(preference, str) , "Preference must be a string"
        
        # pdf_path = save_b64_as_pdf(pdf_b64)
        resume_json = get_resume_by_id(GeneratorModel_1.students_collection, student_ID)
        # resume_text = extract_text_from_pdf(pdf_path)
        generated_project = recommend_project(preference, approach=2, resume_text=resume_json)
        generated_project = clean_json_string(generated_project)
        return JSONResponse(content=generated_project, status_code=200)
        # return generated_project

    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)


if __name__ == "__main__":
    # uvicorn.run(app, host='0.0.0.0', port=int(os.getenv("PORT")))
    uvicorn.run(app, host='0.0.0.0', port=80)