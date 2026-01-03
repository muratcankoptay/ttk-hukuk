export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#d4af37]/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#d4af37] rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            TTK HUKUK
          </h2>
          <p className="text-[#d4af37] text-sm mt-1">Yükleniyor...</p>
        </div>
      </div>
    </div>
  );
}
