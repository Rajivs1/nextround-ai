# 📄 AI Resume Analyzer

## Overview

The AI Resume Analyzer is a powerful feature that uses Groq's AI (Llama 3.3) to provide comprehensive analysis and actionable feedback on your resume. Get instant insights to improve your resume and increase your chances of landing interviews.

## Features

### ✨ Comprehensive Analysis
- **Overall Score**: Get a score out of 100 for your resume
- **Strengths & Weaknesses**: Detailed analysis of what works and what needs improvement
- **Section Breakdown**: Individual scores and feedback for each resume section:
  - Contact Information
  - Summary/Objective
  - Work Experience
  - Education
  - Skills

### 🎯 Actionable Suggestions
- Prioritized recommendations (High, Medium, Low)
- Category-based suggestions
- Detailed descriptions for each improvement area

### 🔍 Keyword Analysis
- **Keywords Present**: Industry-relevant keywords found in your resume
- **Suggested Keywords**: Important keywords you should consider adding

### 🤖 ATS Compatibility Check
- ATS (Applicant Tracking System) compatibility score
- Issues that might prevent your resume from passing ATS screening
- Recommendations to improve ATS compatibility

## Setup

### 1. Get Your Groq API Key (FREE!)

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign in with Google or GitHub (no credit card needed!)
3. Click "Create API Key"
4. Copy your API key (starts with `gsk_`)

### 2. Configure the Application

The `.env` file is already configured! Just make sure these lines are present:
```env
VITE_GROQ_API_KEY=your_groq_key_here
VITE_AI_PROVIDER=groq
```

Then restart the development server.

## Usage

### 1. Access the Resume Analyzer

From your dashboard:
- Click on the **"📄 Analyze Resume"** button in Quick Actions
- Or click on the **"AI Resume Analyzer"** feature card

### 2. Upload Your Resume

**Supported Formats:**
- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Plain Text (.txt)

**File Size Limit:** 5MB

**Two Ways to Upload:**
1. **Drag & Drop**: Drag your resume file into the upload area
2. **Browse Files**: Click "Browse Files" button to select from your computer

### 3. Analyze

1. Once your file is uploaded, click **"Analyze Resume with AI"**
2. Wait for the AI to process your resume (usually takes 10-30 seconds)
3. View your comprehensive analysis results

### 4. Review Results

Your analysis includes:

#### Overall Score & Summary
- Score out of 100
- Brief overall assessment

#### Strengths ✓
- List of strong points in your resume

#### Areas to Improve !
- List of weaknesses that need attention

#### Section Breakdown
- Individual scores for each resume section
- Specific feedback for each section

#### Actionable Suggestions 💡
- Prioritized recommendations
- Categorized by area (Content, Formatting, Skills, etc.)
- Detailed descriptions

#### Keyword Analysis
- Keywords you're already using
- Important keywords you should add

#### ATS Compatibility
- ATS score
- Issues that might affect ATS parsing
- Recommendations to improve compatibility

### 5. Make Improvements

1. Review all suggestions carefully
2. Focus on high-priority items first
3. Update your resume based on the feedback
4. Re-analyze to see improvements

## Tips for Best Results

### 📝 Before Uploading
- Use a clean, well-formatted resume
- Ensure text is selectable (not an image)
- Remove any sensitive information you don't want analyzed

### 🎯 After Analysis
- Prioritize high-priority suggestions
- Don't ignore ATS compatibility warnings
- Add suggested keywords naturally
- Keep iterating and improving

### ⚡ Best Practices
- **Be Specific**: Include quantifiable achievements
- **Use Action Verbs**: Start bullet points with strong action verbs
- **Tailor Content**: Customize your resume for each job application
- **Keep It Concise**: Aim for 1-2 pages depending on experience
- **Proofread**: Fix any grammar or spelling errors

## Troubleshooting

### Error: "Failed to analyze resume"
- **Check your API key**: Ensure it's correctly set in `.env`
- **Check file format**: Make sure you're uploading a supported file type
- **Check file size**: Ensure file is under 5MB
- **Internet connection**: Ensure you have a stable internet connection

### File won't upload
- **Format**: Only PDF, DOC, DOCX, and TXT files are supported
- **Size**: Files must be under 5MB
- **Corruption**: Try opening the file to ensure it's not corrupted

### Analysis seems incomplete
- **File content**: Ensure your resume has actual text content
- **Formatting**: Complex formatting might affect text extraction
- **Try different format**: Convert to plain text (.txt) if issues persist

## Privacy & Security

- Your resume is sent to Groq's API for analysis
- The resume content is not stored on our servers
- Review Groq's privacy policy for information on how they handle data
- For sensitive resumes, consider removing personal details before analysis

## Technical Details

- **AI Model**: Llama 3.3 70B Versatile
- **API Provider**: Groq
- **Processing**: Client-side file reading, API-based AI analysis
- **Response Time**: Typically 5-15 seconds (very fast!)

## Future Enhancements

Planned features:
- Multiple resume comparison
- Industry-specific analysis
- Resume templates based on analysis
- PDF export of analysis results
- Historical analysis tracking

## Support

If you encounter any issues:
1. Check this documentation
2. Verify your API key configuration
3. Check browser console for detailed error messages
4. Contact support with specific error details

---

**Happy resume improving! 🚀**
