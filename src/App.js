// src/App.js
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModal";
import WaitlistSection from "./components/WaitlistSection";
import "./App.css";

// Main app content that uses authentication
function AppContent() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("Professional");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme || (prefersDark ? "dark" : "light")
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleJoinWaitlistClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      setAuthAction("joinWaitlist");
    } else {
      // Scroll to waitlist section
      document.getElementById("waitlist").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleGetEarlyAccess = () => {
    document.getElementById("waitlist").scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleAuthSuccess = () => {
    if (authAction === "joinWaitlist") {
      document.getElementById("waitlist").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Use cases data
  const useCases = {
    Professional: {
      title: "Professional Email Assistance",
      description:
        "Cue helps you craft perfectly professional emails that make the right impression.",
      original: '"hey i need that report asap thanks"',
      enhanced:
        '"Hello [Name], I hope you\'re having a productive week. Could you please prioritize sending over the report when you have a moment? Thank you for your assistance."',
    },
    Dating: {
      title: "Dating Message Assistance",
      description:
        "Cue helps you craft engaging and appropriate messages for dating scenarios.",
      original: '"hey"',
      enhanced:
        '"Hi [Name], I really enjoyed our conversation yesterday and was wondering if you\'d like to continue it over coffee this weekend?"',
    },
    Social: {
      title: "Social Media Assistance",
      description:
        "Cue helps you create engaging social media posts and responses.",
      original: '"This is a cool post"',
      enhanced:
        '"This is an incredibly insightful post! I particularly liked your point about [specific detail]. It really resonates with my experience in [relevant context]."',
    },
    Customer: {
      title: "Customer Service Response",
      description:
        "Cue helps you provide professional and empathetic customer service responses.",
      original: '"The product is broken"',
      enhanced:
        "\"I'm sorry to hear you're experiencing issues with the product. Let's get this resolved for you. Could you please provide more details about the problem you're encountering?\"",
    },
  };

  return (
    <div className="App">
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <span className="theme-label">Dark Mode</span>
        <label className="dreamtime-toggle">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="dreamtime-slider">
            <div className="toggle-icons">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 极速16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 极速12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.93 4.93L6.34 6.34"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.66 17.66L19.07 19.07"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke极速Linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 12H22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.34 17.66L4.93 19.07"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.07 4.93L17.66 6.34"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </span>
        </label>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⌨️</span>
            <span className="logo-text">Cue</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#use-cases">Use Cases</a>
          </div>
          <button className="nav-cta" onClick={handleJoinWaitlistClick}>
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>AI-Powered Keyboard</span>
          </div>
          <TypeAnimation
            sequence={["Your Words, Perfected by AI", 1000]}
            wrapper="h1"
            speed={30}
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              display: "inline-block",
            }}
            repeat={0}
          />
          <p className="hero-description">
            Cue is the intelligent keyboard that uses advanced AI to help you
            craft the perfect message for every situation. From professional
            emails to casual chats, Cue ensures your communication is always on
            point.
          </p>
          <div className="hero-cta-container">
            <button
              className="cta-button primary"
              onClick={handleGetEarlyAccess}
            >
              Get Early Access
            </button>
            <button className="cta-button secondary">Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Waitlist Signups</span>
            </div>
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">AI Assistance</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="keyboard-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="mockup-content">
              <div className="message ai-message">
                <div className="message-sender">Cue AI</div>
                <div className="message-content">
                  I suggest: "Would you like to grab coffee sometime? I've been
                  wanting to continue our conversation about design trends."
                </div>
              </div>
              <div className="message user-message">
                <div className="message-sender">You</div>
                <div className="message-content">
                  Would you like to grab coffee sometime?
                </div>
              </div>
              <div className="mockup-keyboard">
                <div className="suggestion-chips">
                  <div className="chip">☕ Casual</div>
                  <div className="chip">💼 Professional</div>
                  <div className="chip">😊 Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="logo-cloud">
        <div className="container">
          <p>Trusted by professionals at</p>
          <div className="logos">
            <div className="logo-item">Google</div>
            <div className="logo-item">Microsoft</div>
            <div className="logo-item">Spotify</div>
            <div className="logo-item">Slack</div>
            <div className="logo-item">Netflix</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How Cue Transforms Your Communication</h2>
            <p>
              Cue integrates seamlessly with your favorite apps to provide
              real-time writing assistance exactly when you need it.
            </p>
          </div>
          <div className="value-cards">
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Real-Time Suggestions</h3>
              <p>
                Get AI-powered suggestions as you type, with options to adjust
                tone, length, and style with a single tap.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Complete Privacy</h3>
              <p>
                Your data never leaves your device. All processing happens
                on-device with advanced encryption.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌐</div>
              <h3>Universal Compatibility</h3>
              <p>
                Works with all your favorite apps: WhatsApp, Messenger, Email,
                Slack, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features Designed for Modern Communication</h2>
            <p>
              Cue combines advanced AI with intuitive design to elevate your
              messaging experience.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Tone Detection</h3>
              <p>
                Automatically detects conversation context and suggests
                appropriate tone adjustments.
              </p>
              <ul>
                <li>Professional - for workplace communication</li>
                <li>Casual - for friends and family</li>
                <li>Friendly - for new acquaintances</li>
                <li>Concise - for clear, direct messaging</li>
                <li>Empathetic - for sensitive conversations</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Schedule & Remind</h3>
              <p>
                Write now, send later. Perfect for different time zones or
                remembering important follow-ups.
              </p>
              <ul>
                <li>Set specific date and time for messages</li>
                <li>Time zone detection for recipients</li>
                <li>Recurring message reminders</li>
                <li>Follow-up suggestion system</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Content Generation</h3>
              <p>
                Create rich content directly within your conversations without
                switching apps.
              </p>
              <ul>
                <li>Generate charts from numerical data</li>
                <li>Create quick summary documents</li>
                <li>Build mini-presentations on the fly</li>
                <li>Convert conversations to action items</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multi-Language Support</h3>
              <p>
                Communicate effortlessly in over 30 languages with native-level
                translation.
              </p>
              <ul>
                <li>Real-time translation as you type</li>
                <li>Cultural nuance preservation</li>
                <li>Idiom and slang recognition</li>
                <li>极速Language learning mode</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Privacy First</h3>
              <p>
                Enterprise-grade security ensures your conversations remain
                private.
              </p>
              <ul>
                <li>End-to-end encryption</li>
                <li>On-device processing</li>
                <li>No data storage on servers</li>
                <li>Transparent privacy policy</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Seamless Integration</h3>
              <p>
                Works across all your devices and platforms with a consistent
                experience.
              </p>
              <ul>
                <li>iOS and Android support</li>
                <li>Browser extension available</li>
                <li>Desktop app compatibility</li>
                <li>Cross-device synchronization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases" id="use-cases">
        <div className="container">
          <div className="section-header">
            <h2>Perfect for Every Communication Scenario</h2>
            <p>
              See how Cue enhances your daily conversations across different
              contexts.
            </p>
          </div>
          <div className="use-case-tabs">
            <div className="tab-buttons">
              <button
                className={`tab-button ${
                  activeTab === "Professional" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Professional")}
              >
                Professional
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Dating" ? "active极速" : ""
                }`}
                onClick={() => setActiveTab("Dating")}
              >
                Dating
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Social" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Social")}
              >
                Social
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Customer" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Customer")}
              >
                Customer Service
              </button>
            </div>
            <div className="tab-content">
              <div className="use-case-example">
                <div className极速="example-header">
                  <h3>{useCases[activeTab].title}</h3>
                  <p>{useCases[activeTab].description}</p>
                </div>
                <div className="example-content">
                  <div className="original">
                    <h4>Original:</h4>
                    <p>{useCases[activeTab].original}</p>
                  </div>
                  <div className="enhanced">
                    <h4>With Cue:</h4>
                    <p>{useCases[activeTab].enhanced}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Loved by Professionals</h2>
            <p>See what early users are saying about Cue</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Cue has completely transformed how I communicate with clients.
                The professional tone suggestions have helped me land three new
                accounts this month!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-details">
                  <h4>Sarah Chen</h4>
                  <p>Sales Director, Tech Solutions Inc.</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "As someone who communicates in multiple languages daily, Cue's
                translation and cultural nuance features are a game-changer. It
                feels like having a personal translator."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-details">
                  <h4>Miguel Rodriguez</h4>
                  <p>International Relations Manager</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "The scheduling feature has saved me so many times when working
                with international teams. No more calculating time zones at
                midnight!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-details">
                  <h4>James Wilson</h4>
                  <p>Project Lead, Global Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <WaitlistSection />

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Transform Your Communication?</h2>
          <p>
            Join thousands of professionals already using Cue to enhance their
            daily conversations.
          </p>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="checkmark">✓</span>
              <span>Free to join waitlist</span>
            </div>
            <div className="cta-feature">
              <span className="checkmark">✓</span>
              <span>Early access privileges</span>
            </div>
            <div className="cta-feature">
              <span className="checkmark">✓</span>
              <span>Exclusive preview features</span>
            </div>
          </div>
          <div className="cta-actions">
            <button
              className="cta-button primary"
              onClick={handleJoinWaitlistClick}
            >
              Join the Waitlist Now
            </button>
            <p className="cta-note">
              No credit card required • 2-minute signup
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-logo">
                <span className="logo-icon">⌨️</span>
                <span className="logo-text">Cue</span>
              </div>
              <p>
                The intelligent keyboard that helps you communicate with
                confidence.
              </p>
            </div>
            <div className="footer-links"></div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Cue AI Technologies. All rights reserved.</p>
            <div className="social-links">
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

// Wrap your app with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
