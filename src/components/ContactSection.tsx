
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GameBackground from '@/components/GameBackground';
import GameCursor from '@/components/GameCursor';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <GameBackground />
      <GameCursor />
      
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={() => navigate('/projects')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ← Projects
          </Button>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/portfolio')} variant="outline" className="text-white border-white hover:bg-white/10">Main Menu</Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center">
            CONTACT <span className="text-gradient">SAITEJ</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-blue-400 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">Bodapatisaitej@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg">
                  <div className="text-2xl">💼</div>
                  <div>
                    <p className="text-white font-semibold">LinkedIn</p>
                    <p className="text-gray-400">linkedin.com/in/tejchowdary</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                  <div className="text-2xl">🐱</div>
                  <div>
                    <p className="text-white font-semibold">GitHub</p>
                    <p className="text-gray-400">github.com/saitejchowdary</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg">
                  <div className="text-2xl">📱</div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-400">+1 (XXX) XXX-XXXX</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg">
                  📄 Download Resume
                </Button>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
              <h2 className="text-3xl font-bold text-green-400 mb-6">Quick Stats</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">3+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="bg-green-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">50+</div>
                  <div className="text-gray-400 text-sm">Projects Completed</div>
                </div>
                <div className="bg-purple-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">15+</div>
                  <div className="text-gray-400 text-sm">Technologies</div>
                </div>
                <div className="bg-orange-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">98%</div>
                  <div className="text-gray-400 text-sm">Data Accuracy</div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">🎯 Available For</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Full-time Data Science Roles</li>
                  <li>• ML Engineering Positions</li>
                  <li>• Cloud Architecture Projects</li>
                  <li>• Consulting Opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
