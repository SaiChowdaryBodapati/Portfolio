import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'GenAI Chatbot for Customer Support',
      description: 'Built a LangChain + OpenAI + FAISS-powered AI chatbot to resolve customer FAQs by ingesting PDF/manual content and performing semantic search over vector embeddings.',
      outcome: 'Reduced customer response time by 35% and increased satisfaction by 20%',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['LangChain', 'OpenAI', 'FAISS', 'Azure Functions', 'Microsoft Graph API'],
      category: 'ai',
      github: 'https://github.com/saitejchowdary/genai-chatbot',
      live: 'https://github.com/saitejchowdary/genai-chatbot',
      featured: true
    },
    {
      id: 2,
      title: 'News Summarization & RAG Pipeline',
      description: 'Developed GPT-4-based news summarizer using LangChain agents and Weaviate. Applied chunked embeddings and memory-enabled multi-agent querying.',
      outcome: 'Streamlined editorial processes with automated summarization',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['GPT-4', 'LangChain', 'Weaviate', 'Multi-Agent', 'RAG'],
      category: 'ai',
      github: 'https://github.com/saitejchowdary/news-summarization',
      live: 'https://github.com/saitejchowdary/news-summarization',
      featured: true
    },
    {
      id: 3,
      title: 'ML Model Registry & Pipeline Automation',
      description: 'Automated deployment pipelines using MLflow with Vertex AI and SageMaker. Enabled batch inference scheduling and performance monitoring with Airflow.',
      outcome: 'Implemented comprehensive MLOps workflows with automated model deployment',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['MLflow', 'Vertex AI', 'SageMaker', 'Airflow', 'CI/CD'],
      category: 'mlops',
      github: 'https://github.com/saitejchowdary/ml-pipeline-automation',
      live: 'https://github.com/saitejchowdary/ml-pipeline-automation',
      featured: true
    },
    {
      id: 4,
      title: 'Sales Demand Forecasting',
      description: 'Built seasonality-aware time series models using Facebook Prophet integrated with GCP Vertex AI for retail planning cycles.',
      outcome: 'Improved forecast accuracy by 18% for retail planning',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Facebook Prophet', 'GCP Vertex AI', 'Time Series', 'Python'],
      category: 'data',
      github: 'https://github.com/saitejchowdary/sales-forecasting',
      live: 'https://github.com/saitejchowdary/sales-forecasting',
      featured: false
    },
    {
      id: 5,
      title: 'Real-time LLM App with Vector Search',
      description: 'Developed a Streamlit-based frontend with Pinecone + OpenAI backend for RAG-based document search. Enabled secure upload, embedding, and real-time query resolution.',
      outcome: 'Built for business users with RAG-based document search capabilities',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Streamlit', 'Pinecone', 'OpenAI', 'RAG', 'Vector Search'],
      category: 'ai',
      github: 'https://github.com/saitejchowdary/llm-vector-search',
      live: 'https://github.com/saitejchowdary/llm-vector-search',
      featured: false
    },
    {
      id: 6,
      title: 'HR Analytics ML Pipeline',
      description: 'Built XGBoost + SHAP-based models for attrition and performance predictions. Integrated Power BI dashboards with real-time prediction APIs for CXO-level reporting.',
      outcome: 'Delivered actionable insights for HR decision-making',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['XGBoost', 'SHAP', 'Power BI', 'REST APIs', 'Python'],
      category: 'data',
      github: 'https://github.com/saitejchowdary/hr-analytics',
      live: 'https://github.com/saitejchowdary/hr-analytics',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'data', name: 'Data Analytics', count: projects.filter(p => p.category === 'data').length },
    { id: 'mlops', name: 'MLOps', count: projects.filter(p => p.category === 'mlops').length }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (projectTitle: string) => {
    analytics.trackProjectView(projectTitle);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    analytics.trackEvent({
      event: 'project_filter',
      category: 'engagement',
      action: 'project_filter_changed',
      label: category
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-4 text-white transition-all duration-300 hover:scale-110 hover:text-purple-400 cursor-pointer">
            PROJECT <span className="text-gradient">MISSIONS</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8">Explore my completed missions and ongoing quests</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>
        
        {/* Project filtering */}
        <div className="flex justify-center flex-wrap mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-xl md:rounded-full flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{project.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3 h-16 overflow-hidden">{project.description}</p>
                {project.outcome && (
                  <p className="text-green-400 text-sm mb-4 font-semibold">🎯 {project.outcome}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">{tech}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                    GitHub
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-all duration-300 hover:scale-105">
                      {project.live.includes('github.com') ? 'View Project' : 'Live Demo'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
