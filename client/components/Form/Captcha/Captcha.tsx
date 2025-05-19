import Script from "next/script";
import { useEffect } from "react";

const captchaDisabled =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY === "DISABLED";

type CaptchaProps = {
  onCaptcha: (token: string) => void;
};

export function Captcha({ onCaptcha }: CaptchaProps) {
  useEffect(() => {
    // data-callback cannot be a function
    // @ts-ignore
    window["onCaptcha"] = onCaptcha;
    return () => {
      // @ts-ignore
      delete window["onCaptcha"];
    };
  });

  if (captchaDisabled) {
    onCaptcha("MOCK_CAPTCHA");
    return null;
  }

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
