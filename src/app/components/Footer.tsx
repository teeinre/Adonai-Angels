import { Link } from "react-router";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <span className="font-bold text-white">Adonai Angels</span>
                <span className="block text-xs">Transforming Lives</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              A Nigerian NGO dedicated to improving lives through education, healthcare, and community development.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-purple-400 transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-purple-400 transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover:text-purple-400 transition-colors">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Education Initiative</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Healthcare Access</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Clean Water Project</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Women Empowerment</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Youth Development</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Hope Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@adonaiangels.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 Adonai Angels Co. All rights reserved. | A Nigerian Non-Governmental Organization</p>
        </div>
      </div>
    </footer>
  );
}
