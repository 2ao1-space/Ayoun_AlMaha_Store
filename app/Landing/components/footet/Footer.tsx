import Link from "next/link";
import data from "../../data/data.json";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
// import { iconsMap } from "../types/LandingTypes";

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
  const menu = data.menu;
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
        {/* <div className="col-span-7 col-start-6 row-start-3  relative">
        <ul className="flex items-start gap-3 justify-between">
          {menu.map((menuItem, i) => (
            <li key={i} className="flex-1">
              <div className="w-full text-start py-3">{menuItem.title}</div>
              <ul className="space-y-2 text-md">
                {menuItem.items.map((item, i) => (
                  <li key={i} className="hover:text-yellow-500">
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div> */}
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
          <ul className="flex justify-center lg:justify-start  gap-8 py-8">
            {social.map((link, i) => {
              const Icon = socialType[link.icon as keyof typeof socialType];

              return (
                <li key={i}>
                  <Link href={link.url} target="_blank">
                    <Icon className="w-5 text-white hover:text-darkness transition-colors" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-12 col-start-1 row-span-5 row-start-6 bg-slate-500 h-60 md:h-auto">
          map
        </div>

        <div className="col-span-12 col-start-1 row-start-12 flex justify-between text-xs font-sans relative bottom-4">
          <div className="uppercase">
            <p className=" footerContent">Designed by 2ao1</p>
            <p className="footerContent">©2025 ayoun Al Maha</p>
          </div>
          <div className="text-right footerContent uppercase">
            <p>Privacy</p>
            <p>Terms</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
