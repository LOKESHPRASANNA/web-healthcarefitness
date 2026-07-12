import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, MessageSquare, Heart, Share2, Award, TrendingUp,
  Send, Image, ThumbsUp, MessageCircle, Star, Flame, Trophy,
  Target, Clock, ChevronRight, Plus
} from 'lucide-react';

const posts = [
  {
    id: 1, user: 'Alex Johnson', avatar: 'AJ', role: 'Elite Trainer',
    time: '2 hours ago', badge: 'Top Contributor',
    content: 'Just completed a 30-day transformation challenge! Down 8kg and feeling stronger than ever. Consistency is key! 💪🔥',
    likes: 234, comments: 45, shares: 12, liked: false,
  },
  {
    id: 2, user: 'Sarah Miller', avatar: 'SM', role: 'Yoga Instructor',
    time: '5 hours ago', badge: 'Verified Coach',
    content: 'Morning yoga flow to start the day right. Remember: flexibility is not just physical — it\'s a mindset. 🧘‍♀️✨ Who else did their morning stretch today?',
    likes: 187, comments: 32, shares: 8, liked: true,
  },
  {
    id: 3, user: 'Marcus Wong', avatar: 'MW', role: 'Member',
    time: '1 day ago', badge: '7-Day Streak',
    content: 'Hit a new PR on deadlift today — 180kg! Thanks to the AI Coach for the progressive overload plan. This platform is a game-changer.',
    likes: 312, comments: 67, shares: 24, liked: false,
  },
];

const challenges = [
  { name: '30-Day Plank Challenge', participants: 1245, daysLeft: 18, progress: 40, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: '10K Steps Daily', participants: 3421, daysLeft: 7, progress: 76, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Clean Eating Week', participants: 892, daysLeft: 3, progress: 90, icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

const leaderboard = [
  { rank: 1, name: 'Alex Johnson', points: '12,450', streak: 45 },
  { rank: 2, name: 'Sarah Miller', points: '11,200', streak: 38 },
  { rank: 3, name: 'Marcus Wong', points: '10,850', streak: 32 },
  { rank: 4, name: 'Elena Rostova', points: '9,700', streak: 28 },
  { rank: 5, name: 'You', points: '8,920', streak: 14 },
];

export default function Community() {
  const [postsList, setPostsList] = useState(posts);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id) => {
    setPostsList(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(), user: 'You', avatar: 'YO', role: 'Member',
      time: 'Just now', badge: 'Active',
      content: newPost, likes: 0, comments: 0, shares: 0, liked: false,
    };
    setPostsList([post, ...postsList]);
    setNewPost('');
  };

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Community</h1>
        <p className="text-surface-500">Connect with fellow athletes, share achievements, and join challenges.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Feed */}
        <div className="xl:col-span-2 space-y-6">
          {/* New Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5"
          >
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">YO</div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Share your fitness journey..."
                  rows={3}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <button className="flex items-center gap-2 text-sm text-surface-500 hover:text-accent transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-50">
                    <Image size={16} /> Photo
                  </button>
                  <button
                    onClick={addPost}
                    disabled={!newPost.trim()}
                    className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={14} /> Post
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Posts */}
          <AnimatePresence>
            {postsList.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-surface-900 text-sm">{post.user}</p>
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">{post.badge}</span>
                    </div>
                    <p className="text-xs text-surface-500">{post.role} · {post.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-surface-700 text-sm leading-relaxed mb-5">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-1 border-t border-surface-100 pt-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      post.liked ? 'text-red-500 bg-red-50' : 'text-surface-500 hover:bg-surface-50 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-surface-500 hover:bg-surface-50 hover:text-accent transition-all">
                    <MessageCircle size={16} /> {post.comments}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-surface-500 hover:bg-surface-50 hover:text-green-500 transition-all">
                    <Share2 size={16} /> {post.shares}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6"
          >
            <h3 className="font-display font-bold text-surface-900 mb-5 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" />
              Active Challenges
            </h3>
            <div className="space-y-4">
              {challenges.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-surface-100 hover:border-accent/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}>
                      <c.icon size={16} className={c.color} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-surface-900">{c.name}</p>
                      <p className="text-xs text-surface-500">{c.participants.toLocaleString()} participants</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-surface-500 mt-2 flex items-center gap-1">
                    <Clock size={10} /> {c.daysLeft} days left
                  </p>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-surface-300 rounded-xl text-sm text-surface-500 hover:border-accent hover:text-accent transition-all font-medium">
                <Plus size={14} /> Join More Challenges
              </button>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6"
          >
            <h3 className="font-display font-bold text-surface-900 mb-5 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              Leaderboard
            </h3>
            <div className="space-y-3">
              {leaderboard.map((l, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    l.name === 'You' ? 'bg-accent/5 border border-accent/20' : 'hover:bg-surface-50'
                  } transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      l.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                      l.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      l.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-surface-100 text-surface-500'
                    }`}>
                      {l.rank}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-surface-900">{l.name}</p>
                      <p className="text-xs text-surface-500">{l.streak}-day streak</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-accent">{l.points} pts</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-accent to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="relative">
              <h3 className="font-bold text-lg mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">15.2K</p>
                  <p className="text-xs text-white/70">Active Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">2.8K</p>
                  <p className="text-xs text-white/70">Posts This Week</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">890</p>
                  <p className="text-xs text-white/70">Challenges Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-white/70">Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
