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
      title: 'Advanced Deep Learning Models',
      description: 'Comparative analysis of CNN, VGG16, and InceptionV3 for fruit image classification. Achieved 94% accuracy with InceptionV3 using transfer learning techniques.',
      outcome: 'Improved classification accuracy by 12% over baseline models',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning', 'InceptionV3'],
      category: 'ai',
      github: 'https://github.com/saitej-bodapati/deep-learning-models',
      live: 'https://github.com/saitej-bodapati/deep-learning-models',
      featured: true
    },
    {
      id: 2,
      title: 'Marketing Optimization ML',
      description: 'Predictive modeling for term deposit campaigns using XGBoost, achieving 85% AUC-ROC and 82% recall. Handled imbalanced datasets with comprehensive EDA.',
      outcome: 'Increased campaign conversion rate by 23%',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'Pandas'],
      category: 'ai',
      github: 'https://github.com/saitej-bodapati/marketing-optimization',
      live: 'https://github.com/saitej-bodapati/marketing-optimization',
      featured: true
    },
    {
      id: 3,
      title: 'Cloud-Based Distributed ML',
      description: 'Distributed machine learning pipeline on AWS using EMR, Spark, and S3. Containerized application with Docker for scalable deployment across EC2 instances.',
      outcome: 'Reduced processing time by 65% and costs by 40%',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['AWS EMR', 'PySpark', 'Docker', 'EC2', 'S3'],
      category: 'fullstack',
      github: 'https://github.com/saitej-bodapati/distributed-ml',
      live: 'https://github.com/saitej-bodapati/distributed-ml',
      featured: true
    },
    {
      id: 4,
      title: 'Wine Quality Classification',
      description: 'Logistic regression model for wine quality classification with comprehensive preprocessing, feature standardization, and robust evaluation metrics.',
      outcome: 'Achieved 89% accuracy in quality prediction',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Python', 'Scikit-learn', 'Logistic Regression', 'Pandas', 'NumPy'],
      category: 'data',
      github: 'https://github.com/saitej-bodapati/wine-classification',
      live: 'https://github.com/saitej-bodapati/wine-classification',
      featured: false
    },
    {
      id: 5,
      title: 'Customer Churn Prediction',
      description: 'XGBoost and Neural Network models for customer churn prediction with 87% recall and 0.91 AUC. Built on PySpark pipeline processing 8M+ records.',
      outcome: 'Reduced customer churn by 15% through early intervention',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['PySpark', 'XGBoost', 'Neural Networks', 'AWS EMR', 'MLflow'],
      category: 'ai',
      github: 'https://github.com/saitej-bodapati/churn-prediction',
      live: null,
      featured: false
    },
    {
      id: 6,
      title: 'Interview Scheduling Platform',
      description: 'Backend development using Java Spring Boot, MySQL, and AWS. Improved scheduling speed by 50% and reduced manual coordination overhead.',
      outcome: 'Improved scheduling efficiency by 50%',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'REST APIs'],
      category: 'fullstack',
      github: 'https://github.com/saitej-bodapati/scheduling-platform',
      live: 'https://github.com/saitej-bodapati/scheduling-platform',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'data', name: 'Data Analytics', count: projects.filter(p => p.category === 'data').length },
    { id: 'mobile', name: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'blockchain', name: 'Blockchain', count: projects.filter(p => p.category === 'blockchain').length }
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
