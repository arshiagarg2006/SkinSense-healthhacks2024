from flask import Flask, request, jsonify
import os
import requests
from groq import Groq
import json

from dotenv import load_dotenv
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)
MODEL_NAME = "llama3-8b-8192"  # Adjust model name as needed

# Set your Serper API key
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
SERPER_URL = "https://google.serper.dev/search"

app = Flask(__name__)

# Define labels as a global variable
labels = [
    "Nail Fungus",
    "Exanthems and Drug Eruptions",
    "Atopic Dermatitis",
    "Seborrheic Keratoses and other Benign Tumors",
    "Vascular Tumors",
    "Melanoma Skin Cancer Nevi and Moles",
    "Urticaria Hives",
    "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions",
    "Warts Molluscum and other Viral Infections",
    "Acne and Rosacea",
    "Psoriasis pictures Lichen Planus and related diseases",
    "Light Diseases and Disorders of Pigmentation",
    "Cellulitis Impetigo and other Bacterial Infections",
    "Eczema",
    "Scabies Lyme Disease and other Infestations and Bites",
    "Hair Loss Alopecia and other Hair Diseases",
    "Poison Ivy and other Contact Dermatitis",
    "Vasculitis",
    "Lupus and other Connective Tissue diseases",
    "Systemic Disease",
]

# Helper functions

def create_prompt(disease, factors):
    preprompt = (
        f'You are a dermatologist. You suspect that the patient has {disease}. '
        f'The patient also experiences these factors: {factors}. '
        f'Please describe the symptoms and signs of the disease, and suggest the appropriate treatment.'
    )

    text_data = ''
    for file in os.listdir('text_data/'):
        if disease in file:
            with open(os.path.join('text_data', file), 'r') as f:
                text_data = f.read()
                break

    prompt = preprompt + '\nAdditional information about this disease:\n' + text_data
    return prompt

def call_groq_model(prompt):
    chat = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model=MODEL_NAME,
    )

    return chat.choices[0].message.content

def create_summary(disease, factors):
    prompt = create_prompt(disease, factors)
    answer = call_groq_model(prompt)
    return answer

# Define the routes
# don't use this
@app.route('/create_prompt', methods=['POST'])
def handle_create_prompt():
    data = request.json
    disease = data.get('disease')
    factors = data.get('factors')
    if not disease or not factors:
        return jsonify({'error': 'Both disease and factors are required.'}), 400
    prompt = create_prompt(disease, factors)
    return jsonify({'prompt': prompt})

@app.route('/chat', methods=['POST'])
def handle_chat():
    data = request.json
    disease = data.get('disease')
    factors = data.get('factors')
    history = data.get('history')
    chat_text = data.get('chat')
    if not all([disease, factors, history, chat_text]):
        return jsonify({'error': 'All fields (disease, factors, history, chat) are required.'}), 400
    prompt = history + f"\nRemember you are a dermatologist. Suspected disease: {disease}. Factors: {factors}.\n<USER>{chat_text}</USER>"
    response = call_groq_model(prompt)
    return jsonify({'response': response})

@app.route('/create_summary', methods=['POST'])
def handle_create_summary():
    data = request.json
    disease = data.get('disease')
    factors = data.get('factors')
    if not disease or not factors:
        return jsonify({'error': 'Both disease and factors are required.'}), 400
    summary = create_summary(disease, factors)
    return jsonify({'summary': summary})

@app.route('/search_resources', methods=['POST'])
def handle_search_resources():
    data = request.json
    disease = data.get('disease')
    if not disease:
        return jsonify({'error': 'Disease is required.'}), 400
    
    payload = json.dumps({
        "q": f"{disease} treatment resources",
    })
    
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", SERPER_URL, headers=headers, data=payload)
    return response.text

if __name__ == '__main__':
    app.run(debug=True)
