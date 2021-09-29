import Image from 'next/image';
import fbLogo from 'public/site/social/fb.svg';
import instagramLogo from 'public/site/social/insta.svg';
import styles from './MediaIcons.module.scss';

export function MediaIcons() {
  return (
    <div className={styles['media-icons']}>
      <a href="https://www.facebook.com/schroniskowsosnowcu/" target="_blank">
        <Image src={fbLogo} alt="facebook link"></Image>
      </a>
      <a href="https://www.instagram.com/schroniskososnowiec/" target="_blank">
        <Image src={instagramLogo} alt="instagram link"></Image>
      </a>
    </div>
  );
}
