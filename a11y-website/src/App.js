import React, { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [contrastBg, setContrastBg] = useState('#ffffff');
  const [contrastFg, setContrastFg] = useState('#000000');
  const [focusVisible, setFocusVisible] = useState(false);

  const calculateContrast = (bg, fg) => {
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(bg);
    const l2 = getLuminance(fg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const contrastRatio = calculateContrast(contrastBg, contrastFg);
  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7;

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400" aria-label="A11Y Journey">
                🌍 A11Y Journey
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'demos', 'guides', 'snippets'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section id="home" className="mb-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My Accessibility Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Building inclusive web experiences for everyone in Kuwait and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection('demos')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Try Interactive Demos
              </button>
              <button
                onClick={() => scrollToSection('guides')}
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Read Guides
              </button>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4" role="img" aria-label="Document">📘</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Learn & Document</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive guides and best practices for accessible web development
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4" role="img" aria-label="Code">💻</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Code Examples</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reusable, accessible code snippets ready to use in your projects
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4" role="img" aria-label="Tools">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Testing Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Resources for testing and validating accessibility compliance
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demos Section */}
        <section id="demos" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Interactive Accessibility Demos
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contrast Checker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Color Contrast Checker
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Test color combinations to ensure they meet WCAG standards
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="bg-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="bg-color"
                      value={contrastBg}
                      onChange={(e) => setContrastBg(e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                      aria-label="Select background color"
                    />
                    <input
                      type="text"
                      value={contrastBg}
                      onChange={(e) => setContrastBg(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Background color hex value"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fg-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="fg-color"
                      value={contrastFg}
                      onChange={(e) => setContrastFg(e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                      aria-label="Select text color"
                    />
                    <input
                      type="text"
                      value={contrastFg}
                      onChange={(e) => setContrastFg(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Text color hex value"
                    />
                  </div>
                </div>
              </div>

              <div 
                className="p-8 rounded-lg mb-4 text-center text-2xl font-bold"
                style={{ backgroundColor: contrastBg, color: contrastFg }}
              >
                Sample Text
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {contrastRatio}:1
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${passesAA ? 'text-green-500' : 'text-red-500'}`}>
                      {passesAA ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      WCAG AA (4.5:1)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${passesAAA ? 'text-green-500' : 'text-red-500'}`}>
                      {passesAAA ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      WCAG AAA (7:1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard Navigation Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Keyboard Navigation Demo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try navigating with Tab, Shift+Tab, and Enter keys
              </p>

              <div className="space-y-4">
                <button
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                  onClick={() => alert('Button 1 activated!')}
                >
                  Interactive Button 1
                </button>
                <button
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
                  onClick={() => alert('Button 2 activated!')}
                >
                  Interactive Button 2
                </button>
                <button
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
                  onClick={() => alert('Button 3 activated!')}
                >
                  Interactive Button 3
                </button>
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Keyboard Tips:</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded">Tab</kbd> - Move forward</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded">Shift+Tab</kbd> - Move backward</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded">Enter</kbd> - Activate button</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded">Space</kbd> - Activate button</li>
                </ul>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={focusVisible}
                    onChange={(e) => setFocusVisible(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Show focus indicators
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section id="guides" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Accessibility Guides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Introduction to Accessibility
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn the fundamentals of web accessibility and why it matters for creating inclusive digital experiences.
              </p>
              <a 
                href="#guides" 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Read Guide →
              </a>
            </article>

            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                ARIA Labels & Roles
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Master ARIA attributes to enhance semantic meaning and improve screen reader compatibility.
              </p>
              <a 
                href="#guides" 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Read Guide →
              </a>
            </article>

            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Keyboard Navigation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ensure your website is fully navigable using only a keyboard for users who cannot use a mouse.
              </p>
              <a 
                href="#guides" 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Read Guide →
              </a>
            </article>

            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Color Contrast Guidelines
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Understand WCAG color contrast requirements and how to choose accessible color combinations.
              </p>
              <a 
                href="#guides" 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Read Guide →
              </a>
            </article>
          </div>
        </section>

        {/* Code Snippets Section */}
        <section id="snippets" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Accessible Code Snippets
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Accessible Button with Icon
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Proper ARIA label for icon-only buttons
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<button aria-label="Search the site">🔍</button>`}</code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Accessible Form with Labels
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Properly labeled form inputs for screen readers
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<label for="email">Email address:</label>
<input type="email" id="email" name="email" required>

<label for="feedback">Your feedback:</label>
<textarea id="feedback" name="feedback"></textarea>`}</code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Skip to Main Content Link
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Allow keyboard users to skip navigation
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<a href="#main-content" class="skip-link">
  Skip to main content
</a>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Building accessible web experiences for everyone in Kuwait 🇰🇼
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">
            © 2025 A11Y Journey. Committed to digital inclusion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
