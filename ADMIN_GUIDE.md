# Admin Panel Guide

## 🔐 Accessing the Admin Panel

Navigate to: **http://localhost:3002/admin**

**Default Password**: `admin123`

> [!IMPORTANT]
> Change the password in `.env.local` file by updating the `ADMIN_PASSWORD` variable.

## 📋 Features

### Projects Management
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Set project category (Web, Mobile, AI, Full Stack)
- ✅ Add tech stack tags
- ✅ Set live URL and GitHub URL
- ✅ **Upload project images** (supports JPG, PNG, GIF, WebP)

### Experience Management
- ✅ Add work experience entries
- ✅ Edit company, position, and period
- ✅ Add multiple achievements (one per line)
- ✅ Delete experience entries
- ✅ **Upload company logos** (supports JPG, PNG, GIF, WebP)

### Skills Management
- ✅ Add/remove skills
- ✅ Set skill proficiency level (0-100%)
- ✅ Categorize skills (Frontend, Backend, AI/ML, Tools)
- ✅ Visual progress bars

### Education Management
- ✅ Add educational background
- ✅ Set degree, institution, and period
- ✅ Add detailed descriptions

## 💾 Data Persistence

All changes are saved to `data/portfolio-data.json` and will persist across server restarts.

The main portfolio page reads from this JSON file, so changes in the admin panel will immediately reflect on the public site after a page refresh.

## 📸 Image Uploads

Images are stored in the `public/uploads` directory:
- **Project images**: `public/uploads/projects/`
- **Company logos**: `public/uploads/companies/`

Supported formats: JPG, PNG, GIF, WebP

When you upload an image:
1. The file is saved to the appropriate directory
2. A unique filename is generated (timestamp-based)
3. The URL is automatically saved to your project/experience data
4. Images are immediately available on the public site

> [!NOTE]
> Uploaded images are stored locally. For production, consider using a cloud storage service like AWS S3, Cloudinary, or Vercel Blob.

## 🔒 Security Notes

1. **Password**: Stored in `.env.local` (not committed to git)
2. **Session**: Uses JWT with 24-hour expiration
3. **API Protection**: All admin API routes check for valid session

## 🚀 Production Deployment

For production, consider:
1. Using a stronger password
2. Implementing proper authentication (NextAuth.js, Clerk, etc.)
3. Using a database instead of JSON file storage
4. Adding rate limiting to prevent brute force attacks
5. Enabling HTTPS

## 📝 Changing the Password

Edit `.env.local`:
```env
ADMIN_PASSWORD=your_new_secure_password
```

Restart the development server after changing the password.
