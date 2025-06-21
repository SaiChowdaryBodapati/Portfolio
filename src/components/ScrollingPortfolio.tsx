
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGame } from '@/contexts/GameContext';
import GameHUD from './GameHUD';
import GameBackground from './GameBackground';
import GameCursor from './GameCursor';

const ScrollingPortfolio = () => {
  const { addScore } = useGame();
  const [activeSection, setActiveSection] = useState('hero');

  // Section refs for scroll detection
  const [heroRef, heroInView] = useInView({ threshold: 0.6 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.6 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.6 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.6 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.6 });
  const [educationRef, educationInView] = useInView({ threshold: 0.6 });
  const [contactRef, contactInView] = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (aboutInView) setActiveSection('about');
    else if (skillsInView) setActiveSection('skills');
    else if (experienceInView) setActiveSection('experience');
    else if (projectsInView) setActiveSection('projects');
    else if (educationInView) setActiveSection('education');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, aboutInView, skillsInView, experienceInView, projectsInView, educationInView, contactInView]);

  const skills = [
    { name: 'Python', icon: '🐍', category: 'Programming', points: 15 },
    { name: 'AWS', icon: '☁️', category: 'Cloud', points: 20 },
    { name: 'Machine Learning', icon: '🤖', category: 'AI/ML', points: 25 },
    { name: 'PySpark', icon: '⚡', category: 'Big Data', points: 20 },
    { name: 'Power BI', icon: '📊', category: 'Analytics', points: 15 },
    { name: 'Java', icon: '☕', category: 'Programming', points: 15 },
    { name: 'SQL', icon: '🗄️', category: 'Database', points: 15 },
    { name: 'Docker', icon: '🐳', category: 'DevOps', points: 20 },
    { name: 'TensorFlow', icon: '🧠', category: 'AI/ML', points: 25 },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database', points: 15 }
  ];

  const projects = [
    {
      title: 'Advanced Deep Learning Models',
      description: 'CNN, VGG16, and InceptionV3 for fruit classification',
      achievement: '94% accuracy with InceptionV3',
      points: 50,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Marketing Optimization ML',
      description: 'Predictive modeling for term deposit campaigns',
      achievement: '85% AUC-ROC, 82% recall with XGBoost',
      points: 45,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Cloud ML Pipeline',
      description: 'Distributed ML solution on AWS using EMR and Spark',
      achievement: 'Scalable deployment across EC2 instances',
      points: 40,
      color: 'from-green-600 to-blue-600'
    },
    {
      title: 'Wine Quality Classification',
      description: 'Logistic regression with comprehensive preprocessing',
      achievement: 'Advanced feature engineering and validation',
      points: 35,
      color: 'from-red-600 to-orange-600'
    }
  ];

  const handleSkillClick = (skill: typeof skills[0]) => {
    addScore(skill.points);
    // Add visual feedback
    const event = new CustomEvent('skillClicked', { detail: skill });
    window.dispatchEvent(event);
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    addScore(project.points);
    // Add visual feedback
    const event = new CustomEvent('projectClicked', { detail: project });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <GameBackground />
      <GameCursor />
      <GameHUD />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center px-6">
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl relative">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                SC
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-bounce flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white font-mono">
            <span className="text-gradient">SAITEJ</span>{' '}
            <span className="text-blue-400">CHOWDARY</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-2 font-light">
            AI & Data Engineer
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Level 85 • 3+ Years Experience • Master's in Data Science
          </p>

          <div className="flex justify-center gap-8 mb-12 text-sm">
            <div className="text-center bg-black/30 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">LVL 85</div>
              <div className="text-gray-400">Experience</div>
            </div>
            <div className="text-center bg-black/30 rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-gray-400">Projects</div>
            </div>
            <div className="text-center bg-black/30 rounded-lg p-4 border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">99%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
            ABOUT <span className="text-gradient">PLAYER</span>
          </h2>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Artificial Intelligence and Data Engineer with 3+ years of experience in developing scalable ML solutions, 
              backend systems, and analytics pipelines. Skilled in Python, Java, AWS, and Power BI with a strong foundation 
              in machine learning, cloud platforms, and business intelligence.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Proven ability to translate data into actionable insights, build predictive models, and deliver 
              end-to-end AI solutions across cross-functional teams.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
            SKILL <span className="text-gradient">ARSENAL</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                onClick={() => handleSkillClick(skill)}
                className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-4 border-2 border-blue-500/30 hover:border-blue-400/60 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-1">{skill.name}</h3>
                  <p className="text-gray-400 text-xs">{skill.category}</p>
                  <div className="text-green-400 text-xs font-mono mt-1">+{skill.points} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
            GAME <span className="text-gradient">STAGES</span>
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: 'Data Integrator',
                company: 'Intelli Data Systems Pvt Ltd',
                period: 'March 2021 – March 2023',
                level: 'EXPERT LEVEL',
                color: 'from-purple-600 to-pink-600'
              },
              {
                title: 'Software Engineer',
                company: 'WIPRO TECHNOLOGIES',
                period: 'April 2020 - August 2021',
                level: 'ADVANCED LEVEL',
                color: 'from-blue-600 to-cyan-600'
              },
              {
                title: 'Data Science Intern',
                company: 'Nexus AI Labs',
                period: 'Sep 2019 – Jan 2020',
                level: 'INTERMEDIATE LEVEL',
                color: 'from-green-600 to-blue-600'
              }
            ].map((exp, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <div className={`inline-block bg-gradient-to-r ${exp.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                  {exp.level}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-blue-400 font-semibold mb-1">{exp.company}</p>
                <p className="text-gray-400">{exp.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
            PROJECT <span className="text-gradient">SHOWCASE</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/30 cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="text-green-400 font-mono text-sm">+{project.points} XP</div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <p className="text-green-400 text-sm font-semibold">🏆 {project.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
            EDUCATION <span className="text-gradient">TREE</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">M.S Data Science</h3>
              <p className="text-blue-400 font-semibold mb-4">NJIT - Ying Wu College of Computing (2023-2024)</p>
              <p className="text-gray-400">AI, ML, Deep Learning, Big Data, Cloud Computing, Statistics</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">B.Tech ECE</h3>
              <p className="text-blue-400 font-semibold mb-4">Gandhi Institute of Technology (2016-2020)</p>
              <p className="text-gray-400">C, C++, Java, DBMS, Statistics, VLSI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-12 font-mono">
            FINAL <span className="text-gradient">BOSS</span>
          </h2>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <p className="text-2xl text-gray-300 mb-8">Ready to team up for your next project?</p>
            <div className="flex justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110">
                📧 Contact Me
              </button>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110">
                📄 Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollingPortfolio;
