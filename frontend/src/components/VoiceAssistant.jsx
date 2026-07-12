import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [showHUD, setShowHUD] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Initialize Web Speech API
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setTranscript(text);
        processCommand(text);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        speak('I did not catch that. Please try again.');
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }
  }, [navigate]);

  // Text-to-Speech Function
  const speak = (text) => {
    setAssistantResponse(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      // Try to find a good voice (preferably a professional/AI sounding one)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Samantha') || v.lang === 'en-US');
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  // Command Parser
  const processCommand = (command) => {
    let response = '';

    if (command.includes('dashboard') || command.includes('overview')) {
      response = 'Opening your dashboard now.';
      navigate('/dashboard');
    } else if (command.includes('workout') || command.includes('exercise')) {
      response = 'Navigating to workouts.';
      navigate('/workouts');
    } else if (command.includes('diet') || command.includes('nutrition') || command.includes('meal')) {
      response = 'Pulling up your nutrition plan.';
      navigate('/nutrition');
    } else if (command.includes('health twin') || command.includes('scan')) {
      response = 'Accessing AI Health Twin.';
      navigate('/ai-health-twin');
    } else if (command.includes('marketplace') || command.includes('store')) {
      response = 'Opening the marketplace.';
      navigate('/marketplace');
    } else if (command.includes('hello') || command.includes('jarvis') || command.includes('coach')) {
      response = 'Hello. I am your AI Coach. How can I assist your training today?';
    } else if (command.includes('start timer')) {
      response = 'Starting your workout timer. Let\'s go!';
      // Custom event could be dispatched here to interact with workout pages
    } else {
      response = 'Command not recognized. Try saying "Open Dashboard" or "Start Workout".';
    }

    speak(response);

    // Auto-hide HUD after 5 seconds
    setTimeout(() => {
      setShowHUD(false);
    }, 5000);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setAssistantResponse('');
      setShowHUD(true);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      {/* HUD Overlay */}
      <AnimatePresence>
        {showHUD && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-80 glass-panel p-6 border border-accent/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-2xl flex flex-col items-center text-center"
          >
            <button onClick={() => setShowHUD(false)} className="absolute top-3 right-3 text-surface-500 hover:text-white">
              <X size={16} />
            </button>
            
            <div className="relative mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-surface-100 border-2 ${isListening ? 'border-accent shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-slate-700'}`}>
                {isListening ? (
                  <Mic size={24} className="text-accent animate-pulse" />
                ) : (
                  <Volume2 size={24} className="text-green-400" />
                )}
              </div>
              {/* Radar waves when listening */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border border-accent/50 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute inset-0 rounded-full border border-accent/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </>
              )}
            </div>
            
            <div className="h-16 flex flex-col justify-center">
              {isListening ? (
                <p className="text-surface-800 font-semibold">Listening...</p>
              ) : (
                <>
                  <p className="text-surface-500 text-sm italic mb-2">"{transcript}"</p>
                  <p className="text-accent font-bold text-sm">{assistantResponse}</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-blue-900/5 transition-colors ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-surface-800 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
            : 'bg-accent hover:bg-blue-600 text-surface-800 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
        }`}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>
    </>
  );
}
