# New captured image ko existing database ke encodings ke sath match karna (verification ke liye)


import face_recognition
import pickle
import numpy as np

def verify_face(image_bytes, encoding_file='encodings.pkl', tolerance=0.5):
    # Load known encodings
    with open(encoding_file, "rb") as f:
        data = pickle.load(f)

    # Load incoming image
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = face_recognition.load_image_file(np_img)

    boxes = face_recognition.face_locations(img, model='cnn')
    encodings = face_recognition.face_encodings(img, boxes)

    if len(encodings) == 0:
        return None  # No face detected

    # Assume first face found
    input_encoding = encodings[0]

    matches = face_recognition.compare_faces(data["encodings"], input_encoding, tolerance)
    face_distances = face_recognition.face_distance(data["encodings"], input_encoding)

    best_match_index = np.argmin(face_distances)

    if matches[best_match_index]:
        return data["names"][best_match_index]  # Return matched user name/ID
    else:
        return None
