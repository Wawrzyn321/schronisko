import Script from "next/script";
import { useEffect } from "react";

type CaptchaProps = {
  onCaptcha: (token: string) => void;
};

export function Captcha({ onCaptcha }: CaptchaProps) {
  useEffect(() => {
    // data-callback cannot be a function
    window["onCaptcha"] = onCaptcha;
    return () => {
      delete window["onCaptcha"];
    };
  });

  return (
    <div>
      <Script src="https://www.google.com/recaptcha/enterprise.js" />
      <div
        className="g-recaptcha"
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        data-action="check"
        data-callback="onCaptcha"
      ></div>
    </div>
  );
}
