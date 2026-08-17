import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lightbulb, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const TrackDetailModal = ({ track, onClose }) => {
  if (!track) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-2xl w-full bg-[#0B0B0E] border-2 border-crimson-bright rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(230,0,51,0.5)] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-crimson-500/30 mb-6">
            <div>
              <span className="font-mono text-xs text-crimson-bright uppercase tracking-widest px-2.5 py-1 bg-crimson-500/20 rounded border border-crimson-bright/30">
                {track.tag}
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-2">
                {track.title}
              </h3>
              <p className="font-mono text-xs text-red-400 mt-0.5">{track.subtitle}</p>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-surface border border-crimson-500/40 text-gray-300 hover:text-white hover:border-crimson-bright transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Battle Description</h4>
            <p className="text-gray-200 text-base leading-relaxed bg-surface/60 p-4 rounded-2xl border border-gray-800">
              {track.description}
            </p>
          </div>

          {/* Example Project Ideas */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-crimson-bright" />
              Suggested Focus Areas & Ideas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {track.ideas.map((idea) => (
                <div
                  key={idea}
                  className="p-3 rounded-xl bg-crimson-500/10 border border-crimson-bright/20 flex items-center space-x-2 text-sm text-gray-200"
                >
                  <Sparkles className="w-4 h-4 text-crimson-bright shrink-0" />
                  <span>{idea}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-gray-800">
            <button
              onClick={() => {
                soundEngine.playKatanaSlash();
                onClose();
                document.querySelector('#ppt-round')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright text-white font-bold text-sm shadow-[0_0_20px_rgba(230,0,51,0.5)] flex items-center justify-center space-x-2 sword-slash-container"
            >
              <span>Submit Idea for {track.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
