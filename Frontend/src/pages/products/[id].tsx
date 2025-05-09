import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// سنقوم بتحديث هذا لاحقاً مع البيانات من قاعدة البيانات
const DUMMY_PRODUCT: Product = {
  id: '1',
  title: {
    ar: 'رافعة برجية ليبهير',
    en: 'Liebherr Tower Crane'
  },
  description: {
    ar: 'رافعة برجية قوية وموثوقة مناسبة للمشاريع الكبيرة. تتميز بأحدث التقنيات وأنظمة السلامة المتطورة.',
    en: 'Powerful and reliable tower crane suitable for large projects. Features the latest technology and advanced safety systems.'
  },
  category: {
    ar: 'رافعات برجية',
    en: 'Tower Cranes'
  },
  images: ['/images/crane1.jpg', '/images/crane2.jpg', '/images/crane3.jpg'],
  specifications: {
    ar: {
      'الحمولة القصوى': '12 طن',
      'الارتفاع': '60 متر',
      'طول الذراع': '45 متر',
      'سرعة الرفع': '100 متر/دقيقة',
      'القدرة الكهربائية': '75 كيلوواط'
    },
    en: {
      'Max Load': '12 tons',
      'Height': '60 meters',
      'Jib Length': '45 meters',
      'Hoisting Speed': '100 m/min',
      'Power': '75 kW'
    }
  },
  brand: 'Liebherr',
  model: 'EC-B 12',
  isAvailable: true,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
};

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';
  const [selectedImage, setSelectedImage] = useState(0);

  const product = DUMMY_PRODUCT; // سيتم تحديثه لاحقاً مع البيانات الفعلية

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>
          {isRTL ? `${product.title.ar} - نيو جيرسي العالمية` : `${product.title.en} - NewGersyIntl`}
        </title>
        <meta 
          name="description" 
          content={isRTL ? product.description.ar : product.description.en}
        />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={isRTL ? product.title.ar : product.title.en}
                fill
                className="img-cover rounded-lg"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto py-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${isRTL ? product.title.ar : product.title.en} - ${index + 1}`}
                    fill
                    className="img-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-secondary">
              {isRTL ? product.title.ar : product.title.en}
            </h1>

            <div className="mb-6">
              <p className="text-gray-600">
                {isRTL ? product.description.ar : product.description.en}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {isRTL ? 'المواصفات الفنية' : 'Technical Specifications'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(isRTL ? product.specifications.ar : product.specifications.en).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600 mr-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {isRTL ? 'الماركة:' : 'Brand:'} 
                </span>
                <span className="font-semibold">{product.brand}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {isRTL ? 'الموديل:' : 'Model:'} 
                </span>
                <span className="font-semibold">{product.model}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {isRTL ? 'الحالة:' : 'Status:'} 
                </span>
                <span className={`font-semibold ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {product.isAvailable 
                    ? (isRTL ? 'متوفر' : 'Available')
                    : (isRTL ? 'غير متوفر' : 'Not Available')}
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="btn-primary">
                {isRTL ? 'طلب عرض سعر' : 'Request Quote'}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => window.open(`https://wa.me/971527967775?text=${encodeURIComponent(
                  isRTL 
                    ? `مرحباً، أود الاستفسار عن ${product.title.ar}`
                    : `Hello, I would like to inquire about ${product.title.en}`
                )}`)}
              >
                {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage; 