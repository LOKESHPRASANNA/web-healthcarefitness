import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, RotateCcw, ZoomIn, Box, Play, CheckCircle } from 'lucide-react';

const exercises = [
  { id: 'bench', name: 'Barbell Bench Press', primary: 'Pectoralis Major', secondary: 'Anterior Deltoids, Triceps', activation: 85, difficulty: 'Medium', burn: '250 kcal/hr', recovery: '48 Hrs' },
  { id: 'squat', name: 'Barbell Back Squat', primary: 'Quadriceps, Glutes', secondary: 'Hamstrings, Core', activation: 92, difficulty: 'Hard', burn: '400 kcal/hr', recovery: '72 Hrs' },
  { id: 'deadlift', name: 'Conventional Deadlift', primary: 'Erector Spinae, Glutes', secondary: 'Hamstrings, Lats, Forearms', activation: 95, difficulty: 'Expert', burn: '450 kcal/hr', recovery: '72 Hrs' }
];

export default function Anatomy3D() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [viewAngle, setViewAngle] = useState('Front'); // Front, Back, Side
  const [modelGender, setModelGender] = useState('Male');
  const [isRotating, setIsRotating] = useState(false);

  const triggerRotation = () => {
    setIsRotating(true);
    setTimeout(() => {
      setViewAngle(prev => prev === 'Front' ? 'Side' : prev === 'Side' ? 'Back' : 'Front');
      setIsRotating(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      {/* Medical Blue Ambient Background */}
      <div className="absolute top-1/4 right-1/3 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold mb-3 border border-cyan-500/20 text-xs uppercase tracking-wider">
            <Box size={14} /> WebXR Engine Sandbox
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-800 tracking-tight mb-2">3D Anatomy Visualizer</h1>
          <p className="text-surface-500">Interactive spatial mapping of muscle activation groups.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
        
        {/* Left Col: Exercise Selector & Metrics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card p-6 bg-slate-900/60 border border-surface-200/50 flex-1">
            <h3 className="font-bold text-surface-800 mb-4 text-lg">Select Movement</h3>
            <div className="space-y-3 mb-8">
              {exercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedExercise.id === ex.id 
                      ? 'bg-cyan-500/10 border-cyan-500 text-surface-800 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'bg-slate-800/30 border-surface-200/50 text-surface-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold mb-1">{ex.name}</div>
                  <div className="text-xs flex items-center gap-2">
                    <span className="text-cyan-400">{ex.primary}</span>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-bold text-surface-800 mb-4 text-lg flex items-center gap-2">
              <Activity size={18} className="text-cyan-400" /> Activation Data
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-[10px] text-surface-500 font-bold uppercase tracking-wider block mb-1">Total Activation</span>
                <span className="text-2xl font-black text-cyan-400">{selectedExercise.activation}%</span>
              </div>
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-[10px] text-surface-500 font-bold uppercase tracking-wider block mb-1">Est. Recovery</span>
                <span className="font-display text-lg font-bold text-surface-900">{selectedExercise.recovery}</span>
              </div>
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-[10px] text-surface-500 font-bold uppercase tracking-wider block mb-1">Calories Burned</span>
                <span className="font-display text-lg font-bold text-surface-900">{selectedExercise.burn}</span>
              </div>
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-[10px] text-surface-500 font-bold uppercase tracking-wider block mb-1">Difficulty</span>
                <span className="text-lg font-bold text-orange-400">{selectedExercise.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Col: The 3D Viewport Simulator */}
        <div className="lg:col-span-8 card bg-[#020617] border border-cyan-900/50 overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.05)] inset-0">
          
          {/* Viewport Toolbar */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
            <div className="flex gap-2 bg-surface-100/80 p-1.5 rounded-xl border border-surface-200 backdrop-blur-md">
              {['Male', 'Female'].map(g => (
                <button 
                  key={g} 
                  onClick={() => setModelGender(g)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${modelGender === g ? 'bg-cyan-500 text-white' : 'text-surface-400 hover:text-white'}`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={triggerRotation} className="w-10 h-10 bg-surface-100/80 border border-surface-200 rounded-xl flex items-center justify-center text-surface-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all backdrop-blur-md">
                <RotateCcw size={18} />
              </button>
              <button className="w-10 h-10 bg-surface-100/80 border border-surface-200 rounded-xl flex items-center justify-center text-surface-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all backdrop-blur-md">
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          {/* 3D Model Simulator (CSS/SVG wrapper for future Three.js canvas) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Grid Floor */}
            <div className="absolute bottom-10 w-[600px] h-[600px] border border-cyan-900/30 rounded-full rotate-x-[70deg] scale-y-50 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTQwIDB2NDBIMHYtNDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNiwgMTgyLCAyMTIsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')]"></div>
            
            <motion.div 
              animate={{ 
                rotateY: isRotating ? 180 : 0,
                opacity: isRotating ? 0.5 : 1
              }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-sm h-full max-h-[500px] flex items-center justify-center mt-10"
            >
              {/* This is a high-tech placeholder for the 3D body. 
                  In production, a <canvas> from react-three-fiber goes here. */}
              
              <div className="relative z-10 w-48 h-96">
                 {/* Silhouette */}
                 <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-[100px] border border-blue-100 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                    {/* Head */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-20 bg-slate-800/80 border border-blue-100 rounded-[40%]"></div>
                 </div>

                 {/* Simulated Muscle Heatmaps based on selection */}
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={selectedExercise.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      {/* Bench Press */}
                      {selectedExercise.id === 'bench' && viewAngle === 'Front' && (
                        <>
                          {/* Pecs */}
                          <div className="absolute top-[10%] left-[20%] w-[60%] h-[20%] bg-red-500/60 blur-md rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse"></div>
                          {/* Shoulders */}
                          <div className="absolute top-[8%] left-[5%] w-[25%] h-[15%] bg-orange-500/50 blur-md rounded-full"></div>
                          <div className="absolute top-[8%] right-[5%] w-[25%] h-[15%] bg-orange-500/50 blur-md rounded-full"></div>
                        </>
                      )}

                      {/* Squats */}
                      {selectedExercise.id === 'squat' && viewAngle === 'Front' && (
                        <>
                          {/* Quads */}
                          <div className="absolute bottom-[20%] left-[20%] w-[25%] h-[35%] bg-red-500/60 blur-md rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse"></div>
                          <div className="absolute bottom-[20%] right-[20%] w-[25%] h-[35%] bg-red-500/60 blur-md rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse"></div>
                        </>
                      )}

                      {/* Deadlift */}
                      {selectedExercise.id === 'deadlift' && viewAngle === 'Back' && (
                        <>
                          {/* Back / Erector */}
                          <div className="absolute top-[20%] left-[40%] w-[20%] h-[50%] bg-red-500/60 blur-md rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse"></div>
                          {/* Glutes */}
                          <div className="absolute top-[60%] left-[25%] w-[50%] h-[15%] bg-orange-500/60 blur-md rounded-full"></div>
                        </>
                      )}
                    </motion.div>
                 </AnimatePresence>
              </div>

              {/* Scanning Laser Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)] z-20 opacity-50"
              />

            </motion.div>
          </div>

          {/* Overlay Info Bottom */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20 pointer-events-none">
             <div className="bg-black/50 backdrop-blur-md border border-cyan-900/50 px-4 py-2 rounded-xl">
               <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">Primary Target</span>
               <span className="text-white font-bold">{selectedExercise.primary}</span>
             </div>
             
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                  <span className="text-xs text-white font-bold">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                  <span className="text-xs text-white font-bold">Secondary</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
