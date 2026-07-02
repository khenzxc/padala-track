import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import Safety from '../components/Safety';
import Footer from '../components/Footer';

export default function LandingPage({ setView, userRole, setUserRole }) {
  return (
    /* Ibinalik natin ang font family at background wrapper para hindi masira ang style mo */
    <div className="w-full bg-[#F2F2F7] font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_sans-serif]">
      
      {/* Ang Hero ngayon ay may access na sa shared state */}
      <Hero userRole={userRole} setUserRole={setUserRole} />

      {/* Kumpletong mga sections ng landing page mo */}
      <Features />
      <Workflow />
      <Safety />
      <Footer />
    </div>
  );
}