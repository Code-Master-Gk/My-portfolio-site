# Gopal Kumar - Frontend Web Developer Portfolio

A modern, responsive, and animated personal developer portfolio built with clean **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html              # Main homepage entry point
├── netlify.toml            # Netlify deployment configuration
├── README.md               # Project documentation & deployment guide
│
├── assets/
│   ├── images/             # Profile & personal photos
│   ├── icons/              # Favicon and UI icons
│   │   └── favicon.svg     # SVG logo favicon
│   ├── projects/           # Screenshots & thumbnails for portfolio projects
│   └── resume/             # PDF resumes for direct download
│       └── Gopal-Kumar-Resume.pdf
│
├── css/
│   └── style.css           # Complete responsive stylesheet
│
└── js/
    └── script.js           # Interactive animations, theme toggle, and EmailJS logic
```

---

## 🚀 How to Deploy to Netlify

### Option 1: Drag & Drop (Fastest - 30 Seconds)
1. Log in to your [Netlify Dashboard](https://app.netlify.com).
2. Go to the **Sites** tab.
3. Drag and drop the **entire portfolio project folder** into the upload area.
4. Netlify will deploy your site instantly.

### Option 2: Git Repository (Continuous Deployment)
1. Push this project folder to a GitHub, GitLab, or Bitbucket repository.
2. In Netlify, click **"Add new site"** > **"Import an existing project"**.
3. Select your repository.
4. Set the following build settings:
   - **Build command**: *(Leave blank)*
   - **Publish directory**: `.` *(Root directory)*
5. Click **Deploy Site**.

---

## 📧 EmailJS Contact Form Configuration

The Contact Form uses EmailJS to send messages directly to your inbox without requiring a backend server.

The credentials currently active in `js/script.js` and `script.js` are:
- **Public Key**: `T2dSC_nBrcZtERcDC`
- **Service ID**: `service_gy16mbo`
- **Template ID**: `template_pmfsiqd`

### Form Template Parameters:
Your EmailJS email template should have these variables:
- `{{name}}` - Sender's name
- `{{email}}` - Sender's email address
- `{{message}}` - Sender's message

---

## 📱 Responsive & Cross-Device Compatibility

The website is optimized for all screen resolutions:
- Mobile: 320px, 360px, 375px, 390px, 430px, 576px
- Tablets: 768px, 820px, 834px, 912px, 1024px
- Laptops & Desktops: 1200px, 1440px+
