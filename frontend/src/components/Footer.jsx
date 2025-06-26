const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        <p className="text-sm sm:text-base font-medium">
          © 2025 Digital Voting Platform — Powered by Election Commission of
          India 🇮🇳
        </p>
        <p className="text-xs sm:text-sm text-blue-200">
          For assistance, contact us at:{" "}
          <a
            href="mailto:support@eci.gov.in"
            className="underline hover:text-white"
          >
            support@eci.gov.in
          </a>{" "}
          | Toll-Free:{" "}
          <a href="tel:1800111000" className="underline hover:text-white">
            1800-111-000
          </a>
        </p>
        <p className="text-xs text-blue-300">
          Nirvachan Sadan, Ashoka Road, New Delhi – 110001
        </p>
      </div>
    </footer>
  );
};

export default Footer;
