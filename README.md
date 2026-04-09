Lets Chat

A real-time chat application built with a full-stack JavaScript architecture, enabling seamless communication with instant messaging, live updates, and scalable backend services.

🚀 Features
💬 Real-time one-to-one messaging
👥 Group chat functionality
⚡ Instant message delivery using WebSockets (Socket.IO)
🟢 Online/offline user status
🔔 Push notifications with Firebase
📎 Media & file sharing (optional / extendable)
🔐 User authentication & secure sessions
🕓 Message timestamps and history
🛠️ Tech Stack
🌐 Frontend
React.js – UI development
CSS / Tailwind / Bootstrap (update if needed)
🧠 Backend
Node.js – Runtime environment
Express.js – Backend framework
🗄️ Database
MongoDB – NoSQL database for storing users & messages
🔄 Real-Time Communication
Socket.IO – WebSocket-based real-time messaging
🔐 Authentication & Notifications
Firebase
Authentication (if used)
Cloud Messaging (Push Notifications)
⚙️ How It Works
Users connect through the React frontend
Backend (Node + Express) handles APIs and user management
MongoDB stores chat data and user info
Socket.IO enables real-time bidirectional communication
Firebase handles authentication and notifications
📦 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/IpsitaKumarKishan/lets-chat.git
cd lets-chat
2️⃣ Install Dependencies
Client
cd client
npm install
Server
cd server
npm install
3️⃣ Environment Variables

Create a .env file in the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_key
JWT_SECRET=your_secret_key
4️⃣ Run the Application
Start Backend
cd server
npm run dev
Start Frontend
cd client
npm start
📁 Project Structure
lets-chat/
 ┣ client/        # React frontend
 ┣ server/        # Node + Express backend
 ┣ models/        # MongoDB schemas
 ┣ routes/        # API routes
 ┣ sockets/       # Socket.IO logic
 ┗ config/        # DB & Firebase config
🔌 Key Technologies Explained
Socket.IO → Enables real-time chat without refreshing
MongoDB → Stores chat history efficiently
Express.js → Handles REST APIs
React → Dynamic and responsive UI
Firebase → Authentication & push notifications
📸 Demo

Add screenshots / demo GIFs here

🧪 Future Improvements
📹 Video/voice calling
🧾 Message read receipts
🌙 Dark mode
🔎 Advanced search
📱 Mobile app version
🤝 Contributing

Contributions are welcome!

Fork the repo
Create your feature branch
Commit changes
Open a Pull Request
📄 License

This project is licensed under the MIT License.

🙌 Author

Ipsita Kumar Kishan
