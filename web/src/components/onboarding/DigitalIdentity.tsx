'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  Globe,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface DigitalIdentityProps {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  contactNumber: string;
  setContactNumber: (v: string) => void;
  beneficiary: string;
  setBeneficiary: (v: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function DigitalIdentity({ 
  fullName, 
  setFullName, 
  email, 
  setEmail, 
  contactNumber, 
  setContactNumber,
  beneficiary,
  setBeneficiary,
  onContinue, 
  onBack 
}: DigitalIdentityProps) {
  // --- Local Form States (Unshared Fields) ---
  const [birthdate, setBirthdate] = useState('2005-12-31');
  const [birthplace, setBirthplace] = useState('1234');
  const [nationality, setNationality] = useState('213');
  const [altEmail, setAltEmail] = useState('wsad');
  const [userAddress, setUserAddress] = useState('asdf');
  const [userIdType, setUserIdType] = useState('asdf');
  const [userIdNum, setUserIdNum] = useState('sdf');
  const [userTin, setUserTin] = useState('');

  const [primRel, setPrimRel] = useState('ASXD');
  const [primDob, setPrimDob] = useState('2005-02-31');
  const [primPhone, setPrimPhone] = useState('qwsed');
  const [primEmail, setPrimEmail] = useState('swqedf');
  const [primAddress, setPrimAddress] = useState('asdf');
  const [primIdType, setPrimIdType] = useState('asdf');
  const [primIdNum, setPrimIdNum] = useState('sdf');
  const [primTin, setPrimTin] = useState('');

  const [showSecondary, setShowSecondary] = useState(false);
  const [secName, setSecName] = useState('');
  const [secRel, setSecRel] = useState('');
  const [secDob, setSecDob] = useState('');
  const [secPhone, setSecPhone] = useState('');
  const [secEmail, setSecEmail] = useState('');
  const [secAddress, setSecAddress] = useState('');
  const [secIdType, setSecIdType] = useState('');
  const [secIdNum, setSecIdNum] = useState('');
  const [secTin, setSecTin] = useState('');

  // --- Flexible Validation Check ---
  // Ensuring all required fields are filled without throwing HTML validation blockages.
  const isFormValid = 
    fullName.trim() !== '' && 
    birthdate !== '' && 
    birthplace.trim() !== '' &&
    nationality.trim() !== '' &&
    email.trim() !== '' && 
    altEmail.trim() !== '' &&
    contactNumber.trim() !== '' &&
    userAddress.trim() !== '' &&
    userIdType.trim() !== '' &&
    userIdNum.trim() !== '' &&
    beneficiary.trim() !== '' && 
    primRel.trim() !== '' && 
    primDob !== '' && 
    primPhone.trim() !== '' && 
    primEmail.trim() !== '' && 
    primAddress.trim() !== '' && 
    primIdType.trim() !== '' && 
    primIdNum.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-4xl"
    >
      <div className="space-y-8">
        <div>
          <h2 className="mb-3 font-serif text-3xl text-[#243B53] md:text-4xl">
            Establish Digital Identity
          </h2>
          <p className="text-base leading-relaxed text-[#2D3142]/75">
            Provide your details to register your profile. This binds your permanent identity and your beneficiaries to your secure vault contents before setting up cryptographic security.
          </p>
        </div>

        {/* 1. USER INFORMATION (REQUIRED) */}
        <div className="rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-lg font-semibold text-[#243B53] mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-[#84A98C]" /> Personal Information <span className="text-xs text-red-500 font-normal">(Required)</span>
          </h3>
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Full Legal Name <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>

              <label className="block text-sm font-medium text-[#2D3142]/80">
                Date of Birth <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <Calendar className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35 pointer-events-none" />
                </div>
              </label>

              <label className="block text-sm font-medium text-[#2D3142]/80">
                Place of Birth <span className="text-red-500">*</span>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={birthplace}
                  onChange={(e) => setBirthplace(e.target.value)}
                  className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Nationality / Citizenship <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="e.g. American, Filipino"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <Globe className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>
              
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Contact Number <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="+63 900 000 0000"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Primary Email Address <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>

              <label className="block text-sm font-medium text-[#2D3142]/80">
                Alternative Contact / Recovery Email <span className="text-red-500">*</span>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="backup-email@example.com"
                    value={altEmail}
                    onChange={(e) => setAltEmail(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                  />
                  <ShieldCheck className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>
            </div>

            <label className="block text-sm font-medium text-[#2D3142]/80">
              Permanent Residential Address <span className="text-red-500">*</span>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Complete Physical Mailing Address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-white px-4 pr-12 text-[#243B53] outline-none transition focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/10"
                />
                <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
              </div>
            </label>

            <div className="grid gap-5 md:grid-cols-3 border-t border-[#243B53]/5 pt-4">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Government ID Type <span className="text-red-500">*</span>
                <input type="text" placeholder="Passport, Driver's License" value={userIdType} onChange={(e) => setUserIdType(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                ID Identification Number <span className="text-red-500">*</span>
                <input type="text" placeholder="ID Registration Code Number" value={userIdNum} onChange={(e) => setUserIdNum(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                TIN / SSN <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                <input type="text" placeholder="Tax Compliance Identifier" value={userTin} onChange={(e) => setUserTin(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
            </div>
          </div>
        </div>

        {/* 2. PRIMARY BENEFICIARY (REQUIRED) */}
        <div className="rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-lg font-semibold text-[#243B53] mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#E9C46A]" /> Primary Beneficiary <span className="text-xs text-red-500 font-normal">(Required)</span>
          </h3>
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Full Legal Name <span className="text-red-500">*</span>
                <input type="text" placeholder="Jane Doe" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Relationship to User <span className="text-red-500">*</span>
                <input type="text" placeholder="Spouse, Child, Sibling" value={primRel} onChange={(e) => setPrimRel(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Date of Birth <span className="text-red-500">*</span>
                <input type="text" placeholder="YYYY-MM-DD" value={primDob} onChange={(e) => setPrimDob(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Contact Phone <span className="text-red-500">*</span>
                <input type="text" placeholder="+63 900 000 0000" value={primPhone} onChange={(e) => setPrimPhone(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Email Address <span className="text-red-500">*</span>
                <input type="text" placeholder="jane@example.com" value={primEmail} onChange={(e) => setPrimEmail(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
            </div>

            <label className="block text-sm font-medium text-[#2D3142]/80">
              Current Address <span className="text-red-500">*</span>
              <div className="relative mt-2">
                <input type="text" placeholder="Complete Physical Mailing Address" value={primAddress} onChange={(e) => setPrimAddress(e.target.value)} className="h-12 w-full rounded-lg border border-[#243B53]/20 px-4 pr-12 text-[#243B53] outline-none focus:border-[#243B53]" />
                <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
              </div>
            </label>

            <div className="grid gap-5 md:grid-cols-3 border-t border-[#243B53]/5 pt-4">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Government ID Type <span className="text-red-500">*</span>
                <input type="text" placeholder="Passport, Driver's License" value={primIdType} onChange={(e) => setPrimIdType(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                ID Identification Number <span className="text-red-500">*</span>
                <input type="text" placeholder="N01-XX-XXXXX" value={primIdNum} onChange={(e) => setPrimIdNum(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                TIN / SSN <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                <input type="text" placeholder="Tax Number (Compliance)" value={primTin} onChange={(e) => setPrimTin(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none focus:border-[#243B53]" />
              </label>
            </div>
          </div>
        </div>

        {/* 3. SECONDARY BENEFICIARY (OPTIONAL ACCORDION) */}
        <div className="rounded-2xl border border-[#243B53]/10 bg-white overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setShowSecondary(!showSecondary)}
            className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100/70 transition-colors"
          >
            <span className="text-base font-semibold text-[#243B53] flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" /> Secondary Beneficiary <span className="text-xs text-gray-500 font-normal">(Optional but recommended)</span>
            </span>
            {showSecondary ? <ChevronUp className="h-5 w-5 text-[#243B53]" /> : <ChevronDown className="h-5 w-5 text-[#243B53]" />}
          </button>
          
          {showSecondary && (
            <div className="p-6 md:p-8 border-t border-[#243B53]/10 space-y-5 bg-white">
              <div className="grid gap-5 md:grid-cols-3">
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Full Legal Name
                  <input type="text" placeholder="Backup Beneficiary Name" value={secName} onChange={(e) => setSecName(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Relationship to User
                  <input type="text" placeholder="Relationship" value={secRel} onChange={(e) => setSecRel(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Date of Birth
                  <input type="text" placeholder="YYYY-MM-DD" value={secDob} onChange={(e) => setSecDob(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
                </label>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Contact Phone
                  <input type="text" placeholder="+63 900 000 0000" value={secPhone} onChange={(e) => setSecPhone(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Email Address
                  <input type="text" placeholder="secondary@example.com" value={secEmail} onChange={(e) => setSecEmail(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
                </label>
              </div>
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Current Address
                <input type="text" placeholder="Complete Physical Mailing Address" value={secAddress} onChange={(e) => setSecAddress(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 px-4 text-[#243B53]" />
              </label>
              <div className="grid gap-5 md:grid-cols-3 border-t border-gray-100 pt-4">
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Government ID Type
                  <input type="text" placeholder="ID Type" value={secIdType} onChange={(e) => setSecIdType(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53]" />
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  ID Identification Number
                  <input type="text" placeholder="ID Number" value={secIdNum} onChange={(e) => setSecIdNum(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53]" />
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  TIN / SSN
                  <input type="text" placeholder="Optional Tax ID" value={secTin} onChange={(e) => setSecTin(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53]" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION TRACK */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#243B53]/10">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto order-2 sm:order-1 px-8 py-3 rounded-xl border border-[#243B53]/20 text-sm font-medium text-[#243B53] transition-colors hover:bg-[#243B53]/5"
          >
            Cancel and Go Back
          </button>
          
          <button
            type="button"
            disabled={!isFormValid}
            onClick={onContinue}
            className={`w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 ${
              isFormValid 
                ? 'bg-[#243B53] hover:bg-[#1C2F42] shadow-md cursor-pointer' 
                : 'bg-gray-300 opacity-60 cursor-not-allowed text-gray-500'
            }`}
          >
            Save and Continue to Final Security
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}