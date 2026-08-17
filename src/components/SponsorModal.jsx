import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { X, Mail, Shield, Send } from 'lucide-react';

export const SponsorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-lg w-full bg-[#0B0B0E] border-2 border-crimson-bright rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(230,0,51,0.5)]"
        >
          <div className="flex items-center justify-between pb-4 border-b border-crimson-500/30 mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-crimson-bright" />
              <h3 className="font-display text-2xl font-bold text-white">Partner with CodeSlayer 2.0</h3>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-surface border border-crimson-500/40 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Sponsor CodeSlayer 2.0 and connect your brand directly with 500+ elite student developers, hackers, and innovators across India.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-xl bg-surface/80 border border-gray-800">
              <span className="text-xs font-mono text-crimson-bright uppercase">Contact Organizers</span>
              <p className="font-display font-bold text-white text-lg mt-1">{eventConfig.organizer}</p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{eventConfig.links.email}</p>
            </div>
          </div>

          <a
            href={eventConfig.links.sponsorDeck}
            onClick={() => soundEngine.playKatanaSlash()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 sword-slash-container"
          >
            <Mail className="w-4 h-4" />
            <span>Send Sponsorship Inquiry</span>
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
