import { ArrowRight, CheckCircle, Users, Upload, FileText, BarChart2, Send, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: 'AI-Powered',
      description: 'Smart automation that learns and adapts to your onboarding process'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Client-Centric',
      description: 'Deliver a seamless experience that impresses your clients'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security for your sensitive client data'
    }
  ];

  const steps = [
    {
      title: '1. Create',
      description: 'Set up your custom onboarding flow in minutes',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: '2. Invite',
      description: 'Send personalized invitations to your clients',
      icon: <Send className="w-5 h-5" />
    },
    {
      title: '3. Automate',
      description: 'Let our AI handle the rest and track progress',
      icon: <BarChart2 className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            AlphaOnboard
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Pricing</a>
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Onboard Clients <span className="text-blue-600 dark:text-blue-400">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            The AI-powered platform that transforms your client onboarding from a chore into a competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
            <a 
              href="#demo" 
              className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Seamless Onboarding
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your client onboarding process with our powerful tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes and transform your client onboarding
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={index} className="relative pl-16 group">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-200">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Onboarding?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of agencies and freelancers who trust AlphaOnboard for their client onboarding needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <a 
              href="#demo" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-medium transition duration-200"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">AlphaOnboard</h3>
              <p className="mb-4">The modern way to onboard clients and grow your business.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">n                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Guides</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 AlphaOnboard. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">Terms</a>
                <a href="#" className="hover:text-white transition">Privacy</a>
                <a href="#" className="hover:text-white transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
