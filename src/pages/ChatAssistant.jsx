import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { sendChatMessage, QUICK_ACTIONS } from "../services/aiChatService";

export default function ChatAssistant() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `👋 Hi there! I'm your NextRound AI Assistant!

I'm here to help you with:
• Interview preparation and practice
• DSA problem-solving strategies
• Resume and career advice
• Technical concept explanations
• Company-specific interview tips
• Code review and optimization

What would you like to work on today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage.trim();
    
    if (!textToSend || isLoading) return;

    // Hide quick actions after first message
    setShowQuickActions(false);

    // Add user message to chat
    const userMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Prepare conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get AI response
      const response = await sendChatMessage(conversationHistory, textToSend);

      // Add assistant response to chat
      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage = {
        role: "assistant",
        content: `❌ Sorry, I encountered an error: ${error.message}\n\nPlease try again or rephrase your question.`,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setShowQuickActions(true);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-gradient"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200 flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                  AI Chat Assistant
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 truncate">
                  Your personal interview prep coach
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:scale-105 flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="hidden sm:inline">Clear Chat</span>
              <span className="sm:hidden">Clear</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 flex flex-col h-[calc(100vh-88px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] rounded-xl sm:rounded-2xl px-4 sm:px-5 lg:px-6 py-3 sm:py-4 shadow-lg hover:scale-[1.01] transition-transform duration-200 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : message.isError
                    ? "bg-red-900/50 border border-red-500/50 text-red-200"
                    : "glass-effect text-gray-100"
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl animate-float-slow">
                    {message.role === "user" ? "👤" : "🤖"}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    {message.role === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span className="text-xs opacity-60 ml-auto">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Message Content */}
                <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
                  <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
                    {message.content}
                  </pre>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-effect rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl animate-float-slow">🤖</span>
                  <span className="font-semibold text-xs sm:text-sm">AI Assistant</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (shown at start) */}
        {showQuickActions && messages.length <= 1 && (
          <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 text-center">
              Quick Actions - Get started fast:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                  className="p-2.5 sm:p-3 glass-effect hover:bg-white/10 rounded-lg sm:rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed group hover-lift"
                >
                  <div className="text-xl sm:text-2xl mb-1 animate-float-slow">{action.icon}</div>
                  <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                    {action.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="glass-effect rounded-xl sm:rounded-2xl border border-gray-800 p-3 sm:p-4 shadow-2xl">
          <div className="flex gap-2 sm:gap-3">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about interviews, coding, career advice..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-gray-800/50 text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 placeholder-gray-500 transition-all text-sm sm:text-base"
              style={{
                minHeight: "44px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg sm:rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Thinking...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Send</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="mt-2 sm:mt-3 text-xs text-gray-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
            <span className="flex items-center gap-1">💡 <span className="hidden sm:inline">Tip: Press Enter to send, Shift+Enter for new line</span><span className="sm:hidden">Enter to send</span></span>
            <span className="text-gray-600 flex items-center gap-1">
              <span className="animate-pulse">✨</span>
              Powered by Groq AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
