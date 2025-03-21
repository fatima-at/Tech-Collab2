import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown

# google_api_key = 'AIzaSyCxHZzWgfpgT91e-ReTrqioroVenes4Ato'
google_api_key = 'AIzaSyDRqbzZeq1PU_7zBMDFZ0RSjyaHGMVlpgc'
genai.configure(api_key= google_api_key)

model = genai.GenerativeModel('gemini-2.0-flash')

def get_completion(prompt, temp = 0.9):
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
        temperature=temp))
    return response.text

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

# response = get_completion('Hello, are you going to help?')
# # response = to_markdown(response)
# print(response)
