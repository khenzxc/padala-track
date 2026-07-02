import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-12 px-4 text-center">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-neutral-500">
          <a href="#features" className="hover:text-blue-500 transition">Features</a>
          <a href="#workflow" className="hover:text-blue-500 transition">How It Works</a>
          <a href="#safety" className="hover:text-blue-500 transition">Security</a>
          <a href="#" className="hover:text-blue-500 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition">Terms of Service</a>
        </div>

        <div className="border-t border-neutral-100 pt-6 space-y-2">
          <p className="text-sm text-neutral-500 font-bold">
            © {new Date().getFullYear()} PadalaTrack Platform. All Rights Reserved.
          </p>
          <p className="text-xs text-neutral-400 tracking-wide">
            The trusted transactional audit ecosystem for secure, visible, and optimized household financial management.
          </p>
        </div>

      </div>
    </footer>
  );
}