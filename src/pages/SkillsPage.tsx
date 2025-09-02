
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GameBackground from '@/components/GameBackground';
import GameCursor from '@/components/GameCursor';

const SkillsPage = () => {
  const navigate = useNavigate();
  const [brokenBricks, setBrokenBricks] = useState<number[]>([]);

  const skillCategories = [
    {
      title: 'Generative AI & LLMs',
      skills: ['LLMs', 'Transformers', 'GANs', 'VAEs', 'Stable Diffusion', 'RLHF', 'LoRA', 'PEFT'],
      color: 'bg-blue-600',
      icon: '🤖'
    },
    {
      title: 'ML & Deep Learning',
      skills: ['TensorFlow', 'PyTorch', 'JAX', 'Keras', 'Scikit-learn', 'XGBoost', 'LightGBM'],
      color: 'bg-purple-600',
      icon: '🧠'
    },
    {
      title: 'Vector Databases & RAG',
      skills: ['Pinecone', 'Weaviate', 'FAISS', 'Milvus', 'ChromaDB', 'RAG Systems'],
      color: 'bg-green-600',
      icon: '🔍'
    },
    {
      title: 'Cloud & MLOps',
      skills: ['AWS SageMaker', 'GCP Vertex AI', 'Azure ML', 'MLflow', 'Kubeflow', 'Docker', 'Kubernetes'],
      color: 'bg-orange-600',
      icon: '☁️'
    },
    {
      title: 'Programming Languages',
      skills: ['Python', 'R', 'Java', 'C++', 'JavaScript', 'Scala'],
      color: 'bg-red-600',
      icon: '💻'
    },
    {
      title: 'Data & Analytics',
      skills: ['Spark', 'Hadoop', 'Databricks', 'Kafka', 'Snowflake', 'BigQuery'],
      color: 'bg-cyan-600',
      icon: '📊'
    }
  ];

  const handleBrickClick = (index: number) => {
    if (!brokenBricks.includes(index)) {
      setBrokenBricks([...brokenBricks, index]);
      setTimeout(() => {
        setBrokenBricks(prev => prev.filter(i => i !== index));
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <GameBackground />
      <GameCursor />
      
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={() => navigate('/about')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ← About
          </Button>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/experience')} variant="outline" className="text-white border-white hover:bg-white/10">Experience →</Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center">
            SKILL <span className="text-gradient">ARSENAL</span>
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-500 ${
                  brokenBricks.includes(index) ? 'animate-bounce' : ''
                }`}
                onClick={() => handleBrickClick(index)}
              >
                <div className={`${category.color} rounded-xl p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/20`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  </div>
                  
                  <div className={`transition-all duration-300 ${brokenBricks.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="bg-black/30 rounded-lg p-4 mt-4">
                      <ul className="text-white space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-sm">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">Click on skill bricks to reveal technologies!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
