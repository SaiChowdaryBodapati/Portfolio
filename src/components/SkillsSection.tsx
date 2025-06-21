import { useState, useEffect, useRef } from 'react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [brokenBricks, setBrokenBricks] = useState<number[]>([]);
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

  const skills = [
    // Big Data & Pipelines
    { name: 'PySpark', icon: '⚡', category: 'Big Data', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'Hadoop', icon: '🐘', category: 'Big Data', level: 85, color: 'from-yellow-500 to-orange-500' },
    { name: 'AWS EMR', icon: '☁️', category: 'Cloud', level: 90, color: 'from-blue-500 to-purple-500' },
    { name: 'Airflow', icon: '🌪️', category: 'Big Data', level: 80, color: 'from-green-500 to-blue-500' },
    
    // Cloud & DevOps
    { name: 'AWS', icon: '☁️', category: 'Cloud', level: 90, color: 'from-orange-500 to-yellow-500' },
    { name: 'Docker', icon: '🐳', category: 'DevOps', level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Git', icon: '📚', category: 'DevOps', level: 90, color: 'from-red-500 to-orange-500' },
    { name: 'Terraform', icon: '🏗️', category: 'DevOps', level: 75, color: 'from-purple-500 to-pink-500' },
    
    // Programming & Scripting
    { name: 'Python', icon: '🐍', category: 'Programming', level: 95, color: 'from-blue-500 to-yellow-500' },
    { name: 'Java', icon: '☕', category: 'Programming', level: 85, color: 'from-red-500 to-orange-500' },
    { name: 'SQL', icon: '🗄️', category: 'Database', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'Bash', icon: '💻', category: 'Scripting', level: 80, color: 'from-green-500 to-blue-500' },
    
    // Databases & Storage
    { name: 'PostgreSQL', icon: '🐘', category: 'Database', level: 85, color: 'from-blue-500 to-purple-500' },
    { name: 'MySQL', icon: '🐬', category: 'Database', level: 90, color: 'from-blue-500 to-orange-500' },
    { name: 'Redshift', icon: '🔴', category: 'Database', level: 80, color: 'from-red-500 to-orange-500' },
    { name: 'SAP HANA', icon: '🏢', category: 'Database', level: 75, color: 'from-blue-500 to-green-500' },
    
    // ML & Data Science
    { name: 'Scikit-learn', icon: '🔬', category: 'ML', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'XGBoost', icon: '🚀', category: 'ML', level: 90, color: 'from-green-500 to-blue-500' },
    { name: 'TensorFlow', icon: '🧠', category: 'ML', level: 80, color: 'from-orange-500 to-red-500' },
    { name: 'SHAP', icon: '📊', category: 'ML', level: 85, color: 'from-purple-500 to-pink-500' },
    { name: 'MLflow', icon: '📈', category: 'ML', level: 80, color: 'from-blue-500 to-purple-500' },
    
    // Reporting & Visualization
    { name: 'Power BI', icon: '📊', category: 'Visualization', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'Tableau', icon: '📈', category: 'Visualization', level: 75, color: 'from-blue-500 to-purple-500' },
    { name: 'Streamlit', icon: '🎨', category: 'Visualization', level: 85, color: 'from-red-500 to-pink-500' },
    
    // Tools & Platforms
    { name: 'JIRA', icon: '📋', category: 'Tools', level: 85, color: 'from-blue-500 to-purple-500' },
    { name: 'Confluence', icon: '📖', category: 'Tools', level: 80, color: 'from-blue-500 to-cyan-500' },
    { name: 'SAP', icon: '🏢', category: 'Tools', level: 80, color: 'from-blue-500 to-green-500' }
  ];

  const categories = [
    { name: 'All', icon: '🌟' },
    { name: 'Big Data', icon: '⚡' },
    { name: 'Cloud', icon: '☁️' },
    { name: 'DevOps', icon: '⚙️' },
    { name: 'Programming', icon: '💻' },
    { name: 'Database', icon: '🗄️' },
    { name: 'ML', icon: '🤖' },
    { name: 'Visualization', icon: '📊' }
  ];

  const [filter, setFilter] = useState('All');

  const filteredSkills = filter === 'All' ? skills : skills.filter(skill => skill.category === filter);

  const handleBrickClick = (index: number) => {
    if (!brokenBricks.includes(index)) {
      setBrokenBricks([...brokenBricks, index]);
      
      // Reform the brick after 2 seconds
      setTimeout(() => {
        setBrokenBricks(prev => prev.filter(i => i !== index));
      }, 2000);
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border border-gray-600"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-4 text-white transition-all duration-300 hover:scale-110 hover:text-purple-400 cursor-pointer">
            SKILL <span className="text-gradient">MASTERY</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8">My technical arsenal and power levels</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>
        
        <div className="bg-gray-800 p-2 rounded-xl md:rounded-full flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setFilter(category.name)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center flex flex-col items-center justify-center border-2 border-transparent transition-all duration-300 hover:border-blue-500 hover:scale-105 transform ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`bg-gradient-to-r ${skill.color} h-2.5 rounded-full`} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
