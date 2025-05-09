import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  const navigation = [
    { name: { en: 'Home', ar: 'الرئيسية' }, href: '/' },
    { name: { en: 'About', ar: 'من نحن' }, href: '/about' },
    { name: { en: 'Services', ar: 'خدماتنا' }, href: '/services' },
    { name: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              NewGersyIntl
            </Link>
          </div>

          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-600 hover:text-primary transition-colors ${
                  router.pathname === item.href ? 'font-bold text-primary' : ''
                }`}
              >
                {isRTL ? item.name.ar : item.name.en}
              </Link>
            ))}

            <button
              onClick={() => {
                router.push(router.pathname, router.pathname, {
                  locale: isRTL ? 'en' : 'ar',
                });
              }}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {isRTL ? 'English' : 'عربي'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;