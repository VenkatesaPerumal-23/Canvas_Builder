**Canvas Builder API with PDF Export**

A full-stack web application that lets users draw shapes, text, and images on a customizable canvas, preview the result in real-time, and export it as a high-quality compressed PDF. Designed with interactive swirl background animation.

**TECH STACK USED**
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Canvas Rendering**: HTML5 Canvas API (Frontend), node-canvas (Backend)
- **PDF Generation**: pdfkit
- **Image Upload**: multer
- **Styling**: Custom CSS
- **Deployment**: Render (Backend), Vercel (Frontend)

**Backend APIs:**
- POST /init – Initialize canvas
- POST /add/shape – Add rectangle/circle
- POST /add/text – Add text
- POST /add/image – Upload and place image
- POST /export-pdf – Export canvas as PDF

**Getting Started** 
1. Clone the repo using git command git clone repo_name
2. Backend Setup
 - cd backend
 - npm install
 - npm start
3. Frontend
 - cd frontend
 - npm install
 - npm run dev

