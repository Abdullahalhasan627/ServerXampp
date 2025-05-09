import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    id: 'sales',
    title: {
      ar: 'بيع المعدات',
      en: 'Equipment Sales'
    },
    description: {
      ar: 'نوفر مجموعة واسعة من معدات البناء الجديدة والمستعملة من أفضل العلامات التجارية العالمية.',
      en: 'We provide a wide range of new and used construction equipment from the best global brands.'
    },
    icon: '/icons/sales.svg'
  },
  {
    id: 'rental',
    title: {
      ar: 'تأجير المعدات',
      en: 'Equipment Rental'
    },
    description: {
      ar: 'خدمات تأجير مرنة للمعدات مع خيارات متعددة للمدد الزمنية تناسب احتياجات مشروعك.',
      en: 'Flexible equipment rental services with multiple duration options to suit your project needs.'
    },
    icon: '/icons/rental.svg'
  },
  {
    id: 'maintenance',
    title: {
      ar: 'الصيانة والإصلاح',
      en: 'Maintenance & Repair'
    },
    description: {
      ar: 'خدمات صيانة وإصلاح احترافية مع فريق من الفنيين المؤهلين وقطع غيار أصلية.',
      en: 'Professional maintenance and repair services with qualified technicians and original spare parts.'
    },
    icon: '/icons/maintenance.svg'
  },
  {
    id: 'spare-parts',
    title: {
      ar: 'قطع الغيار',
      en: 'Spare Parts'
    },
    description: {
      ar: 'توفير قطع غيار أصلية لجميع أنواع المعدات مع ضمان الجودة والأداء.',
      en: 'Supply of original spare parts for all types of equipment with quality and performance guarantee.'
    },
    icon: '/icons/parts.svg'
  },
  {
    id: 'technical-support',
    title: {
      ar: 'الدعم الفني',
      en: 'Technical Support'
    },
    description: {
      ar: 'دعم فني متخصص على مدار الساعة لضمان استمرارية عمل معداتك بكفاءة.',
      en: '24/7 specialized technical support to ensure your equipment operates efficiently.'
    },
    icon: '/icons/support.svg'
  },
  {
    id: 'consultation',
    title: {
      ar: 'الاستشارات الفنية',
      en: 'Technical Consultation'
    },
    description: {
      ar: 'خدمات استشارية متخصصة لمساعدتك في اختيار المعدات المناسبة لمشروعك.',
      en: 'Specialized consulting services to help you choose the right equipment for your project.'
    },
    icon: '/icons/consultation.svg'
  }
];

const ServicesPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>
          {isRTL ? 'خدماتنا - نيو جيرسي العالمية' : 'Our Services - NewGersyIntl'}
        </title>
        <meta 
          name="description" 
          content="Professional construction equipment services - Sales, Rental, Maintenance, and more"
        />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <h1 className="section-title">
          {isRTL ? 'خدماتنا' : 'Our Services'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card fade-in">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={service.icon}
                    alt={isRTL ? service.title.ar : service.title.en}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-secondary text-center">
                {isRTL ? service.title.ar : service.title.en}
              </h3>

              <p className="text-gray-600 text-center">
                {isRTL ? service.description.ar : service.description.en}
              </p>

              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push('/contact')}
                  className="btn-primary"
                >
                  {isRTL ? 'اطلب الخدمة' : 'Request Service'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <section className="mt-24">
          <h2 className="section-title">
            {isRTL ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600">
                {isRTL ? 'سنوات من الخبرة' : 'Years of Experience'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">
                {isRTL ? 'مشروع منجز' : 'Completed Projects'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">
                {isRTL ? 'دعم فني' : 'Technical Support'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">
                {isRTL ? 'رضا العملاء' : 'Customer Satisfaction'}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage; 