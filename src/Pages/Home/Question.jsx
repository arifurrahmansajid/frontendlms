import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";
import { useState } from "react";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is an online course classroom?",
      answer: "An online course classroom is a virtual learning space where students can access video lectures, reading materials, assignments, quizzes, and interact with instructors and peers from anywhere in the world."
    },
    {
      question: "How do I enroll in a course?",
      answer: "Browse our courses, select the one you like, click 'Enroll Now', and complete the simple checkout process. We support multiple payment methods including cards, mobile banking, and digital wallets."
    },
    {
      question: "What materials are provided in each course?",
      answer: "Every course includes high-quality video lectures, downloadable resources, practical assignments, quizzes, and projects. Many courses also provide lifetime access and a certificate upon completion."
    },
    {
      question: "Will I receive a certificate after finishing the course?",
      answer: "Yes! You will get a verified certificate of completion for every course you successfully finish. Certificates can be shared on LinkedIn and added to your resume."
    },
    {
      question: "What if I am not satisfied with the course?",
      answer: "We offer a 30-day money-back guarantee. If you're not happy with your purchase, contact us within 30 days and we'll issue a full refund."
    },
    {
      question: "Can I access the courses on my mobile phone?",
      answer: "Yes, our platform is fully mobile-responsive. You can learn anytime, anywhere using your phone, tablet, or computer."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            title="Frequently Asked Questions" 
            subtitle="Find quick answers to the most common questions"
            center
          />

          <div className="mt-14 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full flex items-center justify-between px-7 py-6 text-left transition-all group ${
                      isOpen ? "bg-[#2d2f31] text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    <h3 className={`text-lg font-semibold pr-8 transition-colors ${isOpen ? "text-white" : "text-[#2d2f31]"}`}>
                      {faq.question}
                    </h3>

                    {/* Plus / Minus Icon */}
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all flex-shrink-0
                      ${isOpen 
                        ? "bg-white text-[#2d2f31] border-white rotate-45" 
                        : "border-gray-300 text-gray-400 group-hover:border-[#2d2f31] group-hover:text-[#2d2f31]"
                      }`}
                    >
                      <span className="text-2xl font-light leading-none">+</span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-7 pb-8 pt-1 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Extra Help */}
          <div className="text-center mt-12 text-gray-500">
            Still have questions?{" "}
            <a href="#" className="text-[#2d2f31] font-medium hover:underline">
              Contact our support team
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Question;