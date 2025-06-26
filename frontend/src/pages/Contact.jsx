import { Mail, Phone, Globe, MapPin } from "lucide-react";

const Contact = () => (
  <section className="bg-white py-16 px-6 sm:px-12 md:px-24">
    <div className="max-w-3xl mx-auto bg-gray-50 border border-blue-200 rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Contact Election Commission of India
      </h1>

      <div className="space-y-6 text-gray-800 text-lg">
        {/* Email Section */}
        <div className="flex items-start gap-4">
          <Mail className="text-blue-600 mt-1" />
          <div>
            <p>
              Email 1 :{" "}
              <a
                href="mailto:support@eci.gov.in"
                className="text-blue-600 underline"
              >
                support@eci.gov.in
              </a>
            </p>
            <p>
              Official :{" "}
              <a
                href="ashishkyadav.dev@gmail.com"
                className="text-blue-600 underline"
              >
                ashishkyadav.dev@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex items-start gap-4">
          <Phone className="text-blue-600 mt-1" />
          <div>
            <p>Phone 1: 1800-111-000 (Toll-Free)</p>
            <p>Phone 2: 7294059348</p>
          </div>
        </div>

        {/* Website Section */}
        <div className="flex items-start gap-4">
          <Globe className="text-blue-600 mt-1" />
          <div>
            <p>
              Website 1:{" "}
              <a
                href="https://eci.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                https://eci.gov.in
              </a>
            </p>
            <p>
              Website 2:{" "}
              <a
                href="https://voterportal.eci.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                https://asaspossibleavailble
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <MapPin className="text-blue-600 mt-1" />
        <p>
          Address: Nirvachan Sadan, Ashoka Road, <br />
          New Delhi – 110001, India
        </p>
      </div>
    </div>
  </section>
);

export default Contact;
