import dlib
import cv2
import os

# Load the pre-trained face detector
detector = dlib.get_frontal_face_detector()

# Load an image
img = cv2.imread('test.jpg')  # make sure this image exists
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect faces
faces = detector(gray)

# Create a folder to save cropped faces
if not os.path.exists('detected_faces'):
    os.makedirs('detected_faces')

# Draw rectangles and save cropped faces
for idx, face in enumerate(faces):
    x1, y1, x2, y2 = face.left(), face.top(), face.right(), face.bottom()

    # Draw rectangle
    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # Crop face
    cropped_face = img[y1:y2, x1:x2]

    # Save cropped face
    face_filename = f"detected_faces/face_{idx+1}.jpg"
    cv2.imwrite(face_filename, cropped_face)

# Show the image with rectangles
cv2.imshow("Detected Faces", img)
cv2.waitKey(0)
cv2.destroyAllWindows()
