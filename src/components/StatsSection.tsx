'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Scale, Users, Trophy, Briefcase } from 'lucide-react';

const stats = [
  {
    icon: Scale,
    number: 6,
    suffix: '',
    label: 'Uzmanlık Alanı',
    description: 'Farklı hukuk dalı',
  },
  {
    icon: Users,
    number: 6,
    suffix: '',
    label: 'Uzman Avukat',
    description: 'Profesyonel ekip',
  },
  {
    icon: Trophy,
    number: 15,
    suffix: '+',
    label: 'Yıllık Deneyim',
    description: 'Profesyonel hizmet',
  },
  {
    icon: Briefcase,
    number: 7,
    suffix: '/24',
    label: 'Destek Hattı',
    description: 'Her zaman yanınızda',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 bg-[#0a1628] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-[#d4af37]" />
                </div>
                
                {/* Number */}
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                
                {/* Label */}
                <h3 className="text-white font-semibold mt-2 mb-1">{stat.label}</h3>
                <p className="text-white/50 text-sm">{stat.description}</p>
              </div>

              {/* Decorative Line */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
