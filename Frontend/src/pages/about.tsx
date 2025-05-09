import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';

  const milestones = [
    {
      year: '1998',
      title: {
        ar: 'تأسيس الشركة',
        en: 'Company Establishment'
      },
      description: {
        ar: 'تأسست شركة نيو جيرسي العالمية في الشارقة، الإمارات العربية المتحدة',
        en: 'NewGersyIntl was established in Sharjah, UAE'
      },
      image: '/images/milestone1.jpg'
    },
    {
      year: '2005',
      title: {
        ar: 'توسيع نطاق الخدمات',
        en: 'Services Expansion'
      },
      description: {
        ar: 'إضافة خدمات الصيانة وقطع الغيار لتلبية احتياجات العملاء',
        en: 'Added maintenance services and spare parts to meet customer needs'
      },
      image: '/images/milestone2.jpg'
    },
    {
      year: '2010',
      title: {
        ar: 'شراكات عالمية',
        en: 'Global Partnerships'
      },
      description: {
        ar: 'بناء شراكات استراتيجية مع كبرى الشركات العالمية',
        en: 'Built strategic partnerships with major global companies'
      },
      image: '/images/milestone3.jpg'
    },
    {
      year: '2015',
      title: {
        ar: 'التوسع الإقليمي',
        en: 'Regional Expansion'
      },
      description: {
        ar: 'توسيع عملياتنا في دول مجلس التعاون الخليجي',
        en: 'Expanded operations across GCC countries'
      },
      image: '/images/milestone4.jpg'
    }
  ];

  const partners = [
    { name: 'Liebherr', logo: '/images/partner1.png' },
    { name: 'Potain', logo: '/images/partner2.png' },
    { name: 'Terex', logo: '/images/partner3.png' },
    { name: 'Manitowoc', logo: '/images/partner4.png' },
    { name: 'Grove', logo: '/images/partner5.png' },
    { name: 'Zoomlion', logo: '/images/partner6.png' }
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>
          {isRTL ? 'من نحن - نيو جيرسي العالمية' : 'About Us - NewGersyIntl'}
        </title>
        <meta 
          name="description" 
          content="Learn about NewGersyIntl's history, mission, and values"
        />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center mb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-hero.jpg"
              alt="About NewGersyIntl"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="text-center z-10 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isRTL ? 'من نحن' : 'About Us'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {isRTL 
                ? 'نيو جيرسي العالمية هي شركة رائدة في مجال معدات البناء والرافعات، نقدم حلولاً متكاملة لعملائنا منذ أكثر من 25 عاماً.'
                : 'NewGersyIntl is a leading company in construction equipment and cranes, providing integrated solutions to our customers for over 25 years.'}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="card p-8">
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/vision.jpg"
                alt="Our Vision"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {isRTL ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className="text-gray-600">
              {isRTL
                ? 'أن نكون الشريك الأول والموثوق به في قطاع معدات البناء في المنطقة.'
                : 'To be the trusted first-choice partner in the construction equipment sector in the region.'}
            </p>
          </div>
          <div className="card p-8">
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/mission.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {isRTL ? 'مهمتنا' : 'Our Mission'}
            </h2>
            <p className="text-gray-600">
              {isRTL
                ? 'تقديم حلول متكاملة وخدمات عالية الجودة لعملائنا، مع الالتزام بأعلى معايير السلامة والجودة.'
                : 'To provide integrated solutions and high-quality services to our customers, while maintaining the highest standards of safety and quality.'}
            </p>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-16">
          <h2 className="section-title">
            {isRTL ? 'مسيرتنا' : 'Our Journey'}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:w-1/2 p-4">
                    <div className="card p-6">
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={milestone.image}
                          alt={isRTL ? milestone.title.ar : milestone.title.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        {isRTL ? milestone.title.ar : milestone.title.en}
                      </h3>
                      <p className="text-gray-600">
                        {isRTL ? milestone.description.ar : milestone.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full"></div>
                  <div className="flex-1 md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section>
          <h2 className="section-title">
            {isRTL ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="card flex items-center justify-center p-8">
                <div className="relative w-32 h-20">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage; 