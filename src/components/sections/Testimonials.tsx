import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Our backyard went from a plain, unusable, boring area to a serene retreat with native plants and a stylish fire pit—all planned remotely and flawlessly executed.",
      author: "Tom",
      location: "Private Residence"
    },
    {
      quote: "The perfect design was created by Michele and Tommy to not only include my pool but a master plan for the entire backyard",
      author: "Amy",
      location: "Estate Homeowner"
    }
  ];

  return (
    <section id="testimonials" className="snap-section-auto bg-[#F5F1EA] text-[#1C1A17] border-t border-[#1C1A17]/10">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="eyebrow eyebrow-light">Client Perspectives</span>
          {/* Fix 2: Section headline keeps visual dominance on mobile */}
          <h2 className="section-title section-title-dark text-[2rem] sm:text-5xl">Voices of Transformation</h2>
        </div>

        {/* Fix 6: On mobile, testimonials stack with generous gap and relaxed
            serif text at text-xl (20px) — staying above body-copy size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between border-l-2 border-[#B5652E] pl-6 sm:pl-8 py-2"
            >
              <div>
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#B5652E] mb-4 sm:mb-5 opacity-60" />
                <blockquote className="font-serif text-xl sm:text-3xl text-[#1C1A17] font-normal leading-[1.35] sm:leading-relaxed mb-6 italic">
                  "{item.quote}"
                </blockquote>
              </div>

              <div>
                <cite className="not-italic font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#1C1A17] block">
                  — {item.author}
                </cite>
                <span className="text-xs text-[#666055] font-light">
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
