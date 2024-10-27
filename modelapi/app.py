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

# monkey_model = YOLO()
skin_model = YOLO("skin_best.pt")


@app.get("/")
def hello_world():
    return {"status": "online"}


@app.post("/predict")
def predict():
    file = request.files["image"]

    # If no file is selected
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # need to convert file into image
    img = cv2.imread(file)
    frame = cv2.imencode(".jpg", cv2.UMat(img))[1].tobytes()
    image = Image.open(io.BytesIO(frame))

    print(type(image))
    results = skin_model([image])
    predClass = results[0].probs.top1

    return jsonify({"top1": predClass}), 200

    # else:
    #     return jsonify({"error": "File type not allowed"}), 400


# read image file
