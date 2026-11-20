import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi";
import Swal from "sweetalert2";
import api from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await api.post("/contact", formData);

      Swal.fire({
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you soon.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Our Location",
      content:
        "Office Number 206, Sai Dham, Adarsh Nagar, Wagholi Road, Lohegaon, Pune 411047",
      color: "text-blue-600",
    },
    {
      icon: FiPhone,
      title: "Phone Number",
      content: "+91 97675 52564",
      link: "tel:+97675 52564",
      color: "text-green-600",
    },
    {
      icon: FiMail,
      title: "Email Address",
      content: "info@climbwin.com",
      link: "mailto:info@climbwin.com",
      color: "text-red-600",
    },
    {
      icon: FiClock,
      title: "Business Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM",
      color: "text-purple-600",
    },
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your dashboard by going to Orders section and clicking on the order you want to track.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most products. Please check the product page for specific return information.",
    },
    {
      question: "How do I become a vendor?",
      answer:
        "You can register as a vendor by signing up and completing the vendor application form in your dashboard.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl  mb-6">Contact Us</h1>
            <p className="text-xl text-white/90">
              Have a question or need assistance? We're here to help! Reach out
              to us and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-lg transition"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4`}
                >
                  <Icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-primary transition"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder=""
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder=""
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7564.139975180868!2d73.87339194207784!3d18.570883180129638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sShop%20no%2028%20%2CJai%20Ganesh%20Vishwa%20Complex%2C%20Alandi%20Rd%2C%20Kasturba%20B%2C%20Kasturba%20Housing%20Society%2C%20Vishrantwadi%2C%20Pune%2C%20Maharashtra%20411015!5e0!3m2!1sen!2sin!4v1766472357688!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5665112186007!2d73.9408845!3d18.593572100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c7aed181372f%3A0xcf2ab23db08824e5!2sMR%20COLLECTION!5e0!3m2!1sen!2sin!4v1795001090290!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Location Map"
              ></iframe>
            </div>

            {/* Additional Info */}
            <div className="card p-6">
              <h3 className="font-bold text-xl mb-4">Why Contact Us?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Get help with your orders and shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Learn about becoming a vendor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Report technical issues or bugs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Provide feedback and suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Business inquiries and partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {/* <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-bold text-lg mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to help you with any
            questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="btn bg-white text-primary hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <FiPhone />
              Call Now
            </a>
            <a
              href="mailto:support@marketplace.com"
              className="btn btn-outline border-white text-white hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <FiMail />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
