import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserPlan } from "@/hooks/use-plan-protection";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Crown,
  MessageSquare,
  Sparkles,
  Users,
  Globe,
  Lock,
} from "lucide-react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { plan } = useUserPlan();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Check if user is logged in
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Plan-based routing logic for CTA buttons
  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleCRMToolsClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else if (
      plan === "crm" ||
      plan === "enterprise" ||
      plan === "white_label"
    ) {
      navigate("/partnertech");
    } else {
      navigate("/upgrade");
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative">
      {/* Hero Background Image - Parallax Layer 2 */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.6) 0%, rgba(16, 22, 28, 0.5) 100%), 
                                                      url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800')`,
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Enhanced Navigation Logo */}
            <div className="flex items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
                alt="SaintVisionAI Logo"
                className="w-16 h-16 object-contain transition-all duration-300 hover:scale-105"
                style={{
                  filter: "brightness(1.05) contrast(1.02)",
                }}
              />
            </div>
          </div>
          <div className="ml-1">
            <h1 className="text-2xl font-bold text-white tracking-tight font-dialien drop-shadow-lg">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1 font-medium drop-shadow-sm">
              Cookin' Knowledge
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/dashboard"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/pricing"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/why"
            className="text-white/80 hover:text-gold-300 transition-colors flex items-center space-x-2"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F4f08aaff66374bf3bd72e740c34ecf44"
              alt="SaintSal + You"
              className="w-6 h-6 object-contain"
            />
            <span>Why Us</span>
          </Link>
          <Link
            to="/help"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Help
          </Link>
          <Link to="/signin">
            <Button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              Sign In
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
              Start Cookin'
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div
          className={`transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Logo/Brand */}
          <div className="mb-8">
            <div className="relative inline-block -mt-1 -mb-1">
              <img
                src="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/better-saintsal-transparent-d9c734"
                alt="SaintVisionAI Logo"
                className="h-60 object-contain mx-auto mb-11"
                style={{ width: "367px" }}
              />
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="saintvision-gradient-text font-dialien">
              SaintSal™
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gold-300 mb-6 font-medium font-dropline">
            Cookin' Knowledge.
          </h2>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl">
            AI doesn't just answer. It{" "}
            <span className="text-blue-400 font-medium">adapts</span>. It{" "}
            <span className="text-purple-400 font-medium">empowers</span>. It
            becomes
            <span className="text-gold-300 font-semibold">
              {" "}
              your enterprise companion
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
            <Button
              size="lg"
              onClick={handleDashboardClick}
              className="text-yellow-400 hover:text-yellow-300 text-xl font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent group hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
            >
              {isLoggedIn ? "Go to Dashboard" : "Start Cookin' Knowledge"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={handleCRMToolsClick}
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]"
            >
              Try CRM Tools
              <Shield className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Elite Technology Badge */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="glass-morphism rounded-full px-6 py-3 mb-8">
            <p className="text-gold-300 font-semibold text-sm uppercase tracking-wider">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Enterprise Ready
            </p>
          </div>
        </div>
      </div>

      {/* "Ready to move smarter today than you did yesterday?" Section */}
      <div className="relative z-40 py-24">
        <div
          className="max-w-4xl mx-auto px-6 text-center"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium italic leading-relaxed">
            "Ready to move smarter today than you did yesterday?"
          </p>
        </div>
      </div>

      {/* Why Us Section with Parallax */}
      <div className="relative z-40 mt-32">
        {/* Parallax Background Layer for Why Us */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(16, 22, 28, 0.9) 100%),
                              url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F22cb418039d54547a5ff9e47017af7b5?format=webp&width=800')`,
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        ></div>

        {/* Why Us Content */}
        <div
          className="relative z-50 py-24 px-6 text-center transition-all duration-500"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[50%] max-md:w-full">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 saintvision-gradient-text font-dialien">
                    What Separates Us?
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                    Discover why thousands choose{" "}
                    <span className="text-gold-300 font-semibold">
                      SaintSal™
                    </span>{" "}
                    as their enterprise AI companion
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="glass-morphism p-6 rounded-xl">
                    <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Dual AI Power
                    </h3>
                    <p className="text-white/70">
                      GPT-4o + Azure Cognitive Services
                    </p>
                  </div>
                  <div className="glass-morphism p-6 rounded-xl">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Enterprise Security
                    </h3>
                    <p className="text-white/70">
                      Faith-aligned, private, and secure
                    </p>
                  </div>
                  <div className="glass-morphism p-6 rounded-xl">
                    <Crown className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Elite Technology
                    </h3>
                    <p className="text-white/70">
                      Premium infrastructure & reliability
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  onClick={() => navigate("/why")}
                  className="text-gold-400 hover:text-gold-300 text-xl font-semibold transition-all duration-300 bg-transparent border-2 border-gold-400/30 hover:border-gold-300/50 shadow-none hover:bg-gold-400/10 hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] flex items-center"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F5eec4913fd834435a30d54f7c467acb9?format=webp&width=800"
                    alt="What Separates Us Icon"
                    className="w-6 h-6 object-contain mr-3"
                  />
                  What Separates Us
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-[50%] ml-5 max-md:w-full max-md:ml-0">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=100 100w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=200 200w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=400 400w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=800 800w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=1200 1200w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=1600 1600w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999?width=2000 2000w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/frame-1000002501-dcc999"
                className="object-cover object-center w-full aspect-[1.78] mt-5 max-md:mt-10"
                alt="What Separates Us"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elite Technology Section */}
      <div className="relative z-40 py-32">
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien">
              Elite Technology
            </h2>
            <p className="text-xl text-gold-300 font-medium mb-4">
              ENTERPRISE READY
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dual AI systems handle your business operations while you focus on
              what matters - growing your empire.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-morphism p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-gold-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Business Strategy
              </h3>
              <p className="text-white/70 leading-relaxed">
                AI that analyzes market trends, automates research, and
                strategizes planning powered by dual AI engines.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                CRM Integration
              </h3>
              <p className="text-white/70 leading-relaxed">
                Seamlessly connect with GoHighLevel, automate follow-ups, and
                intelligent lead scoring.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Growth Analytics
              </h3>
              <p className="text-white/70 leading-relaxed">
                Real-time insights with actionable intelligence to scale faster
                with smarter business decisions.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={handleCRMToolsClick}
              className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/why")}
              className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              View Plans
            </Button>
          </div>
        </div>
      </div>

      {/* PartnerTech AI Section */}
      <div className="relative z-40 py-32">
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien">
              PartnerTech AI
            </h2>
            <p className="text-xl text-gold-300 font-medium mb-4">
              Premium Tier
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              When you're ready to scale. Advanced CRM integration, Chrome
              extension automation, AI-triggered workflows, and intelligent
              client routing systems.
            </p>
          </div>

          {/* Main Feature Display */}
          <div className="flex gap-8 max-lg:flex-col items-center justify-center mb-16">
            {/* Left Side - Feature List */}
            <div className="flex flex-col w-[400px] max-lg:w-full">
              <div className="glass-morphism p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center mr-4">
                    <Crown className="w-6 h-6 text-charcoal-900" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      PartnerTech AI
                    </h3>
                    <p className="text-gold-300 text-sm">Premium Tier</p>
                  </div>
                </div>

                <p className="text-white/80 mb-6 leading-relaxed">
                  When you're ready to scale. Advanced CRM integration, Chrome
                  extension automation, AI-triggered workflows, and intelligent
                  client routing systems.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">
                      Enterprise CRM integration
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">
                      Chrome extension automation
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">AI workflow triggers</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  onClick={handleCRMToolsClick}
                  className="w-full bg-charcoal-800 hover:bg-charcoal-700 text-gold-300 border border-gold-500/30 hover:border-gold-400/50 transition-all duration-300"
                >
                  Unlock Partner Access
                </Button>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex flex-col w-[600px] max-lg:w-full">
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-best-slide-background-of-all-time-ccd7b5"
                  alt="PartnerTech AI Dashboard"
                  className="w-full rounded-2xl shadow-2xl"
                />

                {/* Overlay Features */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-2xl">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-2">
                      PartnerTech Suite
                    </h4>
                    <p className="text-gold-300">
                      Advanced CRM • Chrome • Triggers • AI Logic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="font-semibold mb-2">CRM</h4>
              <p className="text-white/70 text-sm">GoHighLevel integration</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-300" />
              </div>
              <h4 className="font-semibold mb-2">Chrome</h4>
              <p className="text-white/70 text-sm">Browser automation</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-300" />
              </div>
              <h4 className="font-semibold mb-2">Triggers</h4>
              <p className="text-white/70 text-sm">Workflow automation</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-gold-300" />
              </div>
              <h4 className="font-semibold mb-2">AI Logic</h4>
              <p className="text-white/70 text-sm">Intelligent routing</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleCRMToolsClick}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow mr-4"
            >
              Upgrade to Premium
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/why")}
              className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Vault and Security Section */}
      <div className="relative z-40 py-32 bg-charcoal-800/50">
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien">
              Vault & Security
            </h2>
            <p className="text-xl text-gold-300 font-medium mb-4">
              Faith-Aligned Data Protection
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Bank-grade security meets faith-centered values. Your data
              protected with military-grade encryption and ethical business
              practices.
            </p>
          </div>

          {/* Main Security Display */}
          <div className="flex gap-8 max-lg:flex-col items-start justify-center mb-16">
            {/* Faith-Aligned Vault */}
            <div className="flex flex-col w-[400px] max-lg:w-full">
              <div className="glass-morphism p-8 rounded-2xl border border-green-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-8 h-8 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Faith-Aligned Vault
                    </h3>
                    <p className="text-green-300 text-sm">
                      Secure. Private. Moral.
                    </p>
                  </div>
                </div>

                <p className="text-white/80 mb-6 leading-relaxed">
                  Your conversations, billing data, and personal information
                  protected with ethical encryption and faith-based principles.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Secure Private Vault</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">End-to-end encryption</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Secure Stripe billing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">Bank-based encryption</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">
                      Faith-centered data practices
                    </span>
                  </li>
                </ul>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-medium">
                      Enterprise Security
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Protected Data Vault */}
            <div className="flex flex-col w-[400px] max-lg:w-full">
              <div className="glass-morphism p-8 rounded-2xl border border-blue-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Lock className="w-8 h-8 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Protected Data Vault
                    </h3>
                    <p className="text-blue-300 text-sm">
                      Military-Grade Protection
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Encryption Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-300 font-medium">
                        AES-256 Active
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Data Location</span>
                    <span className="text-blue-300 font-medium">
                      Private Cloud
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Access Control</span>
                    <span className="text-purple-300 font-medium">
                      Role-Based
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Ethics Compliance</span>
                    <span className="text-gold-300 font-medium">
                      Faith-Aligned
                    </span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-300" />
                    <span className="text-blue-300 font-medium">
                      99.99% Uptime SLA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="glass-morphism p-6 rounded-xl text-center border border-green-500/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <h4 className="font-semibold mb-2 text-green-300">AES-256</h4>
              <p className="text-white/70 text-sm">Military-grade encryption</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center border border-blue-500/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="font-semibold mb-2 text-blue-300">Zero-Trust</h4>
              <p className="text-white/70 text-sm">Role-based access control</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center border border-purple-500/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-300" />
              </div>
              <h4 className="font-semibold mb-2 text-purple-300">
                Private Cloud
              </h4>
              <p className="text-white/70 text-sm">Dedicated infrastructure</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center border border-gold-500/10">
              <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-gold-300" />
              </div>
              <h4 className="font-semibold mb-2 text-gold-300">
                Faith-Aligned
              </h4>
              <p className="text-white/70 text-sm">Ethical data practices</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-white/60 mb-6">
              Trusted by thousands of faith-based businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Faith-Centered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>99.99% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elite AI Sanctuary - The Movement */}
      <div className="relative z-40 py-32 overflow-hidden">
        {/* Wall Street Background - Gorgeous Realistic Deep */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F89f844d10b5e4243a2178ad3de7a9f4f')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
            filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
          }}
        ></div>

        {/* Deep Realistic Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/95 via-charcoal-900/75 to-charcoal-900/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-transparent to-charcoal-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Content Overlay with Sharp Focus */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          {/* Movement Header */}
          <div className="mb-12">
            <p className="text-gold-300 font-medium text-sm uppercase tracking-wider mb-4 drop-shadow-2xl">
              THE MOVEMENT
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien drop-shadow-2xl">
              Elite AI Sanctuary
            </h2>
            <div className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-gold-500/30 max-w-4xl mx-auto mb-8">
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
                Built for those who refuse to compromise on excellence, privacy,
                or values. Join thousands who've discovered their{" "}
                <span className="text-gold-300 font-bold drop-shadow-lg saintvision-glow">
                  GOTTA GUY®
                </span>
                .
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="glass-morphism p-8 rounded-2xl max-w-4xl mx-auto mb-12 border border-gold-500/20">
            <div className="flex items-center justify-center mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
                alt="SaintSal Logo"
                className="w-12 h-12 mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-gold-300">
                  SAINTSAL® • Cookin' Knowledge
                </h3>
              </div>
            </div>

            <blockquote className="text-lg md:text-xl text-white/90 italic mb-6 leading-relaxed">
              "We built this for the builders, the believers, the ones who
              demand more than chatbots. This is enterprise AI with a soul,
              technology with values, innovation with integrity."
            </blockquote>

            <div className="text-center">
              <p className="text-gold-300 font-medium mb-2">
                ✦ SaintVisionAI™ Access
              </p>
              <p className="text-white/70 text-sm">
                Azure Cognitive Services • OpenAI GPT-4o ⚊⚊ Premium
                Infrastructure
              </p>
            </div>
          </div>

          {/* Movement CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={handleDashboardClick}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 text-xl font-bold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
            >
              Join The Movement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/why")}
              className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Discover Your Guy
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
