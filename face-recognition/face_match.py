import cv2
import face_recognition
import pickle
import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

def load_encodings(encoding_file='encodings.pkl'):
    """Load the face encodings from the pickle file."""
    if not os.path.exists(encoding_file):
        print(f"[ERROR] Encoding file {encoding_file} not found!")
        return None
    with open(encoding_file, "rb") as f:
        data = pickle.load(f)
    print("[INFO] Encodings loaded successfully.")
    return data


def send_to_backend(name):
    """Send the matched name to the backend for verification."""
    url = "http://localhost:5001/api/users/verify"
    try:
        response = requests.post(url, json={"name": name}, headers={"Content-Type": "application/json"})
        print(f"[INFO] Response Status: {response.status_code}, Response Text: {response.text}")
        if response.status_code == 200:
            result = response.json()
            print(f"[INFO] Verification result: {result['message']}")
            return result
        else:
            return {"success": False, "message": "Backend verification failed."}
    except Exception as e:
        print(f"[ERROR] Backend connection error: {e}")
        return {"success": False, "message": "Backend connection error."}


def recognize_faces(encoding_data, image):
    """Recognize faces in an uploaded image."""
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_image, model='hog')
    face_encodings = face_recognition.face_encodings(rgb_image, face_locations)
    print(f"[INFO] Found {len(face_encodings)} face(s) in the image.")

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(encoding_data["encodings"], face_encoding)
        name = "Unknown"

        if True in matches:
            matched_indices = [i for (i, b) in enumerate(matches) if b]
            counts = {}

            for i in matched_indices:
                name = encoding_data["names"][i]
                counts[name] = counts.get(name, 0) + 1

            name = max(counts, key=counts.get)
            print(f"[INFO] Matched face: {name}")
            verification_result = send_to_backend(name)
            if verification_result["success"]:
                return {"status": "success", "message": "User verified", "user_data": verification_result["user_data"]}
            else:
                return {"status": "fail", "message": verification_result["message"]}
        else:
            print("[INFO] No match found.")
            return {"status": "fail", "message": "User not recognized"}
    return {"status": "fail", "message": "No faces detected in the image."}


@app.route('/api/upload', methods=['POST'])
def upload_image():
    """API to handle image upload and face recognition."""
    if 'file' not in request.files:
        return jsonify({"status": "fail", "message": "No file part in the request"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "fail", "message": "No file selected"})

    try:
        image_path = f"uploads/{file.filename}"
        file.save(image_path)
        print(f"[INFO] Image saved to {image_path}")

        image = cv2.imread(image_path)
        if image is None:
            return jsonify({"status": "fail", "message": "Invalid image format"})

        encodings = load_encodings()
        if not encodings:
            return jsonify({"status": "fail", "message": "Encodings not found"})

        result = recognize_faces(encodings, image)
        return jsonify(result)
        
    except Exception as e:
        print(f"[ERROR] Failed to process image: {e}")
        return jsonify({"status": "fail", "message": str(e)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
