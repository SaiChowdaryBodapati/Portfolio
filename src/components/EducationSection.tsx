import { useState, useEffect, useRef } from 'react';

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
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

  const education = [
    {
      degree: 'M.S Data Science',
      institution: 'NJIT - Ying Wu College of Computing',
      period: '2023 - 2024',
      location: 'New Jersey, USA',
      description: 'Master of Science in Data Science with focus on Artificial Intelligence and Machine Learning',
      courses: [
        'Artificial Intelligence',
        'Machine Learning', 
        'Reinforcement Learning',
        'Big Data',
        'Cloud Computing',
        'Deep Learning',
        'Statistics Methods in Data Science',
        'Statistics',
        'Python & Mathematics',
        'Database Management System'
      ],
      achievements: [
        'Specialized in AI/ML algorithms and data processing',
        'Hands-on experience with cloud platforms and big data technologies',
        'Strong foundation in statistical analysis and mathematical modeling'
      ],
      category: 'Graduate',
      icon: '🎓',
      color: 'from-blue-600 to-purple-600'
    },
    {
      degree: 'B.Tech Electrical and Communication Engineering',
      institution: 'Gandhi Institute of Technology and Management',
      period: '2016 - 2020',
      location: 'India',
      description: 'Bachelor of Technology with focus on electrical systems and communication technologies',
      courses: [
        'C Programming',
        'C++ Programming',
        'JAVA Programming',
        'Database Management System',
        'Total Quality Management',
        'Statistics',
        'VLSI Design'
      ],
      achievements: [
        'Strong foundation in programming and software development',
        'Understanding of electrical systems and communication protocols',
        'Experience with database systems and quality management'
      ],
      category: 'Undergraduate',
      icon: '⚡',
      color: 'from-green-600 to-blue-600'
    }
  ];

  const courses = [
    {
      category: 'Web Development',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      courses: [
        'Advanced React & Redux',
        'Node.js & Express Mastery',
        'GraphQL & Apollo',
        'TypeScript Fundamentals',
        'Next.js Full Stack'
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: '☁️',
      color: 'from-purple-500 to-pink-500',
      courses: [
        'AWS Solutions Architect',
        'Docker & Kubernetes',
        'CI/CD with Jenkins',
        'Terraform Infrastructure',
        'Microservices Architecture'
      ]
    },
    {
      category: 'Database & Backend',
      icon: '🗄️',
      color: 'from-green-500 to-blue-500',
      courses: [
        'MongoDB Advanced',
        'PostgreSQL Optimization',
        'Redis Caching',
        'API Design Patterns',
        'Database Security'
      ]
    },
    {
      category: 'AI & Machine Learning',
      icon: '🤖',
      color: 'from-orange-500 to-red-500',
      courses: [
        'Python for AI',
        'TensorFlow Basics',
        'Natural Language Processing',
        'Computer Vision',
        'MLOps Pipeline'
      ]
    }
  ];

  const toggleCourse = (index: number) => {
    setActiveCourse(activeCourse === index ? null : index);
  };

  return (
    <section id="education" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-purple-500/20 rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-4 text-white">
            LEARNING <span className="text-gradient">JOURNEY</span>
          </h2>
          <p className="text-gray-300 text-xl mb-8">Building knowledge brick by brick</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        {/* Formal Education */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Formal Education & Certifications</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-blue-500/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 ${edu.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto`}>
                  {edu.icon}
                </div>
                <div className="text-center">
                  <span className="bg-slate-800/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block border border-slate-700">
                    {edu.degree}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">{edu.institution}</h4>
                  <p className="text-blue-400 font-semibold mb-2">{edu.period}</p>
                  <p className="text-gray-400 text-sm mb-3">{edu.location}</p>
                  <p className="text-gray-300 text-sm">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses & Skills */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Course Mastery</h3>
          <p className="text-center text-gray-300 mb-12">Click on each category to explore the courses</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {courses.map((category, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div
                  className={`bg-gradient-to-r ${category.color} rounded-t-xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    activeCourse === index ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                  onClick={() => toggleCourse(index)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h4 className="font-bold text-lg">{category.category}</h4>
                    <p className="text-sm opacity-90 mt-2">
                      {category.courses.length} courses completed
                    </p>
                  </div>
                </div>

                {/* Course List */}
                <div className={`bg-black/30 backdrop-blur-sm rounded-b-xl shadow-lg transition-all duration-500 overflow-hidden border border-slate-700 ${
                  activeCourse === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {category.courses.map((course, courseIndex) => (
                        <li
                          key={courseIndex}
                          className="flex items-center gap-3 text-gray-300 text-sm py-2 border-b border-slate-700 last:border-b-0"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="mt-16 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl mx-auto border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-6">Learning Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
                <div className="text-gray-300">Years of Study</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Courses Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-gray-300">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-gray-300">Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
