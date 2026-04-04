import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "./Container";
import logo from "../assets/3.png";

const Footer = () => {
  return (
    <footer className="bg-[#2d2f31] text-white pt-16 pb-8 border-t border-gray-700">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1 */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-4">EduHub Business</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/techon" className="hover:underline transition-all">Teach on EduHub</Link></li>
                <li><a href="#" className="hover:underline transition-all">Get the app</a></li>
                <li><a href="#" className="hover:underline transition-all">About us</a></li>
                <li><a href="#" className="hover:underline transition-all">Contact us</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-4">Careers</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline transition-all">Blog</a></li>
                <li><a href="#" className="hover:underline transition-all">Help and Support</a></li>
                <li><a href="#" className="hover:underline transition-all">Affiliate</a></li>
                <li><a href="#" className="hover:underline transition-all">Investors</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-4">Terms</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline transition-all">Privacy policy</a></li>
                <li><a href="#" className="hover:underline transition-all">Cookie settings</a></li>
                <li><a href="#" className="hover:underline transition-all">Sitemap</a></li>
                <li><a href="#" className="hover:underline transition-all">Accessibility statement</a></li>
              </ul>
            </div>

            {/* Column 4: Language Selector Mockup */}
            <div className="flex flex-col items-end">
              <button className="flex items-center gap-2 border border-white px-6 py-2 hover:bg-white/10 transition-all font-bold">
                <FaGlobe />
                <span>English</span>
              </button>
            </div>
          </div>

          {/* Middle Section: Branding & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700 gap-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EduHub" className="h-10 opacity-90" />
              <span className="text-2xl font-bold tracking-tighter">
                Edu<span className="text-[#a435f0]">Hub</span>
              </span>
            </div>

            <div className="flex gap-6 text-2xl">
              <a href="#" className="hover:text-[#a435f0] transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-[#a435f0] transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-[#a435f0] transition-colors"><FaLinkedin /></a>
              <a href="#" className="hover:text-[#a435f0] transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-[#a435f0] transition-colors"><FaYoutube /></a>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="mt-12 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} EduHub, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Local Support</a>
              <a href="#" className="hover:text-white transition-colors">Trust & Safety</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;