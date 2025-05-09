import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaCogs, FaTruck, FaTools, FaWrench } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  const services = [
    {
      icon: FaCogs,
      title: { en: 'Equipment Sales', ar: 'بيع المعدات' },
      description: {
        en: 'Wide range of construction equipment and cranes',
        ar: 'مجموعة واسعة من معدات البناء والرافعات'
      }
    },
    {
      icon: FaTruck,
      title: { en: 'Equipment Rental', ar: 'تأجير المعدات' },
      description: {
        en: 'Flexible rental solutions for your projects',
        ar: 'حلول تأجير مرنة لمشاريعك'
      }
    },
    {
      icon: FaTools,
      title: { en: 'Maintenance', ar: 'الصيانة' },
      description: {
        en: 'Professional maintenance and repair services',
        ar: 'خدمات صيانة وإصلاح احترافية'
      }
    },
    {
      icon: FaWrench,
      title: { en: 'Spare Parts', ar: 'قطع الغيار' },
      description: {
        en: 'Genuine spare parts for all equipment',
        ar: 'قطع غيار أصلية لجميع المعدات'
      }
    }
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>
          {isRTL ? 'نيو جيرسي العالمية - معدات البناء والرافعات' : 'NewGersyIntl - Construction Equipment & Cranes'}
        </title>
        <meta 
          name="description" 
          content="NewGersyIntl is a leading provider of construction equipment and cranes in UAE"
        />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Construction Equipment"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {isRTL ? 'حلول متكاملة لمعدات البناء' : 'Integrated Construction Solutions'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {isRTL 
              ? 'شركة رائدة في مجال معدات البناء والرافعات في الإمارات العربية المتحدة'
              : 'A leading company in construction equipment and cranes in the UAE'}
          </p>
          <button 
            onClick={() => router.push('/contact')}
            className="btn-primary text-lg px-8 py-3"
          >
            {isRTL ? 'اتصل بنا' : 'Contact Us'}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group">
                <div className="text-primary text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {isRTL ? service.title.ar : service.title.en}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? service.description.ar : service.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-image.jpg"
                alt="About NewGersyIntl"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                {isRTL ? 'من نحن' : 'About Us'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isRTL
                  ? 'نيو جيرسي العالمية هي شركة رائدة في مجال معدات البناء والرافعات في الإمارات العربية المتحدة. نحن نقدم حلولاً متكاملة لعملائنا منذ أكثر من 25 عاماً.'
                  : 'NewGersyIntl is a leading company in construction equipment and cranes in the UAE. We have been providing integrated solutions to our customers for over 25 years.'}
              </p>
              <button 
                onClick={() => router.push('/about')}
                className="btn-secondary"
              >
                {isRTL ? 'اعرف المزيد' : 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            {isRTL ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="card flex items-center justify-center p-8">
                <div className="relative w-32 h-20">
                  <Image
                    src={`/images/partner${index}.png`}
                    alt={`Partner ${index}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage; 