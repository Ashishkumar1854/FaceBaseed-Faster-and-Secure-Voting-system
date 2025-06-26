const HowItWorks = () => (
  <section className="bg-white py-16 px-6 sm:px-12 md:px-24">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
        How the Face-Based Voting System Works
      </h1>

      <div className="bg-gray-50 border border-blue-200 rounded-xl p-8 shadow-md space-y-6">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
          <span className="text-white bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full font-semibold">
            1
          </span>
          <p className="text-gray-800 text-lg leading-relaxed">
            Face is verified using AI-powered secure recognition process.
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
          <span className="text-white bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full font-semibold">
            2
          </span>
          <p className="text-gray-800 text-lg leading-relaxed">
            Voter data validated live with government-authorized records
            instantly.
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
          <span className="text-white bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full font-semibold">
            3
          </span>
          <p className="text-gray-800 text-lg leading-relaxed">
            Eligible voter selects candidate and submits encrypted vote
            securely.
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
          <span className="text-white bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full font-semibold">
            4
          </span>
          <p className="text-gray-800 text-lg leading-relaxed">
            System detects and blocks any repeated or duplicate voting attempts.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
