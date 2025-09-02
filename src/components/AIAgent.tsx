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

interface Response {
  text: string;
  quickActions?: string[];
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
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(messagesWithDates);
        setConversationStats(prev => ({
          ...prev,
          totalMessages: messagesWithDates.length,
          aiMessages: messagesWithDates.filter((m: Message) => m.sender === 'ai').length,
          userMessages: messagesWithDates.filter((m: Message) => m.sender === 'user').length
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
      const aiResponse = generateResponse(messageText);
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

  const generateResponse = (input: string): Response => {
    try {
      const lowerInput = input.toLowerCase();
      
      // Enhanced greeting with more personality
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return {
          text: "👋 <strong>Hello there! I'm Saitej's AI Assistant.</strong><br><br>I'm here to help you learn more about Saitej's expertise, projects, and experience in Generative AI! Feel free to ask me anything about:<br><br>• <strong>Skills & Technologies</strong> - What he knows and how well<br>• <strong>Work Experience</strong> - His roles and achievements<br>• <strong>Projects</strong> - What he's built and how<br>• <strong>AI/ML Concepts</strong> - Explanations of technologies he uses<br>• <strong>Contact Info</strong> - How to reach out<br><br>What would you like to know? 🤔",
          quickActions: ['Skills & Tech', 'Experience', 'Projects', 'AI/ML Concepts', 'Contact Info']
        };
      }

      // Enhanced skills explanation with detailed descriptions
      if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tech') || lowerInput.includes('what is') || lowerInput.includes('explain')) {
        if (lowerInput.includes('llm') || lowerInput.includes('large language model')) {
          return {
            text: "🧠 <strong>Large Language Models (LLMs) - Explained:</strong><br><br><strong>What are LLMs?</strong><br>LLMs are AI models trained on massive amounts of text data that can understand, generate, and work with human language. Think of them as super-smart text processors that can write, analyze, and converse.<br><br><strong>How Saitej uses them:</strong><br>• <strong>GPT-4 Integration</strong> - Building chatbots and content generators<br>• <strong>Custom Fine-tuning</strong> - Adapting models for specific business needs<br>• <strong>RAG Systems</strong> - Combining LLMs with company knowledge bases<br>• <strong>Multi-agent Orchestration</strong> - Coordinating multiple AI agents<br><br><strong>Real Example:</strong> At Chevron, he's using LLMs to automate technical documentation and create intelligent assistants for field engineers.<br><br><strong>Why it's powerful:</strong> LLMs can understand context, generate human-like responses, and learn from examples - making them perfect for customer service, content creation, and knowledge management.",
            quickActions: ['More AI Concepts', 'Projects', 'Experience', 'Skills']
          };
        }
        
        if (lowerInput.includes('gan') || lowerInput.includes('generative adversarial network')) {
          return {
            text: "🎨 <strong>Generative Adversarial Networks (GANs) - Explained:</strong><br><br><strong>What are GANs?</strong><br>GANs are AI systems with two neural networks competing against each other - one creates fake data, the other tries to spot the fake. This competition makes the generator incredibly good at creating realistic content.<br><br><strong>How Saitej uses them:</strong><br>• <strong>Image Generation</strong> - Creating realistic geological imagery for oil exploration<br>• <strong>Data Augmentation</strong> - Generating synthetic data for training models<br>• <strong>Creative Applications</strong> - Art, design, and content generation<br><br><strong>Real Example:</strong> At Chevron, he's building GANs to generate realistic geological formations and reservoir images, helping engineers visualize underground structures without expensive drilling.<br><br><strong>Why it's revolutionary:</strong> GANs can create incredibly realistic images, videos, and data that look completely authentic - perfect for scenarios where you need more data or want to visualize the impossible.",
            quickActions: ['More AI Concepts', 'Projects', 'Experience', 'Skills']
          };
        }
        
        if (lowerInput.includes('rag') || lowerInput.includes('retrieval augmented generation')) {
          return {
            text: "🔍 <strong>Retrieval-Augmented Generation (RAG) - Explained:</strong><br><br><strong>What is RAG?</strong><br>RAG combines the power of LLMs with external knowledge sources. Instead of just generating responses from training data, RAG first searches for relevant information, then generates accurate, up-to-date answers.<br><br><strong>How Saitej uses it:</strong><br>• <strong>Document Search</strong> - Finding relevant information in company databases<br>• <strong>Knowledge Bases</strong> - Building intelligent Q&A systems<br>• <strong>Real-time Information</strong> - Providing current, accurate answers<br>• <strong>Vector Search</strong> - Using semantic similarity to find relevant content<br><br><strong>Real Example:</strong> He built RAG systems that let employees ask questions in plain English and get accurate answers from internal documentation, manuals, and knowledge bases.<br><br><strong>Why it's powerful:</strong> RAG gives you the best of both worlds - the creativity of LLMs with the accuracy of real, up-to-date information. No more outdated or hallucinated responses!",
            quickActions: ['More AI Concepts', 'Projects', 'Experience', 'Skills']
          };
        }
        
        if (lowerInput.includes('mlops') || lowerInput.includes('ml ops')) {
          return {
            text: "⚙️ <strong>MLOps (Machine Learning Operations) - Explained:</strong><br><br><strong>What is MLOps?</strong><br>MLOps is like DevOps for AI/ML - it's the practice of automating and streamlining the entire machine learning lifecycle from development to deployment and monitoring.<br><br><strong>How Saitej uses it:</strong><br>• <strong>Automated Pipelines</strong> - Building CI/CD for ML models<br>• <strong>Model Registry</strong> - Managing different versions of AI models<br>• <strong>Monitoring</strong> - Tracking model performance and detecting drift<br>• <strong>Deployment</strong> - Seamlessly rolling out new models<br>• <strong>Scaling</strong> - Managing models across different environments<br><br><strong>Real Example:</strong> At Chevron, he's using MLflow and Kubeflow to automate the entire process of training, testing, and deploying generative AI models, making it easy to update and improve systems.<br><br><strong>Why it's crucial:</strong> Without MLOps, deploying AI models is like building a house without a foundation - it might work initially, but it's unstable and hard to maintain. MLOps makes AI production-ready and scalable.",
            quickActions: ['More AI Concepts', 'Projects', 'Experience', 'Skills']
          };
        }
        
        if (lowerInput.includes('vector database') || lowerInput.includes('pinecone') || lowerInput.includes('faiss')) {
          return {
            text: "🗄️ <strong>Vector Databases - Explained:</strong><br><br><strong>What are Vector Databases?</strong><br>Vector databases store and search through high-dimensional data (vectors) that represent meaning, not just text. They're perfect for semantic search and finding similar content.<br><br><strong>How Saitej uses them:</strong><br>• <strong>Pinecone</strong> - For production-ready vector search<br>• <strong>FAISS</strong> - For high-performance similarity search<br>• <strong>Weaviate</strong> - For flexible, schema-based search<br>• <strong>Semantic Search</strong> - Finding content by meaning, not just keywords<br><br><strong>Real Example:</strong> He built systems that convert documents into vectors, allowing users to search for information using natural language queries and get semantically relevant results.<br><br><strong>Why it's powerful:</strong> Traditional search finds exact matches, but vector search understands meaning. Ask 'How do I reset my password?' and it finds 'password recovery procedure' even though the words don't match exactly.",
            quickActions: ['More AI Concepts', 'Projects', 'Experience', 'Skills']
          };
        }
        
        // General skills overview
        return {
          text: "🚀 <strong>Saitej's Technical Arsenal - Explained:</strong><br><br><strong>Programming Languages:</strong><br>• <strong>Python</strong> (95%) - His primary language for AI/ML development<br>• <strong>R</strong> (90%) - Statistical analysis and data science<br>• <strong>Java/C++</strong> (85%) - High-performance applications<br>• <strong>JavaScript</strong> (80%) - Web applications and APIs<br><br><strong>AI/ML Frameworks:</strong><br>• <strong>TensorFlow & PyTorch</strong> - Deep learning and neural networks<br>• <strong>HuggingFace</strong> - Pre-trained models and transformers<br>• <strong>Scikit-learn</strong> - Traditional machine learning algorithms<br>• <strong>JAX</strong> - High-performance numerical computing<br><br><strong>Cloud & MLOps:</strong><br>• <strong>AWS SageMaker</strong> - Managed ML platform<br>• <strong>GCP Vertex AI</strong> - Google's AI platform<br>• <strong>Azure ML</strong> - Microsoft's machine learning service<br>• <strong>MLflow & Kubeflow</strong> - MLOps and model management<br><br><strong>Specialized Tools:</strong><br>• <strong>LangChain</strong> - Building AI applications<br>• <strong>Pinecone/FAISS</strong> - Vector search and similarity<br>• <strong>Streamlit/FastAPI</strong> - Building user interfaces and APIs<br><br><strong>What makes him unique:</strong> He combines cutting-edge AI research with practical, production-ready implementations across multiple industries!",
          quickActions: ['Specific Technologies', 'Projects', 'Experience', 'Contact']
        };
      }

      // Enhanced project explanations
      if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('built') || lowerInput.includes('created')) {
        if (lowerInput.includes('chatbot') || lowerInput.includes('genai')) {
          return {
            text: "🤖 <strong>GenAI Chatbot Project - Deep Dive:</strong><br><br><strong>What he built:</strong><br>A sophisticated AI chatbot using LangChain + OpenAI + FAISS that can answer customer questions by searching through company documentation.<br><br><strong>How it works:</strong><br>1. <strong>Document Ingestion</strong> - PDFs and manuals are processed and converted to vectors<br>2. <strong>Semantic Search</strong> - When someone asks a question, it finds relevant content<br>3. <strong>LLM Generation</strong> - Uses GPT to create natural, helpful responses<br>4. <strong>Fallback Handling</strong> - If it's unsure, it asks clarifying questions<br><br><strong>Technologies used:</strong><br>• LangChain for orchestration<br>• OpenAI GPT-4 for generation<br>• FAISS for vector search<br>• Azure Functions for hosting<br>• Microsoft Graph API for integration<br><br><strong>Results:</strong><br>• 35% reduction in customer response time<br>• 20% increase in customer satisfaction<br>• 24/7 availability<br>• Consistent, accurate responses<br><br><strong>Why it's impressive:</strong> This isn't just a simple chatbot - it's a production-ready system that actually understands company knowledge and provides real value to customers!",
            quickActions: ['More Projects', 'Technologies', 'Experience', 'Contact']
          };
        }
        
        if (lowerInput.includes('rag') || lowerInput.includes('pipeline')) {
          return {
            text: "🔗 <strong>RAG Pipeline Project - Deep Dive:</strong><br><br><strong>What he built:</strong><br>A complete Retrieval-Augmented Generation system for news summarization using GPT-4, LangChain agents, and Weaviate vector database.<br><br><strong>How it works:</strong><br>1. <strong>Content Ingestion</strong> - News articles are processed and chunked<br>2. <strong>Vector Embedding</strong> - Content is converted to searchable vectors<br>3. <strong>Multi-Agent Processing</strong> - Different AI agents handle different tasks<br>4. <strong>Memory Management</strong> - Context is maintained across conversations<br>5. <strong>Intelligent Summarization</strong> - GPT-4 creates concise, accurate summaries<br><br><strong>Technologies used:</strong><br>• GPT-4 for generation<br>• LangChain for agent orchestration<br>• Weaviate for vector storage<br>• Multi-agent architecture<br>• Memory-enabled conversations<br><br><strong>Results:</strong><br>• Streamlined editorial processes<br>• Automated content summarization<br>• Intelligent content discovery<br>• Scalable architecture<br><br><strong>Why it's impressive:</strong> This system doesn't just summarize text - it understands context, maintains memory, and uses multiple AI agents working together like a well-oiled machine!",
            quickActions: ['More Projects', 'Technologies', 'Experience', 'Contact']
          };
        }
        
        return {
          text: "🚀 <strong>Saitej's Project Portfolio - Overview:</strong><br><br><strong>AI/ML Projects:</strong><br>• <strong>GenAI Chatbot</strong> - Customer support system with 35% response time improvement<br>• <strong>RAG Pipeline</strong> - News summarization with multi-agent architecture<br>• <strong>ML Pipeline Automation</strong> - End-to-end MLOps workflows<br>• <strong>Real-time LLM App</strong> - Document search with vector databases<br><br><strong>Data Science Projects:</strong><br>• <strong>Sales Forecasting</strong> - Time series models with 18% accuracy improvement<br>• <strong>HR Analytics</strong> - Attrition prediction using XGBoost and SHAP<br>• <strong>Fraud Detection</strong> - ML models for financial security<br>• <strong>Drug Discovery</strong> - Pharmaceutical research using GANs and VAEs<br><br><strong>What makes his projects special:</strong><br>• <strong>Production-Ready</strong> - Not just prototypes, but systems that actually work<br>• <strong>Measurable Impact</strong> - Real business metrics and improvements<br>• <strong>Cutting-Edge Tech</strong> - Uses the latest AI/ML technologies<br>• <strong>Cross-Industry</strong> - Experience in energy, finance, healthcare, and tech<br><br><strong>Want to dive deeper?</strong> Ask me about any specific project or technology!",
          quickActions: ['Specific Projects', 'Technologies', 'Experience', 'Contact']
        };
      }

      // Enhanced experience explanations
      if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('role')) {
        if (lowerInput.includes('chevron') || lowerInput.includes('energy')) {
      return {
            text: "⛽ <strong>Chevron Corporation - Generative AI Engineer (Current):</strong><br><br><strong>What he does:</strong><br>Saitej is at the forefront of AI innovation in the energy sector, building cutting-edge generative AI solutions that help Chevron explore, produce, and manage energy resources more efficiently.<br><br><strong>Key Projects:</strong><br>• <strong>Geological AI</strong> - Using GANs to generate realistic underground formations<br>• <strong>Document Automation</strong> - LLMs that understand technical engineering documents<br>• <strong>Field Support</strong> - AI assistants for engineers working in remote locations<br>• <strong>Predictive Analytics</strong> - Forecasting energy production and demand<br><br><strong>Technologies Used:</strong><br>• Large Language Models (LLMs)<br>• Generative Adversarial Networks (GANs)<br>• Variational Autoencoders (VAEs)<br>• Stable Diffusion for image generation<br>• MLOps with Kubeflow and MLflow<br>• Cloud-native AI on AWS and GCP<br><br><strong>Why it's exciting:</strong><br>Energy is one of the most complex and important industries, and AI is revolutionizing how we understand and manage it. Saitej is building the future of intelligent energy systems!",
            quickActions: ['Other Roles', 'Projects', 'Skills', 'Contact']
      };
    }
    
        if (lowerInput.includes('comerica') || lowerInput.includes('finance') || lowerInput.includes('banking')) {
      return {
            text: "🏦 <strong>Comerica Incorporated - Machine Learning Engineer:</strong><br><br><strong>What he did:</strong><br>Built sophisticated ML systems that help Comerica make better financial decisions, detect fraud, and serve customers more effectively.<br><br><strong>Key Projects:</strong><br>• <strong>Credit Risk Modeling</strong> - Predicting customer creditworthiness<br>• <strong>Fraud Detection</strong> - Real-time monitoring of suspicious transactions<br>• <strong>Document Processing</strong> - NLP for intelligent document analysis<br>• <strong>Customer Analytics</strong> - Understanding customer behavior and needs<br><br><strong>Technologies Used:</strong><br>• Python and Scikit-learn for ML models<br>• Apache Spark for big data processing<br>• TensorFlow and PyTorch for deep learning<br>• NLP and transformers for text analysis<br>• MLOps and CI/CD pipelines<br>• Kubernetes and Docker for deployment<br><br><strong>Impact:</strong><br>• Improved loan approval accuracy<br>• Enhanced fraud detection capabilities<br>• Streamlined customer processes<br>• Better risk management<br><br><strong>Why it matters:</strong><br>Financial services affect everyone, and better AI means better financial decisions, lower fraud, and improved customer experiences!",
            quickActions: ['Other Roles', 'Projects', 'Skills', 'Contact']
      };
    }
    
      return {
          text: "💼 <strong>Saitej's Professional Journey - Overview:</strong><br><br><strong>Current Role:</strong><br>• <strong>Chevron Corporation</strong> - Generative AI Engineer (April 2025 - Present)<br>• Building AI solutions for energy exploration and production<br>• Using cutting-edge technologies like LLMs, GANs, and VAEs<br><br><strong>Previous Experience:</strong><br>• <strong>Comerica Incorporated</strong> - Machine Learning Engineer (April 2024 - March 2025)<br>• <strong>Citibank India (Wipro)</strong> - Data Scientist (April 2022 - July 2023)<br>• <strong>Aurobindo Pharma Limited</strong> - Data Scientist (June 2020 - March 2022)<br><br><strong>Career Progression:</strong><br>• Started in pharmaceutical research and drug discovery<br>• Moved to financial services and risk modeling<br>• Now leading AI innovation in the energy sector<br>• Consistent focus on AI/ML and data science<br><br><strong>What makes his journey special:</strong><br>• <strong>Diverse Industries</strong> - Healthcare, finance, and energy<br>• <strong>Rapid Advancement</strong> - Moving from Data Scientist to Generative AI Engineer<br>• <strong>Cutting-Edge Tech</strong> - Always working with the latest AI technologies<br>• <strong>Real Impact</strong> - Building systems that actually improve business operations<br><br><strong>Want to know more?</strong> Ask me about any specific role or project!",
          quickActions: ['Specific Roles', 'Projects', 'Skills', 'Contact']
      };
    }
    
      // Enhanced AI/ML concept explanations
      if (lowerInput.includes('ai') || lowerInput.includes('machine learning') || lowerInput.includes('ml') || lowerInput.includes('artificial intelligence')) {
      return {
          text: "🤖 <strong>AI & Machine Learning - Comprehensive Guide:</strong><br><br><strong>What is AI/ML?</strong><br>Artificial Intelligence is the broader field of creating systems that can perform tasks requiring human intelligence. Machine Learning is a subset that focuses on algorithms that learn from data.<br><br><strong>Key Areas Saitej Specializes In:</strong><br><br><strong>1. Generative AI:</strong><br>• <strong>LLMs</strong> - Large Language Models that understand and generate text<br>• <strong>GANs</strong> - Generative Adversarial Networks for creating realistic content<br>• <strong>VAEs</strong> - Variational Autoencoders for data generation<br>• <strong>Stable Diffusion</strong> - Advanced image generation models<br><br><strong>2. Natural Language Processing (NLP):</strong><br>• <strong>Transformers</strong> - Architecture behind modern language models<br>• <strong>BERT</strong> - Bidirectional understanding of text<br>• <strong>GPT Models</strong> - Generative pre-trained transformers<br>• <strong>Semantic Search</strong> - Finding meaning, not just keywords<br><br><strong>3. Deep Learning:</strong><br>• <strong>Neural Networks</strong> - Brain-inspired computing systems<br>• <strong>Computer Vision</strong> - Teaching computers to see and understand images<br>• <strong>Reinforcement Learning</strong> - Learning through trial and error<br>• <strong>Transfer Learning</strong> - Applying knowledge from one task to another<br><br><strong>4. MLOps & Production:</strong><br>• <strong>Model Deployment</strong> - Getting AI models into real-world use<br>• <strong>Monitoring</strong> - Tracking model performance over time<br>• <strong>Scaling</strong> - Making AI systems work for millions of users<br>• <strong>Ethics & Safety</strong> - Ensuring AI systems are responsible<br><br><strong>Why it's revolutionary:</strong><br>AI is transforming every industry - from healthcare to finance to energy. It's not just about automation; it's about augmenting human capabilities and solving problems we couldn't solve before.<br><br><strong>Saitej's expertise:</strong><br>He's not just using AI tools - he's building the systems that others will use, pushing the boundaries of what's possible in enterprise AI!",
          quickActions: ['Specific AI Concepts', 'Projects', 'Experience', 'Skills']
      };
    }
    
      // Enhanced contact information
      if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach') || lowerInput.includes('connect')) {
      return {
          text: "📞 <strong>Get in Touch with Saitej:</strong><br><br><strong>Primary Contact:</strong><br>• <strong>Email:</strong> Bodapatisaitej@gmail.com<br>• <strong>Phone:</strong> +1-862-214-0815<br>• <strong>Location:</strong> Houston, Texas, USA<br><br><strong>Professional Profiles:</strong><br>• <strong>LinkedIn:</strong> linkedin.com/in/tejchowdary<br>• <strong>GitHub:</strong> github.com/saitejchowdary<br><br><strong>What Saitej is excited to discuss:</strong><br>• <strong>New AI/ML Opportunities</strong> - Always open to exciting new challenges<br>• <strong>Collaborations</strong> - Research partnerships and joint projects<br>• <strong>AI Consulting</strong> - Helping companies implement AI solutions<br>• <strong>Speaking Engagements</strong> - Sharing knowledge about Generative AI<br>• <strong>Mentorship</strong> - Helping others learn AI/ML<br><br><strong>Response Time:</strong><br>• <strong>Professional inquiries:</strong> Within 24 hours<br>• <strong>Collaboration requests:</strong> Within 48 hours<br>• <strong>General questions:</strong> Within a week<br><br><strong>Best ways to reach out:</strong><br>1. <strong>Email</strong> - For detailed discussions and opportunities<br>2. <strong>LinkedIn</strong> - For professional networking<br>3. <strong>GitHub</strong> - For technical collaborations<br><br><strong>Pro tip:</strong> Mention something specific from his portfolio or experience to show you've done your research! 🚀",
        quickActions: ['Download Resume', 'View GitHub', 'Skills', 'Projects']
      };
    }
    
    // Location
      if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('based') || lowerInput.includes('area')) {
      return {
          text: "📍 **Location & Availability:**\n\n**Current Location:** Houston, Texas, USA\n**Work Preferences:**\n• Remote-first opportunities\n• Hybrid work arrangements\n• Willing to relocate for exciting roles\n• Open to international opportunities\n• Energy sector focus\n\n**Time Zone:** Central Time (CT)\n**Availability:** Open to new opportunities",
        quickActions: ['Contact', 'Experience', 'Skills', 'Projects']
      };
    }
    
    // AI/ML specific
      if (lowerInput.includes('ai') || lowerInput.includes('machine learning') || lowerInput.includes('ml') || lowerInput.includes('artificial intelligence')) {
      return {
        text: "🤖 <strong>AI & Machine Learning Expertise:</strong><br><br><strong>Specializations:</strong><br>• Large Language Models (LLMs) and GPT-4<br>• Retrieval-Augmented Generation (RAG)<br>• Vector Search and Embeddings<br>• Multi-Agent Orchestration<br>• Prompt Engineering and Agent Behavior Testing<br>• Real-time Inference and MLOps<br><br><strong>Recent AI Projects:</strong><br>• GenAI chatbot with 35% response time reduction<br>• RAG applications using LangChain + OpenAI + Pinecone<br>• Multi-agent chains with fallback strategies<br>• News summarization using GPT-4 and Weaviate<br>• Real-time LLM apps with vector search<br><br><strong>Frameworks & Tools:</strong><br>LangChain, OpenAI, HuggingFace, Vertex AI, TensorFlow, PyTorch, FAISS, Pinecone, Weaviate",
        quickActions: ['Projects', 'Experience', 'Skills', 'Contact']
      };
    }
    
    // Data engineering
      if (lowerInput.includes('data') || lowerInput.includes('etl') || lowerInput.includes('pipeline') || lowerInput.includes('warehouse')) {
      return {
        text: "📊 <strong>Data Engineering Mastery:</strong><br><br><strong>Core Competencies:</strong><br>• ETL/ELT Pipeline Development<br>• Real-time Data Processing<br>• Big Data Architecture<br>• Vector Database Management<br>• Cloud Data Solutions<br>• MLOps and CI/CD Automation<br><br><strong>Technologies:</strong><br>• <strong>Big Data:</strong> Apache Spark, PySpark, Snowflake, BigQuery<br>• <strong>Databases:</strong> PostgreSQL, SQL Server, ChromaDB<br>• <strong>Cloud:</strong> AWS (S3, Lambda, SageMaker), GCP (BigQuery, Vertex AI, Dataflow), Azure (ML Studio, Functions)<br>• <strong>Orchestration:</strong> Airflow, GitHub Actions, Jenkins<br>• <strong>Monitoring:</strong> MLflow, Terraform<br><br><strong>Recent Achievements:</strong><br>• Built scalable ML pipelines on AWS Lambda and SageMaker<br>• Designed PySpark + GCP Dataflow ETL pipelines<br>• Automated CI/CD workflows with GitHub Actions and Airflow",
        quickActions: ['Experience', 'Projects', 'Skills', 'Contact']
      };
    }

    // GitHub
      if (lowerInput.includes('github') || lowerInput.includes('code') || lowerInput.includes('repository')) {
      return {
        text: "💻 <strong>GitHub & Open Source:</strong><br><br><strong>GitHub Profile:</strong> github.com/saitejchowdary<br><br><strong>Featured Repositories:</strong><br>• <strong>GenAI-Chatbot:</strong> LangChain + OpenAI + FAISS customer support system<br>• <strong>RAG-Pipeline:</strong> News summarization with GPT-4 and Weaviate<br>• <strong>ML-Pipeline-Automation:</strong> MLflow with Vertex AI and SageMaker<br>• <strong>Sales-Forecasting:</strong> Facebook Prophet models for demand prediction<br>• <strong>Portfolio-Website:</strong> This interactive website (open source!)<br><br><strong>Open Source Contributions:</strong><br>• Active contributor to data science and ML communities<br>• Maintained production-ready AI/ML pipelines<br>• Shared knowledge through technical blogs and tutorials<br><br><strong>Coding Philosophy:</strong> Production-ready, scalable, and well-documented AI/ML solutions!",
        quickActions: ['Projects', 'Skills', 'Contact', 'Resume']
      };
    }

    // Resume
      if (lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('download')) {
      return {
          text: "📄 <strong>Resume & Portfolio:</strong><br><br><strong>Resume:</strong> Available for download in PDF format<br><strong>Portfolio:</strong> This interactive website showcases Saitej's work<br><br><strong>Key Highlights:</strong><br>• 4.5+ years of AI & Data Science engineering experience<br>• Master's degree in Data Science from NJIT<br>• Expertise in LLMs, GANs, RAG, and vector search<br>• Production experience with AWS, GCP, and Azure<br>• Strong background in MLOps and CI/CD automation<br>• Multiple successful AI/ML projects with measurable impact",
        quickActions: ['Download Resume', 'Projects', 'Experience', 'Contact']
      };
    }
    
    // Default response with context awareness
      return {
        text: "I'm here to help you learn more about Saitej! Here are some popular topics:\n\n• **Skills & Technologies** - Programming languages, AI/ML frameworks, cloud platforms\n• **Work Experience** - Professional background at Chevron, Comerica, Citibank, and Aurobindo\n• **Projects** - GenAI chatbots, RAG pipelines, ML automation, forecasting models\n• **Education** - M.S. Data Science from NJIT, B.Tech from GITAM University\n• **Contact Info** - How to reach out and connect\n\nWhat interests you most? 🤔",
        quickActions: ['Skills & Tech', 'Experience', 'Projects', 'Contact Info']
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        text: "I apologize, but I encountered an error while processing your request. Please try again later or rephrase your question.",
        quickActions: ['Retry', 'Contact Info']
      };
    }
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
      // Strip HTML tags when copying to clipboard
      const plainText = text.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(plainText);
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
    link.download = 'Saitej_Deep_Kumar_Bodapati_Resume.pdf';
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
    window.open('mailto:Bodapatisaitej@gmail.com', '_blank');
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
                            <div 
                              className="text-sm" 
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-70">
                                {message.timestamp instanceof Date ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
