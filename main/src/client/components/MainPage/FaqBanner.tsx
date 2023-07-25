import Image from 'next/image';
import Link from 'next/link';
import faqBanner from 'public/site/main/faq.png';

export function FaqBanner() {
  return (
    <div style={{ marginBottom: '64px' }}>
      <Link href="/pages/faq">
        <Image src={faqBanner} alt="najczęściej zadawane pytania" />
      </Link>
    </div>
  );
}
