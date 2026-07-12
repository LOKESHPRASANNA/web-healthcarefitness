import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, Apple, Activity, Scan, AlertTriangle, CheckCircle, ChevronRight, X } from 'lucide-react';

export default function AIVision() {
  const [activeTab, setActiveTab] = useState('meal'); // 'meal' or 'posture'
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setImageUploaded(true);
      setIsScanning(true);
      
      // Simulate AI Scanning delay
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
      }, 3000);
    }, 1500);
  };

  const resetScanner = () => {
    setImageUploaded(false);
    setScanComplete(false);
    setIsScanning(false);
  };

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-bold mb-4 border border-accent/20">
          <Scan size={18} /> Neural Vision Engine V2
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">AI <span className="text-accent">Computer Vision</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Upload a meal for instant calorie estimation, or a workout photo for real-time biomechanical posture correction.</p>
      </motion.div>

      {/* Mode Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 flex gap-1">
          <button 
            onClick={() => { setActiveTab('meal'); resetScanner(); }}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'meal' ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-slate-400 hover:text-white'}`}
          >
            <Apple size={18} /> Meal Analysis
          </button>
          <button 
            onClick={() => { setActiveTab('posture'); resetScanner(); }}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'posture' ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-slate-400 hover:text-white'}`}
          >
            <Activity size={18} /> Posture Correction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Col: Upload & Scanner Zone */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-2 bg-slate-900/40 border border-white/5 relative overflow-hidden h-[500px]"
        >
          {!imageUploaded ? (
            // Upload UI
            <div 
              className="w-full h-full border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-slate-800 transition-colors"
              onClick={handleUpload}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-slate-700 border-t-accent rounded-full animate-spin mb-4"></div>
                  <h3 className="text-white font-bold text-lg">Uploading...</h3>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <UploadCloud size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drop your image here</h3>
                  <p className="text-slate-400 text-sm mb-6 text-center max-w-xs">Supports JPG, PNG and MP4 up to 50MB. High resolution preferred.</p>
                  <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
                    <Camera size={18} /> Select File
                  </button>
                </>
              )}
            </div>
          ) : (
            // Scanner UI
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
              {/* Reset Button */}
              <button 
                onClick={resetScanner}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              {/* The Image (Mock based on tab) */}
              <img 
                src={activeTab === 'meal' 
                  ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop' // Healthy bowl
                  : 'https://images.unsplash.com/photo-1581009146145-14e5300c3a48?q=80&w=800&auto=format&fit=crop'} // Deadlift
                alt="Uploaded for analysis"
                className={`w-full h-full object-cover transition-all duration-1000 ${isScanning ? 'brightness-50 grayscale' : 'brightness-100 grayscale-0'}`}
              />

              {/* Scanning Animation Overlay */}
              {isScanning && (
                <>
                  <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_20px_rgba(59,130,246,1)] z-10"
                  />
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTQwIDB2NDBIMHYtNDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50 z-0"></div>
                  
                  {/* Scanning Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/80 px-6 py-3 rounded-full backdrop-blur-md border border-accent/30 z-20">
                    <Scan className="text-accent animate-pulse" size={20} />
                    <span className="text-white font-bold tracking-widest uppercase text-sm animate-pulse">Running Vision Models...</span>
                  </div>
                </>
              )}

              {/* Posture Joint Markers (Only show on posture tab when scan complete) */}
              {scanComplete && activeTab === 'posture' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="absolute top-[40%] left-[45%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                  <div className="absolute top-[40%] left-[45%] w-32 h-0.5 bg-red-500 -rotate-45 origin-left"></div>
                  <div className="absolute top-[30%] left-[65%] bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full border border-red-500 backdrop-blur-md">
                    Back rounding detected
                  </div>
                </motion.div>
              )}

              {/* Food Bounding Boxes (Only show on meal tab when scan complete) */}
              {scanComplete && activeTab === 'meal' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] border-2 border-accent border-dashed bg-accent/10 rounded-lg">
                    <div className="absolute -top-3 -right-2 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">Avocado (75%)</div>
                  </div>
                  <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[30%] border-2 border-green-500 border-dashed bg-green-500/10 rounded-lg">
                    <div className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">Spinach (92%)</div>
                  </div>
                </motion.div>
              )}

            </div>
          )}
        </motion.div>

        {/* Right Col: AI Analysis Results */}
        <div className="h-full">
          <AnimatePresence mode="wait">
            {!scanComplete ? (
              <motion.div 
                key="waiting"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-[500px] card bg-slate-900/40 border border-white/5 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-white/5">
                  <Activity size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Awaiting Image</h3>
                <p className="text-slate-400">Upload a photo to see the Neural Vision Engine in action.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-8 bg-slate-900/60 border border-white/5 h-[500px] overflow-y-auto"
              >
                {activeTab === 'meal' ? (
                  // Meal Results
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-accent/20 rounded-xl text-accent border border-accent/30">
                        <CheckCircle size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Meal Detected</h2>
                        <p className="text-sm text-slate-400">Estimated Confidence: 94.2%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Calories</span>
                        <span className="text-2xl font-bold text-white">425 <span className="text-sm text-slate-400 font-normal">kcal</span></span>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Health Score</span>
                        <span className="text-2xl font-bold text-green-400">A-</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-white mb-4">Macronutrient Breakdown</h3>
                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">Protein (12g)</span>
                          <span className="font-bold text-white">25%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-accent w-[25%]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">Carbs (45g)</span>
                          <span className="font-bold text-white">50%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[50%]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">Fats (18g)</span>
                          <span className="font-bold text-white">25%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[25%]"></div></div>
                      </div>
                    </div>

                    <button className="w-full btn-primary py-3 rounded-xl font-bold flex justify-center items-center gap-2">
                      Log Meal to Diary <ChevronRight size={18} />
                    </button>
                  </>
                ) : (
                  // Posture Results
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-red-500/20 rounded-xl text-red-400 border border-red-500/30">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Correction Needed</h2>
                        <p className="text-sm text-slate-400">Exercise: Barbell Deadlift</p>
                      </div>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
                      <h4 className="font-bold text-red-400 flex items-center gap-2 mb-2"><AlertTriangle size={16} /> Lumbar Spinal Flexion Detected</h4>
                      <p className="text-sm text-slate-300">Your lower back is rounding at the start of the pull. This puts extreme shear force on the spinal discs.</p>
                    </div>

                    <h3 className="font-bold text-white mb-4">AI Recommendations</h3>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-slate-300">Drop the weight by 15-20% until form is corrected.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-slate-300"><span className="text-white font-bold">"Chest up, lats tight."</span> Squeeze your armpits like you're holding oranges before you lift.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-slate-300">Brace your core pushing outwards against your belt (or imaginary belt).</p>
                      </li>
                    </ul>

                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-white transition-colors py-3 rounded-xl font-bold border border-white/10 flex justify-center items-center gap-2">
                      Send to My Trainer <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
