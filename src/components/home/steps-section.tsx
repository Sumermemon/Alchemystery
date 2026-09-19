'use client';

export function StepsSection() {
  const steps = [
    {
      num: '01',
      title: 'Choose',
      desc: 'Explore the sessions and select what resonates with you.',
    },
    {
      num: '02',
      title: 'Book',
      desc: 'Schedule your session at a convenient time.',
    },
    {
      num: '03',
      title: 'Connect',
      desc: 'Join online from a quiet, comfortable space.',
    },
    {
      num: '04',
      title: 'Reflect',
      desc: 'Leave with insights, perspective and a renewed sense of clarity.',
    },
  ];

  return (
    <section className="bg-[var(--color-ivory)] text-[#0B0F1E] py-24 px-6 border-t border-[#d4b86a]/10">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 xl:gap-8 items-start xl:items-center">
        
        {/* Header */}
        <div className="xl:w-1/4">
          <p className="text-[var(--color-gold-100)] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
            HOW A SESSION WORKS
          </p>
          <h2 className="text-4xl leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>
            Your Session, Your Space
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="xl:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col relative">
              <div className="flex items-center gap-4 mb-4">
                {/* Decorative Diamond */}
                <div className="w-2 h-2 rotate-45 border border-[var(--color-gold-100)]"></div>
                <span className="text-[var(--color-gold-100)] text-xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl mb-3 font-semibold" style={{ color: '#0B0F1E' }}>
                {step.title}
              </h3>
              <p className="text-[#4a5568] text-sm leading-relaxed font-medium">
                {step.desc}
              </p>
              
              {/* Connector Line for Desktop */}
              {step.num !== '04' && (
                <div className="hidden lg:block absolute top-3 left-[40px] right-[-20px] h-[1px] bg-[var(--color-gold-100)]/30 -z-10"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
