import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { OpeningLoader } from './components/OpeningLoader';
import { KatanaBladePointer } from './components/motion/KatanaBladePointer';
import { KonamiSlayEasterEgg } from './components/KonamiSlayEasterEgg';
import { EmberCanvas } from './components/EmberCanvas';
import { BattleMapNav } from './components/BattleMapNav';
import { Navbar } from './components/Navbar';
import { ExplosiveHero3D } from './components/3d/ExplosiveHero3D';
import { AboutSection } from './components/AboutSection';
import { SelectionTrial3D } from './components/SelectionTrial3D';
import { Tracks3DHub } from './components/3d/Tracks3DHub';
import { TimelineSection } from './components/TimelineSection';
import { CompactLegacySection } from './components/CompactLegacySection';
import { PrizeRevealSection } from './components/PrizeRevealSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';

export function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll Physics
  useLenisScroll();

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 relative selection:bg-crimson-bright selection:text-white">
      {/* Opening Katana Slash Loader */}
      {loading && <OpeningLoader onComplete={() => setLoading(false)} />}

      {/* Dual Blade Shard Pointer with Velocity Trail */}
      <KatanaBladePointer />

      {/* Konami Secret "SLAY" Key Listener */}
      <KonamiSlayEasterEgg />

      {/* Dynamic Ember Background */}
      <EmberCanvas />

      {/* Desktop Battle Map Side Navigation */}
      <BattleMapNav />

      {/* Main Web App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ExplosiveHero3D />
          <AboutSection />
          <SelectionTrial3D />
          <Tracks3DHub />
          <TimelineSection />
          <CompactLegacySection />
          <PrizeRevealSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
