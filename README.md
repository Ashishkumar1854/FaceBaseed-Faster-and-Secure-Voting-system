# Efficient-Voting-System
Revolutionize elections with our AI-powered face recognition voting system—eliminating fraud, reducing wait times, and ensuring fast, secure, and tamper-proof voting. With real-time authentication &amp; blockchain-backed transparency, we’re making voting smarter, safer, and accessible for all! 🚀🔐

# 🗳️ Face-Based Faster & Secure Voting System

## 🚀 About
A secure & faster **face-recognition powered voting platform** built with **MERN stack + Flask (OpenCV)**.  
This project ensures **unique voter verification**, prevents duplicate votes, and provides an easy-to-use ballot dashboard.

---

## 📂 Project Structure
├── frontend # React client (UI for voters & admins)
├── backend # Node.js + Express API (business logic, DB connection)
├── face-recognition # Python Flask API (OpenCV face recognition service)


---

## 🎯 Features
- Face recognition login/verification (OpenCV + Flask API)  
- Voter registration with photo & details  
- Ballot dashboard (React + MongoDB)  
- Prevents duplicate votes with AI verification  
- Audit logs & secure storage  
- Deployment-ready with Docker  

---

## 🛠️ Tech Stack
`MongoDB` `Express.js` `React.js` `Node.js`  
`Python` `Flask` `OpenCV`  
`TailwindCSS` `JWT` `Docker`

---

## ⚙️ Setup & Run

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Ashishkumar1854/FaceVoting-System.git
cd FaceVoting-System

cd face-recognition
python -m venv myenv310
source myenv310/bin/activate   # Mac/Linux
myenv310\Scripts\activate      # Windows

pip install -r requirements.txt
python api.py


cd backend
npm install
node server.js

cd frontend
npm install
npm start    # or npm run dev

MONGO_URI=mongodb://localhost:27017/voting
JWT_SECRET=your_jwt_secret
PORT=5001
# Backend tests
cd backend
npm test

# Face recognition tests
cd face-recognition
pytest
