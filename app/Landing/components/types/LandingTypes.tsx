import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export type MenuItem = {
  name: string;
  href: string;
  image?: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export const iconsMap = {
  phone: Phone,
  mail: Mail,
  instagram: Instagram,
  facebook: Facebook,
  map: MapPin,
};
