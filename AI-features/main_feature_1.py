try:
    import re
    import os
    import base64
    import orjson
    import logging
    import uvicorn

    from utils.prompts import *
    from typing import Annotated
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware
    from langchain_community.document_loaders import PyPDFLoader
    from fastapi import FastAPI, File, UploadFile, Form
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



def extract_text_from_pdf(uploaded_file):
    try:
        loader = PyPDFLoader(uploaded_file)
        pages = loader.load_and_split()
        page_0_text = pages[0].page_content
        return page_0_text
    except Exception as e:
        print("Error In extract_text_from_pdf function: ", str(e))
        return None

def recommend_project(uploaded_file, preference):
    try:
        resume_text = extract_text_from_pdf(uploaded_file)
        if preference=="":
            LLM_response = LLM_prompt_3(resume_text)
        else:
            LLM_response = LLM_prompt_4(resume_text, preference)
        # return orjson.dumps(LLM_response).decode('utf-8')  # Convert to JSON string
        return LLM_response  # Convert to JSON string
    except Exception as e:
        print("Error In recommend function: ", str(e))
        return None
    
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

def clean_json_string(json_string):
    # Remove leading and trailing whitespace
    json_string = json_string.strip()
    json_string = json_string.replace('`', '')
    json_string = json_string.replace('json', '')
    json_string = json_string.replace('JSON', '')
    # Replace problematic characters
    json_string = json_string.replace("\\n", "\n").replace("\\", "")
    
    # Fix any misplaced commas at the end of lists or objects
    json_string = re.sub(r",\s*(\]|\})", r"\1", json_string)
    json_string = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', json_string)

    # Fix any misplaced commas at the end of lists or objects
    json_string = re.sub(r",\s*(\]|\})", r"\1", json_string)

    # Add missing commas between items
    json_string = re.sub(r'("\w+":\s*{[^{}]*}\s*){2,}', lambda m: re.sub(r'}\s*{', '}, {', m.group(0)), json_string)
    
    
    return json_string

@app.post("/generate_project")
async def generate_project(pdf_b64: str = Form(),
                        preference: str = Form()):
    try:
        pdf_path = save_b64_as_pdf(pdf_b64)
        
        assert isinstance(preference, str) , "Preference must be a string"
        
        generated_project = recommend_project(pdf_path, preference)
        generated_project = clean_json_string(generated_project)
        return JSONResponse(content=generated_project, status_code=200)
        # return generated_project

    except Exception as e:
        logging.error('In main.py: %s', str(e))
        return JSONResponse(content={'error': str(e)}, status_code=500)


if __name__ == "__main__":
    # uvicorn.run(app, host='0.0.0.0', port=int(os.getenv("PORT")))
    uvicorn.run(app, host='0.0.0.0', port=80)