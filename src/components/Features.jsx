import React from 'react';
import { Eye, FileText, Users } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white border-y border-neutral-200 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Algorithmic Verification, Not Guesswork.
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
            PadalaTrack removes financial obscurity by processing uploaded receipts through our specialized cloud diagnostics engine.
          </p>
        </div>

        {/* Core Features Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-[#F2F2F7]/60 p-6 sm:p-8 rounded-2xl border border-neutral-200/60 space-y-4 text-left">
            <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-md text-blue-500">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">EXIF Metadata Verification</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              The engine inspects internal image headers instantly. If a receipt image contains embedded signatures from design software like Canva or Photoshop, a high-priority risk log is generated.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#F2F2F7]/60 p-6 sm:p-8 rounded-2xl border border-neutral-200/60 space-y-4 text-left">
            <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-md text-blue-500">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">OCR Mathematical Audit</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Utilizing optical character recognition, the system isolates each line item price and cross-calculates the final sum to guarantee item amounts have not been manually overwritten.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#F2F2F7]/60 p-6 sm:p-8 rounded-2xl border border-neutral-200/60 space-y-4 text-left">
            <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-md text-blue-500">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Asymmetric Dynamic Pairing</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Establishing connections using an encrypted 6-digit handshake mechanism. No external entity can access or view your family ledger without explicit clearance from the primary account creator.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}