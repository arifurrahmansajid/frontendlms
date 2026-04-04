import React from "react";
import Container from "../../Sharecomponent/Container";
import { FaPlayCircle, FaCheckCircle, FaUsers, FaCertificate } from "react-icons/fa";

const benefits = [
  {
    icon: <FaPlayCircle className="text-[#a435f0] w-10 h-10" />,
    title: "Over 210,000 video courses",
    description: "Build your skills in coding, business, data science, and more with the largest course catalog."
  },
  {
    icon: <FaCheckCircle className="text-[#a435f0] w-10 h-10" />,
    title: "Learn from experts",
    description: "Learn from real-world practitioners who are passionate about sharing their knowledge."
  },
  {
    icon: <FaUsers className="text-[#a435f0] w-10 h-10" />,
    title: "Global community",
    description: "Join millions of learners from around the world and share your learning journey."
  },
  {
    icon: <FaCertificate className="text-[#a435f0] w-10 h-10" />,
    title: "Earn certificates",
    description: "Earn recognized certificates and boost your career opportunities worldwide."
  }
];

const Benefits = () => {
  return (
    <section className="py-20 bg-[#f7f9fa] dark:bg-gray-800/30 transition-colors duration-300">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d2f31] dark:text-gray-100 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#6a6f73] dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
