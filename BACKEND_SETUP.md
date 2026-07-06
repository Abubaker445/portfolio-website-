# Setup Guide for Portfolio Backend

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Select **Security** (left sidebar)
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Select **Mail** and **Windows Computer**
6. Copy the generated 16-character password

### 3. Create `.env` file
Copy `.env.example` to `.env` and fill in:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=5000
```

### 4. Run Locally
```bash
npm start
```
Server will run at `http://localhost:5000`

### 5. Test the Backend
```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@gmail.com","subject":"Test","message":"Test message"}'
```

---

## Deploy to Render (Free & Easy)

### 1. Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2. Go to [render.com](https://render.com)
- Sign up with GitHub
- Click **New +** → **Web Service**
- Select your GitHub repo
- Set these settings:
  - **Name**: `portfolio-backend`
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Region**: Choose closest to you

### 3. Add Environment Variables
- Click **Environment**
- Add variables from your `.env`:
  - `EMAIL_USER`: your-gmail@gmail.com
  - `EMAIL_PASS`: your-app-password

### 4. Deploy
- Click **Deploy**
- Copy the deployed URL (e.g., `https://portfolio-backend.onrender.com`)

### 5. Update Frontend
In your portfolio's `script.js`, update line with `backendUrl`:
```javascript
const backendUrl = 'https://portfolio-backend.onrender.com';
```

---

## Alternative Cloud Services

- **Railway.app**: Simple, $5/month free tier
- **Vercel**: Serverless functions
- **AWS Lambda**: More complex but powerful
- **Heroku**: Classic, but paid now ($7+/month)

---

## Testing After Deployment
1. Visit your portfolio site
2. Fill out the contact form
3. Submit
4. Check your email - you should receive the message!

---

## Troubleshooting

**"Failed to send email"**
- Check EMAIL_USER and EMAIL_PASS are correct
- Verify Gmail app password (not regular password)
- Check backend logs: `render.com` → Logs

**"CORS error"**
- Backend CORS is configured for all origins
- If issues persist, add portfolio domain to CORS

**"Connection refused"**
- Local: Make sure backend is running (`npm start`)
- Production: Check Render deployment logs
