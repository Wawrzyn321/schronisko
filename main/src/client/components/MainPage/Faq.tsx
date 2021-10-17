import Image from 'next/image';
import faqBanner from 'public/site/main/faq.png';

export function Faq() {
  return (
    <div style={{ marginBottom: '64px' }}>
      <a href="/pages/faq">
        <Image src={faqBanner} alt="najczęściej zadawane pytania" />
      </a>
    </div>
  );
}
