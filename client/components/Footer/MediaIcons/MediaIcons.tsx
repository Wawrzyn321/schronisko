import Image from 'next/image';
import fbLogo from 'public/site/social/fb.svg';
import instagramLogo from 'public/site/social/insta.svg';
import styles from './MediaIcons.module.scss';

export function MediaIcons() {
  return (
    <div className={styles['media-icons']}>
      <a
        href="https://www.facebook.com/schroniskowsosnowcu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={fbLogo} alt="facebook link" width={50} height={50}/>
      </a>
      <a
        href="https://www.instagram.com/schroniskososnowiec/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={instagramLogo} alt="instagram link" width={50} height={50}/>
      </a>
    </div>
  );
}
