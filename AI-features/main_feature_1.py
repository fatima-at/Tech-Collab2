try:
    import re
    import json
    import base64
    import logging
    import uvicorn

    from utils.prompts import *
    from fastapi import FastAPI, File, Form
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware
    from langchain_community.document_loaders import PyPDFLoader
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

def extract_text_from_pdf(pdf_path):
    try:
        loader = PyPDFLoader(pdf_path)
        pages = loader.load_and_split()
        page_0_text = pages[0].page_content
        return page_0_text
    except Exception as e:
        print("Error In extract_text_from_pdf function: ", str(e))
        return None

def recommend_project(preference, approach, resume_text=''):
    try:
        if approach == 2:
            if preference=="":
                LLM_response = LLM_prompt_3(resume_text)
            else:
                LLM_response = LLM_prompt_4(resume_text, preference)
        elif approach == 1:
            LLM_response = LLM_prompt_6(preference)
        return LLM_response  # Convert to JSON string
    except Exception as e:
        print("Error In recommend function: ", str(e))
        return None

def clean_json_string(json_string):
    try:
        # Remove leading and trailing whitespace
        json_string = json_string.strip()
        json_string = json_string.replace('`', '')
        json_string = json_string.replace('json', '')
        json_string = json_string.replace('JSON', '')
        json_string = json_string.replace('*', '')
        # Replace problematic characters
        json_string = json_string.replace("\\n", "\n").replace("\\", "")
        
        # Fix any misplaced commas at the end of lists or objects
        json_string = re.sub(r",\s*(\]|\})", r"\1", json_string)
        json_string = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', json_string)

        # Fix any misplaced commas at the end of lists or objects
        json_string = re.sub(r",\s*(\]|\})", r"\1", json_string)

        # Add missing commas between items
        json_string = re.sub(r'("\w+":\s*{[^{}]*}\s*){2,}', lambda m: re.sub(r'}\s*{', '}, {', m.group(0)), json_string)
        json_string = write_and_read_json(json_string)
        return json_string
    except Exception as e:
        print("Error in clean_json_string function in utils.py: " + str(e))

def save_b64_as_pdf(base64_pdf, output_filename='this_resume.pdf'):
    try:
        # Decode the base64 string
        pdf_data = base64.b64decode(base64_pdf)
        # Write the decoded data to a file
        with open(output_filename, 'wb') as file:
            file.write(pdf_data)
        print(f"PDF saved as {output_filename}")
        return output_filename
    except Exception as e:
        print("Error In save_b64_as_pdf function: ", str(e))
        return None

def write_and_read_json(json_string, file_name='temp.txt'):
    try:
        # Write the JSON string to a text file
        with open(file_name, 'w', encoding='utf-8') as file:
            print(json_string)
            file.write(json_string)
        
        # Read the JSON string back from the text file
        with open(file_name, 'r') as file:
            read_json_string = file.read()
        
        # Convert the JSON string back to a Python dictionary (optional)
        json_data = json.loads(read_json_string)
        
        return json_data
    except Exception as e:
        print("Error in write_read_json function in utils.py: " + str(e))

# tested
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
        # print('after cleaning: ')
        # print(generated_project)
        return JSONResponse(content=generated_project, status_code=200)
    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)

# tested
@app.post("/generate_project_2")
async def generate_project_2(pdf_b64: str = Form(),
                        preference: str = Form()):
    """
    This API takes a list of preferences from the user and generates a project.
    Input:  - Resume PDF base64 encoded
            - List of fields preferences
    Output: JSON string
    """
    try:
        assert isinstance(preference, str) , "Preference must be a string"
        
        pdf_path = save_b64_as_pdf(pdf_b64)
        resume_text = extract_text_from_pdf(pdf_path)
        generated_project = recommend_project(preference, approach=2, resume_text=resume_text)
        generated_project = clean_json_string(generated_project)
        return JSONResponse(content=generated_project, status_code=200)
        # return generated_project

    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)


if __name__ == "__main__":
    # uvicorn.run(app, host='0.0.0.0', port=int(os.getenv("PORT")))
    uvicorn.run(app, host='0.0.0.0', port=8001)

    