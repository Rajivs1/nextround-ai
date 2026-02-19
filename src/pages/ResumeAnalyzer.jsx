import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Add floating animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(-10px) rotate(-5deg);
        }
        75% {
          transform: translateY(-30px) rotate(3deg);
        }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setError("");
    setAnalysis(null);

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError("Please upload a valid resume file (PDF, DOC, DOCX, or TXT)");
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setResumeText(text);
    };
    reader.readAsText(selectedFile);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const analyzeWithXAI = async (prompt) => {
    const XAI_API_KEY = import.meta.env.VITE_XAI_API_KEY;
    
    if (!XAI_API_KEY) {
      throw new Error("xAI API key not found. Get one at: https://console.x.ai/");
    }

    console.log('🤖 Using xAI (Grok) API');
    
    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-beta',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      },
      {
        headers: {
          'Authorization': `Bearer ${XAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    return response.data.choices[0].message.content;
  };

  const analyzeWithGroq = async (prompt) => {
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      throw new Error("Groq API key not found. Get one free at: https://console.groq.com/keys");
    }

    // Try different models in order of reliability
    const models = ['llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'llama-3.3-70b-versatile'];
    let lastError;
    
    for (const model of models) {
      try {
        console.log(`🚀 Analyzing with Groq model: ${model}`);
        
        const requestBody = {
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 8000
        };
        
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          requestBody,
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );
      
      // Check response structure
      if (!response.data || !response.data.choices || !response.data.choices[0]) {
        throw new Error('Invalid response structure from API');
      }
      
      const content = response.data.choices[0].message.content;
      console.log(`✅ Analysis complete with ${model}`);
      
      // Validate it looks like JSON
      if (content.includes('{') && content.includes('}')) {
        return content;
      } else {
        throw new Error('AI returned non-JSON response');
      }
    } catch (error) {
      console.warn(`Model ${model} failed, trying next...`);
      lastError = error;
      // Continue to next model
    }
  }
  
  // All models failed
  throw lastError || new Error('All Groq models failed');
};

  const analyzeWithOpenAI = async (prompt) => {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not found. Get one at: https://platform.openai.com/api-keys");
    }

    console.log('🤖 Using OpenAI API');
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    return response.data.choices[0].message.content;
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError("Please upload a resume file first");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      // Check which AI provider to use
      const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'groq';
      console.log('🎯 Using AI Provider:', AI_PROVIDER);
      
      // Truncate resume if too long for faster processing
      const maxResumeLength = 3500; // Reduced for faster analysis
      const truncatedResume = resumeText.length > maxResumeLength 
        ? resumeText.substring(0, maxResumeLength) + '...(truncated)' 
        : resumeText;
      
      // Optimized prompt for faster, more efficient analysis
      const prompt = `You are an expert ATS (Applicant Tracking System) and resume analyzer. Analyze this resume quickly and efficiently.

Resume Content:
${truncatedResume}

Provide a comprehensive JSON analysis with these exact fields (NO markdown, NO extra text):
{
  "overallScore": <number 1-100 based on ATS compatibility, content quality, and formatting>,
  "summary": "<2-3 sentences: overall quality, main strength, key improvement needed>",
  "strengths": [
    "<Specific strength with evidence from resume>",
    "<Another strength>",
    "<Third strength>",
    "<Fourth strength>",
    "<Fifth strength>"
  ],
  "weaknesses": [
    "<Critical weakness with impact>",
    "<Another weakness>",
    "<Third weakness>",
    "<Fourth weakness>",
    "<Fifth weakness>"
  ],
  "suggestions": [
    {"category": "Content", "title": "<Actionable title>", "description": "<Specific improvement with example>", "priority": "high"},
    {"category": "Format", "title": "<Actionable title>", "description": "<Formatting fix>", "priority": "medium"},
    {"category": "Keywords", "title": "<Actionable title>", "description": "<Keywords to add>", "priority": "high"},
    {"category": "Experience", "title": "<Actionable title>", "description": "<How to improve experience section>", "priority": "medium"},
    {"category": "Skills", "title": "<Actionable title>", "description": "<Skills improvement>", "priority": "low"},
    {"category": "ATS", "title": "<Actionable title>", "description": "<ATS optimization>", "priority": "high"}
  ],
  "keywords": {
    "present": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>"],
    "missing": ["<industry-relevant keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>"]
  },
  "sections": {
    "contact": {"score": <1-10>, "feedback": "<Brief feedback>"},
    "summary": {"score": <1-10>, "feedback": "<Brief feedback>"},
    "experience": {"score": <1-10>, "feedback": "<Brief feedback>"},
    "education": {"score": <1-10>, "feedback": "<Brief feedback>"},
    "skills": {"score": <1-10>, "feedback": "<Brief feedback>"}
  },
  "atsCompatibility": {
    "score": <1-100>,
    "issues": ["<ATS issue 1>", "<ATS issue 2>", "<ATS issue 3>"],
    "recommendations": ["<Fix 1>", "<Fix 2>", "<Fix 3>"]
  },
  "industryComparison": {
    "percentile": <1-100, where this resume ranks compared to industry standards>,
    "topCompaniesReady": <true/false, whether ready for FAANG/top companies>,
    "estimatedCallbackRate": "<percentage estimate based on resume quality>"
  }
}

Return ONLY valid JSON. No markdown, no explanation, just the JSON object.`;

      // Route to appropriate AI provider
      let generatedText;
      
      if (AI_PROVIDER === 'xai') {
        generatedText = await analyzeWithXAI(prompt);
        console.log('✅ xAI (Grok) analysis complete');
      } else if (AI_PROVIDER === 'groq') {
        generatedText = await analyzeWithGroq(prompt);
        console.log('✅ Groq analysis complete');
      } else if (AI_PROVIDER === 'openai') {
        generatedText = await analyzeWithOpenAI(prompt);
        console.log('✅ OpenAI analysis complete');
      } else {
        // Gemini (default)
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        
        if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 30) {
          throw new Error("Gemini API key is missing or invalid.");
        }
        
        const possibleModels = [
          'gemini-pro',
          'gemini-1.5-flash-latest',
          'gemini-1.5-flash'
        ];
        
        generatedText = await analyzeWithGemini(prompt, possibleModels, GEMINI_API_KEY);
      }

      // Extract JSON from the response (handle various formats)
      let jsonText = generatedText.trim();
      
      // Remove markdown code blocks if present
      const jsonMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1].trim();
      } else if (jsonText.includes('```')) {
        jsonText = jsonText.replace(/```[\s\S]*?\n/, '').replace(/\n```/g, '').trim();
      }
      
      // Find JSON object (start with { and end with })
      const jsonStart = jsonText.indexOf('{');
      const jsonEnd = jsonText.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
      }
      
      // Clean up any non-printable characters
      // eslint-disable-next-line no-control-regex
      jsonText = jsonText.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
      
      try {
        const analysisData = JSON.parse(jsonText);
        console.log('✅ Resume analysis completed successfully');
        setAnalysis(analysisData);
      } catch {
        console.error('❌ Failed to parse AI response');
        throw new Error('AI returned invalid format. Please try again.');
      }
    } catch (err) {
      console.error("Analysis error:", err.message);
      
      // Provide helpful error messages
      let errorMessage = "Failed to analyze resume. ";
      
      if (err.message.includes("API key") || err.message.includes("missing")) {
        errorMessage += "Please check your API configuration.";
      } else if (err.message.includes("quota")) {
        errorMessage += "API quota exceeded. Please try again later.";
      } else if (err.response?.status === 429) {
        errorMessage += "Rate limit exceeded. Please wait a moment and try again.";
      } else {
        errorMessage += err.message || "Please try again.";
      }
      
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeWithGemini = async (prompt, possibleModels, GEMINI_API_KEY) => {
      // Try different models until one works
      let response;
      
      for (const model of possibleModels) {
        try {
          // Use v1beta for gemini-pro, v1 for newer models
          const apiVersion = model === 'gemini-pro' ? 'v1beta' : 'v1';
          const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
          
          console.log(`🔄 Trying Gemini model: ${model}`);
          
          response = await axios.post(
            endpoint,
            {
              contents: [
                {
                  parts: [
                    {
                      text: prompt
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
              }
            },
            {
              timeout: 60000 // 60 second timeout
            }
          );
          
          // If successful, break out of the loop
          if (response.data.candidates && response.data.candidates[0]) {
            console.log(`✅ Analysis complete with ${model}`);
            break;
          }
        } catch {
          // Continue to next model
        }
      }
      
      // If all models failed, throw error
      if (!response || !response.data.candidates || !response.data.candidates[0]) {
        throw new Error('Gemini API failed to analyze resume');
      }

      return response.data.candidates[0].content.parts[0].text;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/50";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/50";
    if (score >= 40) return "bg-orange-500/20 border-orange-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-500/20 text-red-400 border-red-500/50";
    if (priority === "medium") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    return "bg-blue-500/20 text-blue-400 border-blue-500/50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-gray-100 overflow-hidden relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-purple-900/20 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      
      {/* Floating AI Icons */}
      <div className="absolute top-20 left-[10%] text-indigo-400/30 animate-float" style={{animationDelay: '0s'}}>
        <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm8-10H8v2h6v-2zm0 4H8v2h6v-2z"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-[12%] text-purple-400/30 animate-float" style={{animationDelay: '2s'}}>
        <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-[8%] text-cyan-400/30 animate-float" style={{animationDelay: '1.5s'}}>
        <svg className="w-10 h-10 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>

      <div className="absolute top-[15%] right-[75%] text-fuchsia-400/30 animate-float" style={{animationDelay: '2.5s'}}>
        <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  📄 AI Resume Analyzer
                </h1>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  Get AI-powered insights to improve your resume
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Upload Section */}
          {!analysis && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Upload Your Resume
                </h2>
                <p className="text-gray-400 text-base sm:text-lg mb-6">
                  Upload your resume and get instant AI-powered feedback
                </p>
                
                {/* Quick Tips */}
                <div className="max-w-2xl mx-auto mb-8 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                  <div className="flex items-start gap-3 text-left">
                    <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">💡 Pro Tips for Best Results:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Use a clean, well-formatted resume (PDF preferred)</li>
                        <li>• Include all sections: contact, summary, experience, education, skills</li>
                        <li>• Analysis takes 10-30 seconds depending on resume length</li>
                        <li>• Your data is processed securely and not stored</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload Area */}
              <div
                className={`relative p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-gray-600 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
                } backdrop-blur-sm`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="mb-6">
                    <svg
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>

                  {!fileName ? (
                    <>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Drag & drop your resume here
                      </h3>
                      <p className="text-gray-400 mb-6">or</p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                        <span className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 hover:scale-105">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Browse Files
                        </span>
                      </label>
                      <p className="text-sm text-gray-500 mt-4">
                        Supported formats: PDF, DOC, DOCX, TXT (max 5MB)
                      </p>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-3 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                        <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                        </svg>
                        <div className="flex-1 text-left">
                          <p className="text-white font-semibold">{fileName}</p>
                          <p className="text-sm text-gray-400">
                            {file ? `${(file.size / 1024).toFixed(2)} KB` : ""}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setFile(null);
                            setFileName("");
                            setResumeText("");
                            setError("");
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={analyzeResume}
                        disabled={isAnalyzing}
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                      >
                        {isAnalyzing ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Analyzing Resume with AI...</span>
                            </div>
                            <div className="text-sm text-indigo-200">
                              🔍 Scanning content • 📊 Checking ATS compatibility • 💡 Generating insights
                            </div>
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Analyze Resume with AI
                            <span className="text-xs bg-green-500/20 px-2 py-1 rounded-full">Fast Analysis</span>
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-red-400 font-semibold">{error}</p>
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">
                          Please try again or contact support if the issue persists.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-8">
              {/* Header with Score */}
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <button
                    onClick={() => {
                      setAnalysis(null);
                      setFile(null);
                      setFileName("");
                      setResumeText("");
                    }}
                    className="px-4 py-2 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
                  >
                    ← Analyze Another Resume
                  </button>
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(analysis, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `resume-analysis-${Date.now()}.json`;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Report
                  </button>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Analysis Complete!
                </h2>
                <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 ${getScoreBgColor(analysis.overallScore)}`}>
                  <span className="text-gray-300 font-semibold">Overall Score:</span>
                  <span className={`text-5xl font-black ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}/100
                  </span>
                </div>
                <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
                  {analysis.summary}
                </p>
              </div>

              {/* Industry Comparison - New Feature */}
              {analysis.industryComparison && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Industry Comparison
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="text-3xl font-black text-indigo-400 mb-2">
                        {analysis.industryComparison.percentile}th
                      </div>
                      <div className="text-sm text-gray-400">Percentile Rank</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Better than {analysis.industryComparison.percentile}% of resumes
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="text-3xl font-black mb-2">
                        {analysis.industryComparison.topCompaniesReady ? (
                          <span className="text-green-400">✓ Ready</span>
                        ) : (
                          <span className="text-orange-400">⚠ Not Yet</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">Top Companies</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {analysis.industryComparison.topCompaniesReady ? 'FAANG-ready' : 'Needs improvement'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="text-3xl font-black text-purple-400 mb-2">
                        {analysis.industryComparison.estimatedCallbackRate}
                      </div>
                      <div className="text-sm text-gray-400">Est. Callback Rate</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Based on resume quality
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Strengths and Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Areas to Improve</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-red-400 mt-1">!</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section Scores */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Section Breakdown
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(analysis.sections).map(([section, data]) => (
                    <div key={section} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white capitalize">{section}</h4>
                        <span className={`text-2xl font-bold ${getScoreColor(data.score * 10)}`}>
                          {data.score}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{data.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Actionable Suggestions
                </h3>
                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority.toUpperCase()}
                            </span>
                            <span className="text-indigo-400 text-sm font-semibold">{suggestion.category}</span>
                          </div>
                          <h4 className="font-bold text-white text-lg mb-2">{suggestion.title}</h4>
                          <p className="text-gray-300">{suggestion.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-green-500/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>✓</span> Keywords Present
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.present.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/50 rounded-lg text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-orange-500/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>+</span> Suggested Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.missing.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/50 rounded-lg text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ATS Compatibility */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-blue-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    ATS Compatibility
                  </h3>
                  <span className={`text-3xl font-black ${getScoreColor(analysis.atsCompatibility.score)}`}>
                    {analysis.atsCompatibility.score}/100
                  </span>
                </div>

                {analysis.atsCompatibility.issues.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-400 mb-3">Issues Found:</h4>
                    <ul className="space-y-2">
                      {analysis.atsCompatibility.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.atsCompatibility.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      {analysis.atsCompatibility.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-blue-400 mt-1">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
