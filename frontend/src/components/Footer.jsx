import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-2 pt-4">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-8 justify-center md:justify-between md:flex md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Zone</h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Connecting talented professionals with innovative companies. Find
              your dream job or your next perfect hire with ease.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>Email: support@jobzone.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Location: New York, USA</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow hover:text-blue-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow hover:text-sky-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow hover:text-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
