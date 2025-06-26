
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import face_recognition

app = Flask(__name__)
CORS(app)

# Uploads folder path
UPLOAD_FOLDER = "../backend/uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# MongoDB connection
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client.myDatabase
users_collection = db.voterimages  
votes_collection = db.votes        


# Serve Uploaded Images

@app.route('/uploads/<filename>')
def serve_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# Upload API (only file)

@app.route('/api/upload', methods=['POST'])
def upload_only():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"}), 400

    filename = secure_filename(file.filename)
    uploaded_image_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(uploaded_image_path)

    return jsonify({"status": "success", "message": "File uploaded successfully"}), 200


# Upload & Verify Face API

@app.route('/api/verify', methods=['POST'])
def upload_and_verify_user():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"}), 400

    filename = secure_filename(file.filename)
    uploaded_image_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(uploaded_image_path)

    try:
        uploaded_image = face_recognition.load_image_file(uploaded_image_path)
        uploaded_encoding_list = face_recognition.face_encodings(uploaded_image)

        if not uploaded_encoding_list:
            return jsonify({"status": "error", "message": "No face found in uploaded image"}), 400

        uploaded_encoding = uploaded_encoding_list[0]

        for user in users_collection.find():
            db_img_name = user.get("imagePath")
            if not db_img_name:
                continue

            db_image_path = os.path.join(UPLOAD_FOLDER, db_img_name)
            if not os.path.exists(db_image_path):
                continue

            db_image = face_recognition.load_image_file(db_image_path)
            db_encoding_list = face_recognition.face_encodings(db_image)

            if not db_encoding_list:
                continue

            db_encoding = db_encoding_list[0]
            is_match = face_recognition.compare_faces([db_encoding], uploaded_encoding, tolerance=0.5)[0]

            if is_match:
                user_data = {
                    "name": user.get("name"),
                    "email": user.get("email", "Not Available"),
                    "address": user.get("address", "Not Available"),
                    "voter_id": user.get("voter_id", "Not Available"),
                    "imagePath": user.get("imagePath", "")
                }
                return jsonify({
                    "status": "success",
                    "message": "User verified",
                    "user_data": user_data
                }), 200

        return jsonify({"status": "error", "message": "User not valid"}), 404

    except Exception as e:
        return jsonify({"status": "error", "message": f"Server error: {str(e)}"}), 500


# Submit Vote API

@app.route('/api/submit-vote', methods=['POST'])
def submit_vote():
    data = request.get_json()
    voter_id = data.get("voter_id")                
    selected_candidate = data.get("candidate")    

    if not voter_id or not selected_candidate:
        return jsonify({"status": "error", "message": "Incomplete vote data"}), 400

    existing_vote = votes_collection.find_one({"voter_id": voter_id})
    if existing_vote:
        return jsonify({"status": "error", "message": "Vote already cast"}), 409

    votes_collection.insert_one({
        "voter_id": voter_id,
        "candidate": selected_candidate
    })

    return jsonify({"status": "success", "message": "Vote submitted successfully!"}), 200



# Run Flask App

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
