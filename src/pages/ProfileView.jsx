import React, { useState } from 'react';
import { User, Mail, Shield, ShieldCheck, Key, Save } from 'lucide-react';

export default function ProfileView({ userRole }) {
  const [formData, setFormData] = useState({
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
    phone: '+63 912 345 6789'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile successfully updated!');
  };

  return (
    <section className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-6">
        
        {/* Profile Avatar Header */}
        <div className="flex items-center space-x-4 pb-6 border-b border-neutral-100">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{formData.fullName}</h2>
            <div className="inline-flex items-center space-x-1.5 mt-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified {userRole || 'OFW'} Account</span>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <button 
              type="submit"
              className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-xs transition active:scale-98 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}