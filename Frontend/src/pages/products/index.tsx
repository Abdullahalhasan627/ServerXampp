import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// سنقوم بتحديث هذا لاحقاً مع البيانات من قاعدة البيانات
const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    title: {
      ar: 'رافعة برجية ليبهير',
      en: 'Liebherr Tower Crane'
    },
    description: {
      ar: 'رافعة برجية قوية وموثوقة مناسبة للمشاريع الكبيرة',
      en: 'Powerful and reliable tower crane suitable for large projects'
    },
    category: {
      ar: 'رافعات برجية',
      en: 'Tower Cranes'
    },
    images: ['/images/crane1.jpg'],
    specifications: {
      ar: {
        'الحمولة القصوى': '12 طن',
        'الارتفاع': '60 متر'
      },
      en: {
        'Max Load': '12 tons',
        'Height': '60 meters'
      }
    },
    brand: 'Liebherr',
    model: 'EC-B 12',
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // يمكن إضافة المزيد من المنتجات هنا
];

const ProductsPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const isRTL = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'tower-cranes', ar: 'رافعات برجية', en: 'Tower Cranes' },
    { id: 'external-lifts', ar: 'مصاعد خارجية', en: 'External Lifts' },
    { id: 'scaffolding', ar: 'سقالات', en: 'Scaffolding' },
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Head>
        <title>{isRTL ? 'المنتجات - نيو جيرسي العالمية' : 'Products - NewGersyIntl'}</title>
        <meta name="description" content="Our products catalog - Construction equipment and machinery" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <h1 className="section-title">
          {isRTL ? 'منتجاتنا' : 'Our Products'}
        </h1>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isRTL ? category.ar : category.en}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_PRODUCTS.map((product) => (
            <div key={product.id} className="card fade-in">
              <div className="relative h-64 mb-4">
                <Image
                  src={product.images[0]}
                  alt={isRTL ? product.title.ar : product.title.en}
                  fill
                  className="img-cover rounded-lg"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-secondary">
                {isRTL ? product.title.ar : product.title.en}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {isRTL ? product.description.ar : product.description.en}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {product.brand} - {product.model}
                </span>
                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="btn-primary"
                >
                  {isRTL ? 'عرض التفاصيل' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;