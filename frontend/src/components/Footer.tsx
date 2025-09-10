import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Twitter, 
  Github, 
  Mail, 
  BookOpen, 
  Users, 
  HelpCircle,
  ArrowRight,
  Heart,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Browser Extension", href: "/extension" },
      { name: "Mobile App", href: "/mobile" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { 
      name: "Twitter", 
      icon: Twitter, 
      href: "https://x.com/aaadil2004",
      color: "hover:text-blue-400"
    },
    { 
      name: "GitHub", 
      icon: Github, 
      href: "https://github.com/xoaadil",
      color: "hover:text-gray-900"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/aadil-siddiqui-88a014294/",
      color: "hover:text-blue-600"
    },
    { 
      name: "Email", 
      icon: Mail, 
      href: "mailto:contact@brainly.com",
      color: "hover:text-red-500"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Stay Updated</span>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Get the latest from Brainly
            </h3>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for product updates, tips on knowledge management, 
              and insights from our community of learners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 group">
                Subscribe
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-3 py-2 group-hover:shadow-lg transition-shadow duration-300">
                <Brain className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">Brainly</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              Your personal knowledge assistant that helps you save, organize, and revisit 
              everything important from across the web.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 text-gray-400 ${social.color} transition-colors duration-200 hover:bg-gray-100 rounded-lg`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Creator
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/aadil-siddiqui-88a014294/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200 group"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Aadil Siddiqui</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/aaadil2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-400 text-sm transition-colors duration-200 group"
                >
                  <Twitter className="h-4 w-4" />
                  <span>@aaadil2004</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/xoaadil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 group"
                >
                  <Github className="h-4 w-4" />
                  <span>xoaadil</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4 md:mb-0">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">10,000+ users</span>
              </div>
              <div className="text-gray-300">•</div>
              <div>
                <span className="font-medium">1M+ items saved</span>
              </div>
              <div className="text-gray-300">•</div>
              <div>
                <span className="font-medium">99.9% uptime</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>© {currentYear} Brainly. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for knowledge seekers.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;