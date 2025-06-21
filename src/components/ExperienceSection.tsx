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
      title: 'Data Integrator',
      company: 'Intelli Data Systems Pvt Ltd',
      period: 'March 2021 – March 2023',
      location: 'Hyderabad, India',
      description: 'Led data integration initiatives across clinical and supply chain datasets, working with structured and unstructured sources including Excel, PDFs, SAP exports, and SQL databases.',
      achievements: [
        'Created machine learning–ready datasets by automating ETL pipelines and designed Power BI dashboards',
        'Streamlined data for analytical models using Python and SQL, improving data consistency by 98%',
        'Applied metadata tagging and ontology mapping for data governance across product development lifecycle',
        'Built automated validation scripts for data quality checks and schema validation',
        'Designed Excel-based data summaries and transitioned to Power BI for automated stakeholder dashboards'
      ],
      technologies: ['Python', 'SQL', 'Power BI', 'SAP', 'ETL Pipelines', 'Data Governance'],
    },
    {
      title: 'Backend Developer',
      company: 'Wipro Technologies',
      period: 'April 2020 - August 2021',
      location: 'Bangalore, India',
      description: 'Led backend development of internal interview scheduling platform using Java Spring Boot, MySQL, and AWS, resulting in 50% improvement in scheduling speed.',
      achievements: [
        'Developed and integrated REST APIs to streamline data communication between services',
        'Integrated SAP modules to retrieve employee onboarding data and map with internal HR applications',
        'Built automation scripts using Python and SAP BAPI/RFC APIs to reduce data pull latency',
        'Created Power BI dashboards for HR analytics by connecting SAP exports and MySQL views',
        'Participated in cloud infrastructure design and provisioned AWS resources (S3, EC2, Lambda)'
      ],
      technologies: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'REST APIs', 'SAP', 'Power BI'],
    },
    {
      title: 'Data Science Intern',
      company: 'Nexus AI Labs',
      period: 'September 2019 – January 2020',
      location: 'Remote',
      description: 'Built PySpark-based data pipeline on AWS EMR to process over 8 million e-commerce records for customer churn prediction.',
      achievements: [
        'Developed XGBoost and Neural Network models to predict customer churn (Recall = 87%, AUC = 0.91)',
        'Automated model retraining with Airflow and containerized the stack with Docker',
        'Created real-time monitoring dashboards in Streamlit deployed on EC2',
        'Used SHAP for model interpretability and validated outcomes with A/B testing',
        'Tracked experiments using MLflow for reproducible machine learning workflows'
      ],
      technologies: ['PySpark', 'AWS EMR', 'XGBoost', 'Neural Networks', 'Docker', 'Streamlit', 'MLflow'],
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
