import dlib
import numpy as np
import cv2

# Load dlib's pre-trained face detector
detector = dlib.get_frontal_face_detector()

def detect_faces(image_path):
    """
    Detect faces in an image using dlib.

    Args:
        image_path (str): Path to the input image.

    Returns:
        faces (list): List of bounding boxes for detected faces.
        image (ndarray): Original image loaded using OpenCV.
    """

    # Load image using OpenCV
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not load image at path: {image_path}")

    # Convert to grayscale for detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = detector(gray)

    return faces, image



if __name__ == "__main__":
    image_path = "test.jpg" 
    try:
        faces, image = detect_faces(image_path)
        print(f"{len(faces)} face(s) detected.")
    except Exception as e:
        print("Error:", e)
