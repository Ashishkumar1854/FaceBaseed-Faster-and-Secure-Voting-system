const FAQ = () => (
  <section className="bg-white py-16 px-6 sm:px-12 md:px-24">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
        Frequently Asked Questions
      </h1>
      <div className="space-y-8">
        <div className="border border-blue-300 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            Q. Is face data stored?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A. No, face data is only used temporarily for verification during
            the voting process and is not stored permanently.
          </p>
        </div>

        <div className="border border-blue-300 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            Q. Can I vote twice?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A. No, the system is designed to ensure that each verified voter can
            cast only one vote.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FAQ;
