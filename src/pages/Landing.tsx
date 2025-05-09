import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle, User, Award, Clock, FileText, Star, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useToast } from '../components/ui/Toaster';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The internship program was incredibly well-structured. I gained practical skills that my university courses couldn\'t provide, and the certificate helped me land my first tech job!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineering Graduate',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As a recent graduate, this internship gave me the edge I needed in a competitive job market. The project-based approach taught me how to apply my knowledge in real-world scenarios.'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Data Science Enthusiast',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'I completed the data science internship while working full-time. The flexible schedule and clear project guidelines made it possible for me to enhance my skills without leaving my job.'
  }
];

const faqs = [
  {
    question: 'How long does the internship program last?',
    answer: 'Our standard internship program is designed to be completed in 30 days. However, we understand that everyone works at their own pace, so you can take more time if needed. The certificate is issued after successful completion of all project steps and the 30-day activity requirement.'
  },
  {
    question: 'Is this internship recognized by companies?',
    answer: "Yes, our internship certificates are recognized by many companies in the tech industry. We've partnered with industry professionals to design our curriculum, ensuring that the skills you develop are relevant and valuable in the job market.",
  },
  {
    question: 'Can I participate in multiple internship programs?',
    answer: 'Absolutely! Many of our students complete multiple internship programs to build a diverse skill set. Each program focuses on different technologies and project types, allowing you to explore various career paths in the tech industry.'
  },
  {
    question: 'How much does the certificate cost?',
    answer: 'The internship program itself is free to participate in. The certificate, which verifies your successful completion of the program, has a nominal fee of $49. This fee helps us maintain the quality and credibility of our certification process.'
  },
  {
    question: 'What if I need help during the internship?',
    answer: "We provide comprehensive support throughout your internship journey. You'll have access to detailed documentation, video tutorials, and a community forum where you can ask questions.For more personalized assistance, you can schedule one- on - one sessions with mentors(subject to availability)."
  }
];

const Landing = () => {
  const { showToast } = useToast();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleAccordionClick = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      showToast('Your message has been sent successfully!', 'success');
      setContactForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Start Your Virtual Internship Journey Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Gain real-world experience, build your portfolio, and earn a recognized certificate to boost your career.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Internship
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students working on projects"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="text-center pb-6">
          <a href="#features" className="inline-block animate-bounce">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Internship Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our program is designed to give you practical experience, professional guidance, and recognized certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Project-Based Learning</h3>
                <p className="text-gray-600">
                  Work on real-world projects that simulate industry challenges and build a portfolio to showcase your skills.
                </p>
              </CardContent>
            </Card>

            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Clock size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">
                  Complete your internship at your own pace, with structured guidance and milestones to keep you on track.
                </p>
              </CardContent>
            </Card>

            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Award size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recognized Certificate</h3>
                <p className="text-gray-600">
                  Earn a verified certificate upon completion that you can add to your resume and LinkedIn profile.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Interns Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who have completed our internship program and advanced their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our internship program.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
                  onClick={() => handleAccordionClick(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our internship program? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <form onSubmit={handleContactSubmit} className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <Button type="submit" fullWidth>Send Message</Button>
              </form>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 h-full">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mr-3 text-blue-600" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@interncert.com" className="text-blue-600 hover:text-blue-800">
                        info@interncert.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-3 text-blue-600" size={20} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-3 text-blue-600" size={20} />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        123 Tech Campus Drive<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Internship Journey?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of students who have boosted their career with our virtual internship program.
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;