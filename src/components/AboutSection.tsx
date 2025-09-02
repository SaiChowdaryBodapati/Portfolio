import { useState, useEffect, useRef } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const aboutData = {
    subtitle: 'Accomplished Generative AI Engineer with expertise in LLMs, GANs, Transformers, and production-ready AI solutions across energy, finance, and healthcare domains.',
    paragraphs: [
      'I am a dedicated Generative AI Engineer with over 4.5 years of experience building intelligent systems using Large Language Models (LLMs), Generative Adversarial Networks (GANs), and Transformer architectures. I specialize in developing scalable, ethical, and high-performing AI-driven applications for enterprise environments.',
      'My expertise spans across OpenAI APIs, Azure AI, Microsoft Graph API, and MLOps workflows across AWS, GCP, and Azure. I have strong experience in multi-agent orchestration, real-time inference using FastAPI and Streamlit, and CI/CD automation with focus on energy operations, financial services, and pharmaceutical research.',
      'Throughout my career, I have worked on diverse projects ranging from GenAI chatbots and RAG systems to large-scale ML pipeline development. I enjoy collaborating with cross-functional teams and translating business requirements into scalable AI solutions with emphasis on explainable AI and ethical compliance.'
    ],
    personalInfo: [
      { label: 'Name', value: 'Saitej Deep Kumar Bodapati' },
      { label: 'Email', value: 'Bodapatisaitej@gmail.com' },
      { label: 'Phone', value: '+1-862-214-0815' },
      { label: 'Location', value: 'Houston, Texas, USA' },
      { label: 'Experience', value: '4.5+ Years' },
      { label: 'Availability', value: 'Open to Opportunities' }
    ],
    expertise: [
      {
        title: 'Generative AI & LLMs',
        description: 'LLMs, LHMs, Transformers, GANs, VAEs, Stable Diffusion, RAG systems, vector search, and multi-agent orchestration with RLHF.',
        icon: '🤖',
        color: 'from-blue-500 to-purple-500'
      },
      {
        title: 'MLOps & Data Engineering',
        description: 'ETL/ELT pipelines, vector databases (Pinecone, Weaviate, FAISS), MLOps workflows, Kubeflow, MLflow, and production deployments.',
        icon: '⚡',
        color: 'from-green-500 to-blue-500'
      },
      {
        title: 'Cloud & DevOps',
        description: 'AWS SageMaker, GCP Vertex AI, Azure ML, Docker, Kubernetes, CI/CD, Terraform, and infrastructure automation.',
        icon: '☁️',
        color: 'from-orange-500 to-red-500'
      },
      {
        title: 'AI Applications',
        description: 'FastAPI, Streamlit, real-time inference, prompt engineering, XAI frameworks (SHAP, LIME), and agent behavior testing.',
        icon: '💻',
        color: 'from-purple-500 to-pink-500'
      }
    ]
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
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
          <h2 className="text-5xl font-bold mb-4 text-white transition-all duration-300 hover:scale-110 hover:text-blue-400 cursor-pointer">
            MY <span className="text-gradient">JOURNEY</span>
          </h2>
          <p className="text-gray-300 text-xl mb-8">{aboutData.subtitle}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main About Content */}
          <div className={`bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 mb-12 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Who I Am</h3>
            <div className="space-y-6 text-lg leading-relaxed">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Personal Info */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-500 cursor-pointer">
                <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  {aboutData.personalInfo.map((info, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-slate-700 last:border-b-0 transition-all duration-300 hover:bg-slate-800/50 hover:px-2 rounded-lg">
                      <span className="font-medium text-slate-400">{info.label}:</span>
                      <span className="text-white font-semibold">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Expertise */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
              <div className="space-y-4">
                {aboutData.expertise.map((expertise, index) => (
                  <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-slate-700 hover:shadow-lg hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${expertise.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                        {expertise.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{expertise.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{expertise.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
