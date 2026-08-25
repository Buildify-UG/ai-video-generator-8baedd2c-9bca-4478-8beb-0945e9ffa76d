import React, { useState } from 'react';
import { Film, Play, Zap, Plus, Trash2, Download, Share2, Clock, Sparkles } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  prompt: string;
  duration: string;
  status: 'completed' | 'processing' | 'queued';
  thumbnail: string;
  createdAt: string;
}

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Sunset Beach Walk',
    prompt: 'A serene sunset over a tropical beach with waves gently crashing',
    duration: '0:30',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Futuristic City',
    prompt: 'A neon-lit cyberpunk city with flying cars and holographic billboards',
    duration: '0:45',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
    createdAt: '5 hours ago',
  },
  {
    id: '3',
    title: 'Forest Adventure',
    prompt: 'A magical forest with glowing mushrooms and mystical creatures',
    duration: '1:00',
    status: 'processing',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    createdAt: '10 minutes ago',
  },
];

export default function Index() {
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('30');

  const handleCreateVideo = () => {
    if (!prompt.trim()) return;

    const newVideo: Video = {
      id: Date.now().toString(),
      title: prompt.substring(0, 30) + '...',
      prompt,
      duration: `0:${duration}`,
      status: 'queued',
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
      createdAt: 'just now',
    };

    setVideos([newVideo, ...videos]);
    setPrompt('');
    setDuration('30');
    setShowCreateForm(false);
  };

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-700';
      case 'processing':
        return 'bg-blue-500/20 text-blue-700';
      case 'queued':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Play className="w-4 h-4" />;
      case 'processing':
        return <Zap className="w-4 h-4 animate-spin" />;
      case 'queued':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI Video Studio</h1>
                <p className="text-slate-400 text-sm">Create stunning videos with AI</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create Video
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full p-8 border border-slate-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Create New Video</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Describe your video
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A serene sunset over mountains with birds flying..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Duration: {duration} seconds
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>15s</span>
                    <span>120s</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateVideo}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    Generate Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Your Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-slate-800 h-48">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button */}
                  {video.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 bg-purple-500 rounded-full">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                    {video.duration}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-2 left-2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                    {getStatusIcon(video.status)}
                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{video.prompt}</p>
                  <p className="text-xs text-slate-500 mb-4">{video.createdAt}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {video.status === 'completed' && (
                      <>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-500 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No videos yet</h3>
            <p className="text-slate-400 mb-6">Create your first AI video to get started</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Video
            </button>
          </div>
        )}
      </main>

      {/* Features Section */}
      <section className="mt-20 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose AI Video Studio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Free & Easy',
                description: 'No credit card needed. Create stunning videos in seconds with simple prompts.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                description: 'Advanced AI processes your videos instantly. Get results in minutes, not hours.',
              },
              {
                icon: <Film className="w-8 h-8" />,
                title: 'Professional Quality',
                description: 'High-definition videos perfect for social media, marketing, and content creation.',
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl hover:border-purple-500/50 transition-colors">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>© 2024 AI Video Studio. Create amazing videos powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
