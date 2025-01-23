export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-purple-700 text-white text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Gemini AI Project
          </h1>
          <p className="text-lg mb-6">Noel, Irene, Helin, Hampus, Karo</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6 text-center text-slate-700">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <a
                href="/Noel"
                className="bg-purple-400  hover:bg-purple-500 p-6 shadow rounded-lg block text-center"
              >
                <h3 className="text-xl font-bold mb-2 text-slate-700">
                  Chatbot
                </h3>
                <p className="text-gray-600">
                  Unlock the power of Google Gemini! A chatbot that understands
                  and responds like never before, ready to assist with any
                  query.
                </p>
              </a>
            </div>
            <div>
              <a
                href="/Hampus"
                className="bg-purple-400  hover:bg-purple-500 p-6 shadow rounded-lg block text-center"
              >
                <h3 className="text-xl font-bold mb-2 text-slate-700">
                  Recept Ideas
                </h3>
                <p className="text-gray-600">
                  Discover AI-powered recipes tailored to your taste! Unlock
                  endless culinary inspiration with just a click
                </p>
              </a>
            </div>
            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-slate-700">
                Reseguide
              </h3>
              <p className="text-gray-600">
                Brief description of Feature Three.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-6">
            Become part of our growing community and enjoy exclusive benefits.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </main>
  );
}
