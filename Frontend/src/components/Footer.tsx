import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {isRTL ? 'نيو جيرسي العالمية' : 'NewGersyIntl'}
            </h3>
            <p className="text-gray-400">
              {isRTL
                ? 'شركة رائدة في مجال معدات البناء والرافعات'
                : 'A leading company in construction equipment and cranes'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {isRTL ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  {isRTL ? 'خدماتنا' : 'Our Services'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {isRTL ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {isRTL ? 'معلومات التواصل' : 'Contact Info'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <FaPhone className="text-primary" />
                <a href="tel:+971527967775" className="text-gray-400 hover:text-white transition-colors">
                  +971 52 796 7775
                </a>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <FaEnvelope className="text-primary" />
                <a href="mailto:alhasan979@hotmail.com" className="text-gray-400 hover:text-white transition-colors">
                  alhasan979@hotmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-gray-400">
                  {isRTL
                    ? 'صندوق بريد: 64564، الشارقة، الإمارات'
                    : 'PO Box: 64564, Sharjah, UAE'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} NewGersyIntl. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 