import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
              Smart Investing Made <span className="text-emerald-500">Simple</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Take control of your investments with AI-powered insights, real-time market analysis, and expert-curated picks.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Everything You Need to Invest Smarter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Analysis Feature */}
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-zinc-400">
                Get instant insights from our advanced AI that analyzes market trends, news, and company data.
              </p>
            </div>

            {/* Portfolio Management Feature */}
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Portfolio Overview</h3>
              <p className="text-zinc-400">
                Track and manage your investments in real-time with our comprehensive portfolio dashboard.
              </p>
            </div>

            {/* Expert Picks Feature */}
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Picks</h3>
              <p className="text-zinc-400">
                Access curated investment picks from industry experts and our AI analysis system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-emerald-500 mb-2">10k+</div>
              <div className="text-zinc-400">Active Investors</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-emerald-500 mb-2">95%</div>
              <div className="text-zinc-400">Success Rate</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-emerald-500 mb-2">24/7</div>
              <div className="text-zinc-400">Market Analysis</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-emerald-500 mb-2">500+</div>
              <div className="text-zinc-400">Expert Picks</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            How InvestorEdge Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Create Your Account</h3>
              <p className="text-zinc-400">
                Sign up in minutes and customize your investment preferences and risk tolerance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Get AI Insights</h3>
              <p className="text-zinc-400">
                Our AI analyzes market data 24/7 to provide you with personalized investment recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Start Investing</h3>
              <p className="text-zinc-400">
                Make informed investment decisions with real-time data and expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            What Our Investors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <p className="text-zinc-400 mb-4">
                "InvestorEdge's AI analysis has completely transformed how I approach investing. The insights are invaluable."
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="text-white font-semibold">Alex Thompson</div>
                  <div className="text-emerald-500 text-sm">Professional Investor</div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <p className="text-zinc-400 mb-4">
                "The expert picks and real-time analysis have helped me make better investment decisions consistently."
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-emerald-500 text-sm">Day Trader</div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <p className="text-zinc-400 mb-4">
                "As a beginner investor, InvestorEdge's platform made it easy to understand and start investing confidently."
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="text-white font-semibold">Michael Rodriguez</div>
                  <div className="text-emerald-500 text-sm">New Investor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Choose Your Investment Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <h3 className="text-xl font-semibold text-white mb-4">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">Free</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Basic AI Analysis
                </li>
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Market Updates
                </li>
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Limited Expert Picks
                </li>
              </ul>
              <Button onClick={() => navigate('/signup')} className="w-full">
                Get Started
              </Button>
            </div>
            <div className="p-8 rounded-lg bg-emerald-600 border border-emerald-500">
              <h3 className="text-xl font-semibold text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">$29/mo</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-white mr-2" />
                  Advanced AI Analysis
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-white mr-2" />
                  Real-time Market Alerts
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-white mr-2" />
                  Unlimited Expert Picks
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-white mr-2" />
                  Portfolio Analysis
                </li>
              </ul>
              <Button onClick={() => navigate('/signup')} variant="secondary" className="w-full">
                Start Pro Trial
              </Button>
            </div>
            <div className="p-8 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Custom AI Solutions
                </li>
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Dedicated Account Manager
                </li>
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  API Access
                </li>
                <li className="flex items-center text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Custom Reporting
                </li>
              </ul>
              <Button onClick={() => navigate('/contact')} variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-zinc-700">
              <AccordionTrigger className="text-white">How does the AI analysis work?</AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                Our AI system analyzes millions of data points from market trends, news articles, company financials, and social sentiment to provide comprehensive investment insights. It uses advanced machine learning algorithms to identify patterns and make predictions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-zinc-700">
              <AccordionTrigger className="text-white">What kind of returns can I expect?</AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                While past performance doesn't guarantee future results, our AI-powered insights have helped investors achieve above-market returns. Success depends on various factors including market conditions, risk tolerance, and investment strategy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-zinc-700">
              <AccordionTrigger className="text-white">Is my investment data secure?</AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                Yes, we take security seriously. We use bank-level encryption and security measures to protect your data. Our platform is regularly audited and complies with all relevant financial regulations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-zinc-700">
              <AccordionTrigger className="text-white">Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                Yes, you can cancel your subscription at any time. There are no long-term commitments, and we offer a 30-day money-back guarantee for our Pro plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Join thousands of investors who are already using InvestorEdge to make smarter investment decisions.
          </p>
          <Button
            onClick={() => navigate('/signup')}
            className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6"
          >
            Create Your Free Account
          </Button>
        </div>
      </section>
    </div>
  )
}