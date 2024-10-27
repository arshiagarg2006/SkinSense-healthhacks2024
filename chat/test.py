import requests
import json

# Define the base URL of the Flask app
BASE_URL = "http://127.0.0.1:5000"

# DONT USE THIS
def test_create_prompt():
    url = f"{BASE_URL}/create_prompt"
    data = {
        "disease": "Acne and Rosacea",
        "factors": "Stress, Hormonal Changes"
    }
    response = requests.post(url, json=data)
    print("Test /create_prompt:")
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    print("\n")

def test_chat():
    url = f"{BASE_URL}/chat"
    data = {
        "disease": "Psoriasis",
        "factors": "Weather, Dry Skin, Patient has experienced symptoms for several months.",
        "history": "<BOT>You likely have psoriasis. Psoriasis is a chronic skin condition that causes skin cells to multiply faster than normal. This can cause red, scaly patches on the skin. Psoriasis is not contagious, but it can be triggered by stress, infections, and other factors. It is important to see a dermatologist for a proper diagnosis and treatment plan. How can I help you today?</BOT>",
        "chat": "What is the best treatment for my condition?"
    }
    response = requests.post(url, json=data)
    print("Test /chat:")
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    print("\n")

def test_create_summary():
    url = f"{BASE_URL}/create_summary"
    data = {
        "disease": "mock_image_data",
        "factors": "Sun exposure, Smoking"
    }
    response = requests.post(url, json=data)
    print("Test /create_summary:")
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    print("\n")

def test_search_resources():
    url = f"{BASE_URL}/search_resources"
    data = {
        "disease": "Eczema"
    }
    response = requests.post(url, json=data)
    print("Test /search_resources:")
    print("Status Code:", response.status_code)
    print("Response:", response._content)
    print("\n")

# Run all tests
if __name__ == "__main__":
    print("Running tests for Flask app...\n")
    test_create_prompt()
    test_chat()
    test_create_summary()
    test_search_resources()
