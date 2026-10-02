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
    <section 
      id="steps"
      className="text-[#1A1F2C] py-20 px-6 border-t border-[#A37D42]/20"
      style={{ backgroundColor: '#F1EDE2' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column — Header */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-[#A37D42] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
            HOW A SESSION WORKS
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15]"
            style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}
          >
            Your Session,<br />Your Space
          </h2>
        </div>

        {/* Right Column — 4 Steps Horizontal Layout with Dividers */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`flex flex-col space-y-2.5 ${
                idx > 0 ? 'lg:border-l lg:border-[#A37D42]/25 lg:pl-6 xl:pl-8' : ''
              }`}
            >
              {/* Header with Star and Number */}
              <div className="flex items-center gap-2 text-[#A37D42]">
                <span className="text-xs">✦</span>
                <span className="text-base sm:text-lg font-mono font-medium tracking-wider">
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-medium text-[#1A1F2C]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#555C6E] text-xs sm:text-[13px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
