import React from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Safety() {
  return (
    <section id="safety" className="py-20 bg-white px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Heading Section */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Engineered with High-Tier Security
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Because your family's hard-earned capital is on the line, we never compromise on data integrity. We use industry-standard security models to safeguard every single transaction and file.
          </p>
        </div>

        {/* Right Info Cards Section */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          
          {/* Card 1: Encryption */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F2F2F7]/60 border border-neutral-200/60 space-y-3">
            <div className="flex items-center space-x-3 text-blue-500">
              <Lock className="h-6 w-6" />
              <h4 className="font-bold text-lg sm:text-xl text-neutral-900">Secure Data Encryption</h4>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              All records, uploaded receipt metadata, and transaction channels are strictly encrypted, keeping data accessible only to the sender and verified beneficiaries.
            </p>
          </div>

          {/* Card 2: Cloud Sync */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F2F2F7]/60 border border-neutral-200/60 space-y-3">
            <div className="flex items-center space-x-3 text-blue-500">
              <Zap className="h-6 w-6" />
              <h4 className="font-bold text-lg sm:text-xl text-neutral-900">Real-Time Cloud Sync</h4>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              A centralized database ledger architecture where uploads from the Philippines instantly update the sender's portal overseas with zero latency.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}