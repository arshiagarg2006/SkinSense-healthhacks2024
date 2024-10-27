import ultralytics
from ultralytics import YOLO
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2  # For image processing
import io  # For byte I/O
from PIL import Image  # For handling images

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

monkey_model = YOLO("monkey_best.pt")
skin_model = YOLO("skin_best.pt")


@app.get("/")
def hello_world():
    return {"status": "online"}


@app.post("/predict")
def predict():
    # get image
    file = request.files["image"]

    # If no file is selected
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # need to convert file into image
    img = cv2.imread(file)
    frame = cv2.imencode(".jpg", cv2.UMat(img))[1].tobytes()
    image = Image.open(io.BytesIO(frame))

    print(type(image))
    prelim_results = monkey_model([image])
    prelim_class = prelim_results[0].probs.top1
    # prelim_class interpretation {0: 'Healthy', 1: 'Monkeypox', 2: 'Other'}

    final_class = -1  # initializing variable for return

    if prelim_class == 0:
        final_class = -1  # change to match skin_classes file
    elif prelim_class == 1:
        final_class = 20  # change to match skin_classes file
    else:
        skin_results = skin_model([image])
        final_class = skin_results[0].probs.top1

    return jsonify({"top1": final_class}), 200
