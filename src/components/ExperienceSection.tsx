import { useState, useEffect, useRef } from 'react';

const ExperienceSection = () => {
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

  const experiences = [
    {
      title: 'Generative AI Engineer',
      company: 'Chevron Corporation',
      period: 'April 2025 – Present',
      location: 'Houston, Texas, USA',
      description: 'Design, build, and fine-tune generative models (LLMs, GANs, transformers) for energy applications and develop novel AI algorithms for energy-specific challenges.',
      achievements: [
        'Designed and deployed advanced Large Language Models (LLMs), Transformer Architectures, and Retrieval-Augmented Generation (RAG) to automate technical documentation and optimize energy operations',
        'Built scalable Generative Adversarial Networks (GANs), Variational Autoencoders (VAEs), and Stable Diffusion solutions to generate realistic geological imagery for reservoir analysis',
        'Designed Conversational AI, Chatbots, and Intelligent Assistants powered by LLMs to support field engineers with real-time troubleshooting',
        'Implemented Explainable AI (XAI), SHAP, and LIME frameworks to ensure transparency and trust in decision-making processes',
        'Enhanced enterprise workflows using MLOps Pipelines, Kubeflow, and MLflow for seamless generative model training and deployment at scale',
        'Collaborated on Cloud-Native AI Infrastructure (AWS SageMaker, GCP Vertex AI) for scalable and cost-effective generative AI solutions'
      ],
      technologies: ['LLMs', 'RAG', 'GANs', 'VAEs', 'SHAP', 'LIME', 'Chatbots', 'MLOps', 'Kubeflow', 'MLflow', 'AWS SageMaker', 'GCP Vertex AI', 'Python', 'Kubernetes', 'TensorFlow', 'PyTorch'],
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Comerica Incorporated',
      period: 'April 2024 – March 2025',
      location: 'Dallas, Texas, USA',
      description: 'Design, build, and train machine learning models using various algorithms and frameworks to enhance financial decision-making processes.',
      achievements: [
        'Designed and implemented advanced Machine Learning Models using Python and Scikit-learn to predict customer credit risk and enhance fraud detection',
        'Built scalable Data Pipelines with Apache Spark, SQL, and ETL frameworks to process high-volume financial transactions',
        'Applied Natural Language Processing (NLP), Transformers, and Generative AI for intelligent document processing and customer sentiment analysis',
        'Developed and deployed Deep Learning Architectures using TensorFlow and PyTorch to optimize loan approval workflows and automate risk modelling',
        'Leveraged Cloud Platforms with MLOps frameworks to streamline model deployment and monitor model drift',
        'Integrated Kubernetes, Docker, and Microservices with robust CI/CD pipelines for scalable model deployment'
      ],
      technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'SQL', 'ETL', 'NLP', 'TensorFlow', 'PyTorch', 'MLOps', 'Kubernetes', 'Docker', 'Azure ML', 'Azure Data Factory'],
    },
    {
      title: 'Data Scientist',
      company: 'Citibank India (Wipro)',
      period: 'April 2022 – July 2023',
      location: 'Bangalore, India',
      description: 'Design, build, and optimize machine learning algorithms and statistical models to forecast trends, predict market movements, and assess risk.',
      achievements: [
        'Designed and implemented advanced Machine Learning, Deep Learning, and Natural Language Processing (NLP) models for fraud detection and risk scoring',
        'Utilized Python, R, and SQL for data preprocessing, statistical modelling, and algorithm development with high accuracy',
        'Applied Big Data technologies such as Hadoop, Spark, and Hive to process and analyse structured and unstructured financial data',
        'Developed interactive Power BI, Tableau, and Data Visualization dashboards for portfolio management and client segmentation',
        'Implemented Cloud-based AI solutions on Azure and GCP to build scalable machine learning pipelines',
        'Built Generative AI and Large Language Models (LLMs) such as GPT and BERT to automate compliance document analysis'
      ],
      technologies: ['Machine Learning', 'NLP', 'Python', 'R', 'SQL', 'Hadoop', 'Spark', 'Hive', 'Power BI', 'Tableau', 'Azure', 'GCP', 'MLOps', 'LLMs', 'GPT', 'BERT'],
    },
    {
      title: 'Data Scientist',
      company: 'Aurobindo Pharma Limited',
      period: 'June 2020 – March 2022',
      location: 'Bangalore, India',
      description: 'Design, build, and optimize machine learning and statistical models to predict trends, identify potential drug candidates, and forecast trial outcomes.',
      achievements: [
        'Implemented Time Series Forecasting, ARIMA, and LSTM models to predict drug demand and optimize supply chain management',
        'Applied Image Processing, Computer Vision, and CNNs on medical imaging datasets to assist in disease diagnosis',
        'Integrated Big Data frameworks (Hive, Pig, and Spark SQL) for querying and processing large volumes of patient and drug trial data',
        'Designed and deployed Natural Language Processing (NLP, BERT, and Transformers) models to analyse clinical trial reports and research papers',
        'Built Knowledge Graphs, Graph Neural Networks (GNNs), and Neo4j frameworks to map drug-gene interactions',
        'Collaborated with R&D teams to implement Generative AI models (GANs, Variational Autoencoders) for molecular structure simulation'
      ],
      technologies: ['Time Series Forecasting', 'ARIMA', 'LSTM', 'CNNs', 'Hive', 'Pig', 'Spark SQL', 'MLOps', 'NLP', 'BERT', 'GNNs', 'Neo4j', 'Airflow', 'XGBoost', 'GANs'],
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white mb-4 transition-all duration-300 hover:scale-110 hover:text-blue-400 cursor-pointer">WORK EXPERIENCE</h2>
          <p className="text-lg text-gray-400">My professional journey and accomplishments.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`bg-slate-800/50 p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
              <div className="flex items-baseline gap-4 mb-3">
                <p className="text-blue-400 font-semibold">{exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.period}</p>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
