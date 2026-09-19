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
    <section className="bg-[#F6F3EE] text-[#1A1F2C] py-24 px-6 border-t border-[#CFA56A]/20">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 xl:gap-12 items-start xl:items-center">
        
        {/* Header */}
        <div className="xl:w-1/3">
          <p className="text-[#CFA56A] text-xs tracking-[0.25em] uppercase font-mono mb-4 font-semibold">
            HOW A SESSION WORKS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
            Your Session,<br />Your Space
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col relative">
              <div className="flex items-center gap-3 mb-4">
                {/* Decorative Diamond */}
                <div className="w-2.5 h-2.5 rotate-45 border border-[#CFA56A]"></div>
                <span className="text-[#CFA56A] text-lg font-mono font-medium">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl mb-2 font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
                {step.title}
              </h3>
              <p className="text-[#555C6E] text-xs sm:text-[13px] leading-relaxed font-normal">
                {step.desc}
              </p>
              
              {/* Connector Line for Desktop */}
              {step.num !== '04' && (
                <div className="hidden lg:block absolute top-3 left-[45px] right-[-15px] h-[1px] bg-[#CFA56A]/25 -z-10"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
