import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
  urgency: string;
}

const ContactPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
    urgency: 'normal'
  });

  const serviceTypes = [
    { value: 'sales', ar: 'مبيعات', en: 'Sales' },
    { value: 'rental', ar: 'تأجير', en: 'Rental' },
    { value: 'maintenance', ar: 'صيانة', en: 'Maintenance' },
    { value: 'spare-parts', ar: 'قطع غيار', en: 'Spare Parts' },
    { value: 'technical-support', ar: 'دعم فني', en: 'Technical Support' }
  ];

  const urgencyLevels = [
    { value: 'low', ar: 'منخفض', en: 'Low' },
    { value: 'normal', ar: 'عادي', en: 'Normal' },
    { value: 'high', ar: 'عالي', en: 'High' },
    { value: 'urgent', ar: 'عاجل', en: 'Urgent' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم إضافة منطق إرسال النموذج لاحقاً مع Backend
    console.log('Form submitted:', form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>
          {isRTL ? 'اتصل بنا - نيو جيرسي العالمية' : 'Contact Us - NewGersyIntl'}
        </title>
        <meta 
          name="description" 
          content="Contact NewGersyIntl for all your construction equipment needs"
        />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <h1 className="section-title">
          {isRTL ? 'اتصل بنا' : 'Contact Us'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {isRTL ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <FaMapMarkerAlt className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-gray-600">
                      {isRTL 
                        ? 'صندوق بريد: 64564، المنطقة الصناعية 10، الشارقة، الإمارات العربية المتحدة'
                        : 'PO Box: 64564, Ind. Area 10, Sharjah, U.A.E.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <FaPhone className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'الهاتف' : 'Phone'}
                    </h3>
                    <p className="text-gray-600">
                      <a href="tel:+971527967775" className="hover:text-primary">
                        +971 52 796 7775
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <FaEnvelope className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <p className="text-gray-600">
                      <a href="mailto:alhasan979@hotmail.com" className="hover:text-primary">
                        alhasan979@hotmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <FaClock className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'ساعات العمل' : 'Working Hours'}
                    </h3>
                    <p className="text-gray-600">
                      {isRTL 
                        ? 'الأحد - الخميس: 8:00 صباحاً - 6:00 مساءً'
                        : 'Sunday - Thursday: 8:00 AM - 6:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {isRTL ? 'موقعنا' : 'Our Location'}
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              {isRTL ? 'نموذج التواصل' : 'Contact Form'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">
                  {isRTL ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="form-label">
                  {isRTL ? 'نوع الخدمة' : 'Service Type'}
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">
                    {isRTL ? 'اختر نوع الخدمة' : 'Select service type'}
                  </option>
                  {serviceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {isRTL ? type.ar : type.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="form-label">
                  {isRTL ? 'مستوى الأولوية' : 'Urgency Level'}
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={form.urgency}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  {urgencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {isRTL ? level.ar : level.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="form-label">
                  {isRTL ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  {isRTL ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                {isRTL ? 'إرسال الرسالة' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage; 