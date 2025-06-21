
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GameBackground from '@/components/GameBackground';
import GameCursor from '@/components/GameCursor';

const ProjectsPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Advanced Deep Learning Models',
      description: 'Comparative analysis of CNN, VGG16, and InceptionV3 for fruit image classification using transfer learning techniques.',
      achievements: ['94% classification accuracy with InceptionV3', 'Outperformed VGG16 (85%) and custom CNN (70%)', 'Advanced transfer learning strategies'],
      category: 'Deep Learning',
      color: 'from-purple-600 to-pink-600',
      icon: '🧠'
    },
    {
      title: 'Wine Quality Classification',
      description: 'Logistic regression model for wine quality classification with comprehensive data preprocessing and feature engineering.',
      achievements: ['Feature standardization with StandardScaler', 'Dataset splitting and robust evaluation', 'Advanced preprocessing with Pandas/NumPy'],
      category: 'Machine Learning',
      color: 'from-red-600 to-orange-600',
      icon: '🍷'
    },
    {
      title: 'Marketing Optimization ML',
      description: 'Predictive modeling for term deposit campaigns using multiple ML algorithms to optimize marketing strategies.',
      achievements: ['85%+ AUC-ROC scores achieved', '82% highest recall using XGBoost', 'Processed 45,211 client records'],
      category: 'Business Intelligence',
      color: 'from-blue-600 to-cyan-600',
      icon: '📈'
    },
    {
      title: 'Cloud ML Pipeline',
      description: 'Distributed machine learning solution on AWS using EMR, Spark, and S3 for scalable data processing.',
      achievements: ['Containerized with Docker', 'Scalable deployment across EC2 instances', 'End-to-end ML pipeline automation'],
      category: 'Cloud Computing',
      color: 'from-green-600 to-blue-600',
      icon: '☁️'
    },
    {
      title: 'Cloud-Based Sensor Analytics',
      description: 'IoT sensor data collection and analytics for industrial environments with real-time processing capabilities.',
      achievements: ['Scalable ETL pipelines using PySpark', 'AWS EMR cluster deployment', 'Anomaly detection dashboards'],
      category: 'IoT Analytics',
      color: 'from-yellow-600 to-orange-600',
      icon: '📡'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <GameBackground />
      <GameCursor />
      
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={() => navigate('/experience')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ← Experience
          </Button>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/contact')} variant="outline" className="text-white border-white hover:bg-white/10">Contact →</Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center">
            PROJECT <span className="text-gradient">SHOWCASE</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{project.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="opacity-90">{project.category}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                    {project.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-400 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
