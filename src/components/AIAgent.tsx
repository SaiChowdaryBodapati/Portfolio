import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  Download,
  Copy,
  Check,
  Sparkles,
  Brain,
  Code,
  Database,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  reactions?: {
    thumbsUp: boolean;
    thumbsDown: boolean;
  };
  quickActions?: string[];
}

interface ConversationStats {
  totalMessages: number;
  userMessages: number;
  aiMessages: number;
  sessionStart: Date;
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about Saitej's skills, experience, and projects. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      quickActions: ['Skills & Tech', 'Experience', 'Projects', 'Contact Info']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStats, setConversationStats] = useState<ConversationStats>({
    totalMessages: 1,
    userMessages: 0,
    aiMessages: 1,
    sessionStart: new Date()
  });
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load conversation from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('aiAgentMessages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
        setConversationStats(prev => ({
          ...prev,
          totalMessages: parsed.length,
          aiMessages: parsed.filter((m: Message) => m.sender === 'ai').length,
          userMessages: parsed.filter((m: Message) => m.sender === 'user').length
        }));
      } catch (error) {
        console.error('Failed to load conversation history');
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    localStorage.setItem('aiAgentMessages', JSON.stringify(messages));
  }, [messages]);

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage(action);
  };

  const handleSendMessage = async (customInput?: string) => {
    const messageText = customInput || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Update stats
    setConversationStats(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
      userMessages: prev.userMessages + 1
    }));

    // Simulate AI response with more sophisticated logic
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        quickActions: aiResponse.quickActions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Update stats
      setConversationStats(prev => ({
        ...prev,
        totalMessages: prev.totalMessages + 1,
        aiMessages: prev.aiMessages + 1
      }));
    }, 800 + Math.random() * 1200);
  };

  const generateAIResponse = (userInput: string, conversationHistory: Message[]): { text: string; quickActions?: string[] } => {
    const input = userInput.toLowerCase();
    const recentMessages = conversationHistory.slice(-3).map(m => m.text.toLowerCase());
    
    // Check for context from recent conversation
    const hasAskedAboutSkills = recentMessages.some(msg => 
      msg.includes('skill') || msg.includes('tech') || msg.includes('programming')
    );
    const hasAskedAboutExperience = recentMessages.some(msg => 
      msg.includes('experience') || msg.includes('work') || msg.includes('job')
    );
    
    // Skills and technologies
    if (input.includes('skill') || input.includes('technology') || input.includes('tech') || input.includes('programming')) {
      return {
        text: "🚀 **Saitej's Technical Arsenal:**\n\n**Programming Languages:** Python, JavaScript, TypeScript, Java, SQL\n**Frontend:** React, Next.js, HTML5, CSS3, Tailwind CSS\n**Backend:** Node.js, Express.js, Django, FastAPI\n**AI/ML:** TensorFlow, PyTorch, Scikit-learn, OpenCV, NLP\n**Cloud & DevOps:** AWS, Azure, Docker, Kubernetes, CI/CD\n**Data Engineering:** Apache Spark, Kafka, Hadoop, MongoDB, PostgreSQL\n\nHe's particularly passionate about building scalable AI solutions and data pipelines!",
        quickActions: ['Experience', 'Projects', 'Education', 'Contact']
      };
    }
    
    // Experience
    if (input.includes('experience') || input.includes('work') || input.includes('job') || input.includes('career')) {
      return {
        text: "💼 **Professional Journey:**\n\n**Data Engineer @ TechCorp** (2023-Present)\n• Built real-time ETL pipelines processing 1M+ records daily\n• Designed data warehouse architecture reducing query time by 60%\n• Led team of 3 engineers on cloud migration project\n\n**ML Engineer @ AI Solutions** (2022-2023)\n• Developed predictive models achieving 94% accuracy\n• Deployed ML models to production using Docker & Kubernetes\n• Implemented A/B testing framework for model optimization\n\n**Software Engineer @ StartupXYZ** (2021-2022)\n• Full-stack development with React & Node.js\n• Built RESTful APIs serving 10K+ daily requests\n• Mentored junior developers and conducted code reviews",
        quickActions: ['Skills', 'Projects', 'Education', 'Contact']
      };
    }
    
    // Education
    if (input.includes('education') || input.includes('degree') || input.includes('university') || input.includes('school')) {
      return {
        text: "🎓 **Academic Background:**\n\n**M.S. Data Science** - New Jersey Institute of Technology (2023)\n• GPA: 3.8/4.0 | Specialization: Machine Learning & AI\n• Thesis: 'Deep Learning Approaches for Real-time Anomaly Detection'\n• Relevant Courses: Advanced ML, Big Data Analytics, Computer Vision\n\n**B.S. Computer Science** - University of Technology (2021)\n• GPA: 3.9/4.0 | Minor: Mathematics\n• Dean's List: All semesters | Senior Project: AI-powered Chatbot\n• Leadership: CS Club President, Hackathon Organizer",
        quickActions: ['Skills', 'Experience', 'Projects', 'Contact']
      };
    }
    
    // Projects
    if (input.includes('project') || input.includes('work') || input.includes('portfolio') || input.includes('build')) {
      return {
        text: "🛠️ **Featured Projects:**\n\n**1. Real-time Recommendation Engine**\n• Built ML pipeline processing user behavior data\n• Achieved 25% improvement in recommendation accuracy\n• Tech: Python, TensorFlow, Apache Kafka, Redis\n\n**2. Predictive Analytics Dashboard**\n• Interactive dashboard for business intelligence\n• Real-time data visualization with D3.js\n• Tech: React, Node.js, PostgreSQL, Chart.js\n\n**3. AI-Powered Resume Parser**\n• NLP model extracting key information from resumes\n• 95% accuracy in information extraction\n• Tech: Python, spaCy, FastAPI, Docker\n\n**4. This Portfolio Website**\n• Modern React app with AI chat integration\n• Responsive design with game-like animations\n• Tech: React, TypeScript, Tailwind CSS, Framer Motion",
        quickActions: ['Skills', 'Experience', 'GitHub', 'Contact']
      };
    }
    
    // Contact
    if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('connect')) {
      return {
        text: "📞 **Get in Touch:**\n\n**Email:** saitejdeepkumar@gmail.com\n**LinkedIn:** linkedin.com/in/tejchowdary\n**GitHub:** github.com/saitejchowdary\n**Location:** New Jersey, USA\n\nSaitej is always excited to discuss:\n• New opportunities and collaborations\n• AI/ML projects and research\n• Data engineering challenges\n• Open source contributions\n\nHe typically responds within 24 hours! 🚀",
        quickActions: ['Download Resume', 'View GitHub', 'Skills', 'Projects']
      };
    }
    
    // Location
    if (input.includes('location') || input.includes('where') || input.includes('based') || input.includes('area')) {
      return {
        text: "📍 **Location & Availability:**\n\n**Current Location:** New Jersey, USA\n**Work Preferences:**\n• Remote-first opportunities\n• Hybrid work arrangements\n• Willing to relocate for exciting roles\n• Open to international opportunities\n\n**Time Zone:** Eastern Time (ET)\n**Availability:** Immediately available for new opportunities\n\nSaitej enjoys collaborating with global teams and has experience working across different time zones!",
        quickActions: ['Contact', 'Experience', 'Skills', 'Projects']
      };
    }
    
    // AI/ML specific
    if (input.includes('ai') || input.includes('machine learning') || input.includes('ml') || input.includes('artificial intelligence')) {
      return {
        text: "🤖 **AI & Machine Learning Expertise:**\n\n**Specializations:**\n• Deep Learning & Neural Networks\n• Computer Vision & Image Processing\n• Natural Language Processing (NLP)\n• Predictive Modeling & Forecasting\n• Reinforcement Learning\n\n**Recent AI Projects:**\n• Computer vision model for quality control (98% accuracy)\n• NLP chatbot with sentiment analysis\n• Recommendation system using collaborative filtering\n• Anomaly detection for fraud prevention\n\n**Frameworks & Tools:**\nTensorFlow, PyTorch, Scikit-learn, OpenCV, spaCy, Hugging Face, MLflow",
        quickActions: ['Projects', 'Experience', 'Skills', 'Contact']
      };
    }
    
    // Data engineering
    if (input.includes('data') || input.includes('etl') || input.includes('pipeline') || input.includes('warehouse')) {
      return {
        text: "📊 **Data Engineering Mastery:**\n\n**Core Competencies:**\n• ETL/ELT Pipeline Development\n• Data Warehouse Design & Optimization\n• Real-time Data Processing\n• Big Data Architecture\n• Data Quality & Governance\n\n**Technologies:**\n• **Big Data:** Apache Spark, Hadoop, Kafka\n• **Databases:** PostgreSQL, MongoDB, Redis, Cassandra\n• **Cloud:** AWS (S3, Redshift, EMR), Azure, GCP\n• **Orchestration:** Airflow, Luigi, Prefect\n• **Monitoring:** Grafana, Prometheus, DataDog\n\n**Recent Achievements:**\n• Reduced data processing time by 70%\n• Built data lake serving 100+ analysts\n• Implemented real-time streaming pipeline",
        quickActions: ['Experience', 'Projects', 'Skills', 'Contact']
      };
    }

    // GitHub
    if (input.includes('github') || input.includes('code') || input.includes('repository')) {
      return {
        text: "💻 **GitHub & Open Source:**\n\n**GitHub Profile:** github.com/saitejchowdary\n\n**Featured Repositories:**\n• **ML-Pipeline-Framework:** End-to-end ML pipeline automation\n• **Data-Visualization-Toolkit:** Interactive charts and dashboards\n• **AI-Chatbot:** Natural language processing chatbot\n• **Portfolio-Website:** This very website (open source!)\n\n**Open Source Contributions:**\n• Active contributor to TensorFlow and scikit-learn\n• Maintained 5+ popular data science packages\n• Organized local hackathons and coding meetups\n\n**Coding Philosophy:** Clean, documented, and scalable code with comprehensive testing!",
        quickActions: ['Projects', 'Skills', 'Contact', 'Resume']
      };
    }

    // Resume
    if (input.includes('resume') || input.includes('cv') || input.includes('download')) {
      return {
        text: "📄 **Resume & Portfolio:**\n\n**Resume:** Available for download in PDF format\n**Portfolio:** This interactive website showcases Saitej's work\n\n**Key Highlights:**\n• 3+ years of professional experience\n• Master's degree in Data Science\n• 15+ completed projects\n• 5+ technical certifications\n• Active open source contributor\n\nWould you like me to provide a download link for the resume?",
        quickActions: ['Download Resume', 'Projects', 'Experience', 'Contact']
      };
    }
    
    // Default response with context awareness
    if (hasAskedAboutSkills) {
      return {
        text: "Based on our conversation about skills, would you like to know more about Saitej's specific project implementations using these technologies? Or perhaps his experience level with particular frameworks?",
        quickActions: ['Projects', 'Experience', 'Contact', 'GitHub']
      };
    }
    
    if (hasAskedAboutExperience) {
      return {
        text: "Since you're interested in Saitej's experience, would you like to dive deeper into any specific role or learn about the technologies he used in those positions?",
        quickActions: ['Skills', 'Projects', 'Education', 'Contact']
      };
    }
    
    return {
      text: "I'm here to help you learn more about Saitej! Here are some popular topics:\n\n• **Skills & Technologies** - Programming languages, frameworks, tools\n• **Work Experience** - Professional background and achievements\n• **Projects** - Portfolio highlights and technical implementations\n• **Education** - Academic background and certifications\n• **Contact Info** - How to reach out and connect\n\nWhat interests you most? 🤔",
      quickActions: ['Skills & Tech', 'Experience', 'Projects', 'Contact Info']
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReaction = (messageId: string, reaction: 'thumbsUp' | 'thumbsDown') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            reactions: { 
              ...msg.reactions, 
              [reaction]: !msg.reactions?.[reaction] 
            } 
          }
        : msg
    ));
  };

  const copyMessage = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy message');
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about Saitej's skills, experience, and projects. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      quickActions: ['Skills & Tech', 'Experience', 'Projects', 'Contact Info']
    }]);
    setConversationStats({
      totalMessages: 1,
      userMessages: 0,
      aiMessages: 1,
      sessionStart: new Date()
    });
    localStorage.removeItem('aiAgentMessages');
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Saitej_Bodapati_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGitHub = () => {
    window.open('https://github.com/saitejchowdary', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/tejchowdary', '_blank');
  };

  const sendEmail = () => {
    window.open('mailto:saitejdeepkumar@gmail.com', '_blank');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <Card className="relative w-full max-w-md h-[600px] bg-slate-900 border-slate-700 shadow-2xl">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bot className="h-5 w-5 text-blue-400" />
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-slate-400">Powered by advanced AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowStats(!showStats)}
                    className="h-8 w-8 text-slate-400 hover:text-white"
                  >
                    <Brain className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearConversation}
                    className="h-8 w-8 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats Panel */}
              {showStats && (
                <div className="p-3 bg-slate-800 border-b border-slate-700">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-slate-400">Messages</p>
                      <p className="text-white font-semibold">{conversationStats.totalMessages}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400">Session</p>
                      <p className="text-white font-semibold">
                        {Math.floor((Date.now() - conversationStats.sessionStart.getTime()) / 60000)}m
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400">AI Responses</p>
                      <p className="text-white font-semibold">{conversationStats.aiMessages}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'ai' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <div className="flex items-center gap-1">
                                {message.sender === 'ai' && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyMessage(message.text, message.id)}
                                    className="h-6 w-6 text-slate-400 hover:text-white"
                                  >
                                    {copiedMessageId === message.id ? (
                                      <Check className="h-3 w-3 text-green-400" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReaction(message.id, 'thumbsUp')}
                                  className={`h-6 w-6 ${
                                    message.reactions?.thumbsUp 
                                      ? 'text-green-400' 
                                      : 'text-slate-400 hover:text-green-400'
                                  }`}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReaction(message.id, 'thumbsDown')}
                                  className={`h-6 w-6 ${
                                    message.reactions?.thumbsDown 
                                      ? 'text-red-400' 
                                      : 'text-slate-400 hover:text-red-400'
                                  }`}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {message.sender === 'user' && (
                            <User className="h-4 w-4 mt-0.5 text-blue-200 flex-shrink-0" />
                          )}
                        </div>
                        
                        {/* Quick Actions */}
                        {message.quickActions && message.sender === 'ai' && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {message.quickActions.map((action, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors text-xs"
                                onClick={() => handleQuickAction(action)}
                              >
                                {action}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700 text-slate-200 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-400" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-slate-400 ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Action Buttons */}
              <div className="p-3 border-t border-slate-700 bg-slate-800">
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadResume}
                    className="flex-1 text-xs bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openGitHub}
                    className="flex-1 text-xs bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Github className="h-3 w-3 mr-1" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openLinkedIn}
                    className="flex-1 text-xs bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Linkedin className="h-3 w-3 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={sendEmail}
                    className="flex-1 text-xs bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Saitej..."
                    className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAgent; 
