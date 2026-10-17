'use client';

export function StepsSection() {
  const steps = [
    {
      num: '01',
      title: 'Choose',
      desc: 'Follow your curiosity and choose the practice that feels right for you.',
    },
    {
      num: '02',
      title: 'Book',
      desc: 'Choose a time and settle into a space where you feel comfortable.',
    },
    {
      num: '03',
      title: 'Connect',
      desc: 'Join your private online session and arrive exactly as you are.',
    },
    {
      num: '04',
      title: 'Explore',
      desc: 'Ask questions, share what you\u2019re experiencing and explore what the practice reveals.',
    },
    {
      num: '05',
      title: 'Take What Resonates',
      desc: 'Keep what feels meaningful, leave what doesn\u2019t, and take your own next step.',
    },
  ];

  return (
    <section 
      id="steps"
      className="text-[#1A1F2C] py-20 px-6 border-t border-[#A37D42]/20"
      style={{ backgroundColor: '#F1EDE2' }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="max-w-2xl space-y-2.5">
          <p className="text-[#A37D42] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
            HOW A SESSION WORKS
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15]"
            style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}
          >
            Your Session. Your Space.
          </h2>
          <p className="text-sm sm:text-[15px] text-[#555C6E] leading-relaxed font-light">
            No expectations. No judgement. No need to have everything figured out.
          </p>
        </div>

        {/* 5 Steps Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`flex flex-col space-y-2.5 ${
                idx > 0 ? 'lg:border-l lg:border-[#A37D42]/25 lg:pl-5 xl:pl-6' : ''
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
                className="text-base sm:text-lg font-medium text-[#1A1F2C]"
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
