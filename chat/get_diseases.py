from huggingface_hub import InferenceClient
from googlesearch import search
import textwrap
from bs4 import BeautifulSoup
import requests

# Hugging Face API key (replace 'YOUR_API_KEY' with your actual Hugging Face API key)
HUGGING_FACE_API_KEY = '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'
HEADERS = {"Authorization": f"Bearer {HUGGING_FACE_API_KEY}"}

API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B"
headers = {"Authorization": "Bearer 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"}


with open('diseases.txt') as f:
    diseases = f.read().splitlines()
    print(diseases)

# Function to search Google for the best nih URL
def find_nih_url(disease_name):
    query = f"{disease_name} overview site:mayoclinic.org"
    for result in search(query, num_results=10):  # Fetch only the top result
        if "mayoclinic.org" in result:
            return result
    return None
    
def get_nih_content(url):
    text = requests.get(url).text
    return text

if __name__ == "__main__":
    # Loop through diseases and process each
    for disease in diseases:
        print(f"\nProcessing disease: {disease}")
        
        # Get the best nih URL using Google
        url = find_nih_url(disease)
        if url:
            print(f"Found URL: {url}")
            
            # Get nih content
            content = get_nih_content(url)
            with open(f"data/{disease}.txt", "w", encoding='UTF-8') as f:
                f.write(content)
            # read the text in beautiful soup
            soup = BeautifulSoup(content, "html.parser")
            with open(f"data/{disease}_loaded.txt", "w", encoding='UTF-8') as f:
                f.write(soup.text)
        else:
            print(f"No relevant nih page found for {disease}.")