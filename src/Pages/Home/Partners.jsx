import Container from "../../Sharecomponent/Container";
import geeks from "../../assets/geeks.png";
import w3logo from "../../assets/w3logo.png";
import ciscoLogo from "../../assets/ciscoLogo.png";
import wordpressLogo from "../../assets/wordpressLogo.png";
import coursera from "../../assets/coursera-icon.png";
import udemyLogo from "../../assets/udemyLogo.png";
import SectionHeader from "../../components/SectionHeader";
const Partners = () => {
  return (
    <div className="bg-[#f7f9fa] py-12 border-b border-[#d1d7dc]">
      <Container>
        <div className="text-center">
          <p className="text-[#6a6f73] text-lg font-medium mb-8">
            Trusted by over 16,000+ companies and millions of learners worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={geeks}
              alt="geeks"
            />
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={w3logo}
              alt="w3school"
            />
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={ciscoLogo}
              alt="cisco"
            />
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={wordpressLogo}
              alt="wordpress"
            />
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={coursera}
              alt="coursera"
            />
            <img
              className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              src={udemyLogo}
              alt="udemy"
            />
          </div>
        </div>
      </Container>
    </div>

  );
};

export default Partners;
