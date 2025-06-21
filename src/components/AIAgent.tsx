import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about Saitej's skills, experience, and projects. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Skills and technologies
    if (input.includes('skill') || input.includes('technology') || input.includes('tech') || input.includes('programming')) {
      return "Saitej is proficient in Python, JavaScript, React, TypeScript, Node.js, SQL, and various AI/ML frameworks like TensorFlow and PyTorch. He also has experience with cloud platforms like AWS and Azure, and data engineering tools like Apache Spark and Kafka.";
    }
    
    // Experience
    if (input.includes('experience') || input.includes('work') || input.includes('job') || input.includes('career')) {
      return "Saitej has experience as a Data Engineer at TechCorp where he built ETL pipelines and data warehouses. He also worked as a Machine Learning Engineer at AI Solutions, developing predictive models and deploying them to production. He's passionate about turning data into actionable insights.";
    }
    
    // Education
    if (input.includes('education') || input.includes('degree') || input.includes('university') || input.includes('school')) {
      return "Saitej holds a Master's degree in Data Science from New Jersey Institute of Technology (NJIT), Ying Wu College of Computing. He also has a Bachelor's degree in Computer Science with a focus on artificial intelligence and machine learning.";
    }
    
    // Projects
    if (input.includes('project') || input.includes('work') || input.includes('portfolio') || input.includes('build')) {
      return "Saitej has worked on several interesting projects including a real-time recommendation system, a predictive analytics dashboard, and this very portfolio website! He's particularly proud of his work on machine learning models for customer behavior prediction and natural language processing applications.";
    }
    
    // Contact
    if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('connect')) {
      return "You can reach Saitej at saitejdeepkumar@gmail.com or connect with him on LinkedIn at https://www.linkedin.com/in/tejchowdary. He's always open to discussing new opportunities and collaborations!";
    }
    
    // Location
    if (input.includes('location') || input.includes('where') || input.includes('based') || input.includes('area')) {
      return "Saitej is based in New Jersey, USA, and is open to remote opportunities. He's willing to relocate for the right opportunity and enjoys working with teams from around the world.";
    }
    
    // AI/ML specific
    if (input.includes('ai') || input.includes('machine learning') || input.includes('ml') || input.includes('artificial intelligence')) {
      return "Saitej specializes in artificial intelligence and machine learning, with expertise in deep learning, computer vision, natural language processing, and predictive modeling. He's worked on projects involving neural networks, recommendation systems, and automated decision-making systems.";
    }
    
    // Data engineering
    if (input.includes('data') || input.includes('etl') || input.includes('pipeline') || input.includes('warehouse')) {
      return "Saitej has extensive experience in data engineering, including building ETL pipelines, designing data warehouses, and working with big data technologies. He's proficient in Apache Spark, Kafka, and various cloud-based data solutions.";
    }
    
    // Default response
    return "I'm here to help you learn more about Saitej! You can ask me about his skills, experience, education, projects, or how to get in touch. What would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <Card className="relative w-full max-w-md h-96 bg-slate-900 border-slate-700">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-400" />
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'ai' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <User className="h-4 w-4 mt-0.5 text-blue-200 flex-shrink-0" />
                          )}
                        </div>
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

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
                    onClick={handleSendMessage}
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