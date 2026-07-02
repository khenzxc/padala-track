import React from 'react';
import { Smartphone, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Workflow() {
  return (
    <section id="workflow" className="py-20 bg-[#F2F2F7]/60 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            3 Simple Steps to Financial Transparency
          </h2>
          <p className="text-base sm:text-lg text-neutral-500">
            A seamless processing loop designed to balance operational speed with complete transaction integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4 text-left relative pt-10">
            <span className="absolute -top-4 left-6 bg-blue-500 text-white font-bold text-sm px-4 py-1 rounded-full shadow-sm">STEP 1</span>
            <div className="text-blue-500">
              <Smartphone className="h-7 w-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Remit & Allocate Capital</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Send capital via your preferred infrastructure provider and segment the remittance into specific objective pools (e.g., Construction materials, Medical, Education).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4 text-left relative pt-10">
            <span className="absolute -top-4 left-6 bg-blue-500 text-white font-bold text-sm px-4 py-1 rounded-full shadow-sm">STEP 2</span>
            <div className="text-amber-500">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Scan Receipts via Cloud AI</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Beneficiaries take a photo of itemized receipts directly inside the mobile app interface. The automated image diagnostics instantly run processing parameters in the background.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4 text-left relative pt-10">
            <span className="absolute -top-4 left-6 bg-blue-500 text-white font-bold text-sm px-4 py-1 rounded-full shadow-sm">STEP 3</span>
            <div className="text-emerald-500">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Automated Audit Clearance</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              If the processing algorithm encounters no metadata errors or layout anomalies, the records are cleanly committed to the ledger. If verified discrepancies occur, siders receive immediate push logs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}