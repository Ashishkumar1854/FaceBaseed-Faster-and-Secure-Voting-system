# User images ka face detection + encoding karna aur save karna


# encode_known_faces.py
import os
import cv2
import face_recognition
import pickle

def encode_known_faces(images_folder='Resources/Modules', encoding_file='encodings.pkl'):
    known_encodings = []
    known_names = []

    if not os.path.exists(images_folder):
        print(f"[ERROR] Images folder {images_folder} not found!")
        return

    # Traverse all files in the images folder
    for user_folder in os.listdir(images_folder):
        user_path = os.path.join(images_folder, user_folder)
        if os.path.isdir(user_path):
            for image_name in os.listdir(user_path):
                image_path = os.path.join(user_path, image_name)
                print(f"[INFO] Processing {image_path}")
                image = cv2.imread(image_path)

                if image is None:
                    print(f"[WARNING] Could not load image {image_path}. Skipping...")
                    continue

                rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                boxes = face_recognition.face_locations(rgb_image, model='cnn')
                encodings = face_recognition.face_encodings(rgb_image, boxes)

                for encoding in encodings:
                    known_encodings.append(encoding)
                    known_names.append(user_folder)

    # Save the encodings
    data = {"encodings": known_encodings, "names": known_names}
    try:
        with open(encoding_file, "wb") as f:
            pickle.dump(data, f)
        print(f"[INFO] Encodings completed and saved to {encoding_file}")
    except Exception as e:
        print(f"[ERROR] Failed to save encodings: {e}")

if __name__ == "__main__":
    encode_known_faces()
