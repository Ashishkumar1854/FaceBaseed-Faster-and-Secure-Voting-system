import os
import cv2
import face_recognition
import pickle

def encode_known_faces(images_folder='Resources/Modules', encoding_file='encodings.pkl'):
    known_encodings = []
    known_names = []

    # Valid image file extensions (case-insensitive)
    valid_extensions = ('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')

    if not os.path.exists(images_folder):
        print(f"[ERROR] Images folder {images_folder} not found!")
        return

    # Traverse all files in the images folder
    print(f"[INFO] Listing folders in: {images_folder}")
    folders = sorted(os.listdir(images_folder))
    print(f"[DEBUG] Folders found: {folders}")

    for user_folder in folders:
        user_path = os.path.join(images_folder, user_folder)

        # Check if it's a valid directory and not a file
        if os.path.isdir(user_path):
            print(f"[INFO] Processing folder: {user_folder}")

            images = sorted(os.listdir(user_path))
            print(f"[DEBUG] Images found in {user_folder}: {images}")

            for image_name in images:
                # Skip hidden files (like .DS_Store) and non-image files
                if image_name.startswith('.'):
                    print(f"[WARNING] Skipping hidden file: {image_name}")
                    continue
                
                # Check for valid image file extension
                if not image_name.lower().endswith(valid_extensions):
                    print(f"[WARNING] Skipping non-image file: {image_name}")
                    continue

                image_path = os.path.join(user_path, image_name)
                print(f"[INFO] Processing image: {image_path}")
                
                try:
                    image = cv2.imread(image_path)
                    if image is None:
                        raise ValueError(f"Image could not be loaded: {image_path}")

                    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                    boxes = face_recognition.face_locations(rgb_image, model='cnn')

                    if not boxes:
                        print(f"[WARNING] No faces found in {image_path}. Skipping...")
                        continue

                    encodings = face_recognition.face_encodings(rgb_image, boxes)

                    if not encodings:
                        print(f"[WARNING] No encodings generated for {image_path}. Skipping...")
                        continue

                    for encoding in encodings:
                        known_encodings.append(encoding)
                        known_names.append(user_folder)

                except Exception as e:
                    print(f"[ERROR] An error occurred while processing {image_path}: {e}")
                    continue

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
