import Link from "next/link";
import data from "../../data/data.json";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const phoneAndEmailType = {
  phone: Phone,
  mail: Mail,
};
const socialType = {
  instagram: Instagram,
  facebook: Facebook,
  map: MapPin,
};

export default function Footer() {
  const socialLinks = data.menuSocial;
  const phoneAndEmail = socialLinks.slice(0, 2);
  const social = socialLinks.slice(2);
  return (
    <footer className=" bg-darkness text-white">
      <div className="md:h-[90vh] container mx-auto md:grid grid-cols-12 grid-rows-12 bg-darkness text-white pt-20 px-4 space-y-10 md:space-y-0">
        <div className="col-span-6 lg:col-span-3 col-start-1 row-start-1 row-span-4 space-y-4">
          <h3 className="font-lyon text-xl mb-4">مين نحن</h3>
          <p className="text-xl">
            نحن متخصصون في تقديم أفضل حلول العناية بالنظر منذ 2010. نفخر بخدمة
            أكثر من 50,000 عميل راضٍ عن منتجاتنا وخدماتنا.
          </p>
        </div>

        <div className="col-start-8 col-span-6 row-start-1">
          <h4 className="font-lifta text-xl">تواصل معنا</h4>
          <ul className="flex justify-between flex-col gap-4 py-4">
            {phoneAndEmail.map((link, i) => {
              const Icon =
                phoneAndEmailType[link.icon as keyof typeof phoneAndEmailType];

              return (
                <li key={i} className="flex justify-start items-center gap-4">
                  <Icon className="w-5 text-white transition-colors" />
                  {Array.isArray(link.url) ? (
                    link.url.map((phone, i) => (
                      <Link
                        key={i}
                        href={`tel:${phone}`}
                        target="_blank"
                        className="flex flex-col  gap-4"
                      >
                        {phone}
                      </Link>
                    ))
                  ) : (
                    <Link
                      href={
                        link.icon === "mail" ? `mailto:${link.url}` : link.url
                      }
                      target="_blank"
                      className="flex flex-col"
                    >
                      {link.url}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex justify-center lg:justify-start gap-8 py-0 lg:py-8">
            {social.map((link, i) => {
              const Icon = socialType[link.icon as keyof typeof socialType];

              return (
                <li key={i}>
                  <Link href={link.url} target="_blank">
                    <Icon className="w-5 text-white hover:text-white/70 transition-colors" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-12 col-start-1 row-span-5 row-start-6 bg-slate-500 h-60 md:h-auto rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d858.8997926564246!2d31.00869193045488!3d30.560626853231135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d7003ed001eb%3A0xc04b34553c14a1bc!2z2KjYtdix2YrYp9iqINi52YrZiNmGINin2YTZhdmH2Kc!5e0!3m2!1sar!2seg!4v1768865087484!5m2!1sar!2seg"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div
          dir="ltr"
          className="col-span-12 col-start-1 row-start-12 flex justify-center md:justify-between text-xs font-sans relative bottom-4 uppercase"
        >
          <span>2ao1 © 2025 - ayoun Al Maha</span>
          <span>© All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
