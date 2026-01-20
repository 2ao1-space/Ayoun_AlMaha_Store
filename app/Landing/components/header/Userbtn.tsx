"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Heart,
  ShoppingBag,
  LogOut,
  LogIn,
  UserPlus,
  Settings,
  Package,
} from "lucide-react";
import { gsap } from "gsap";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface UserBtnProps {
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

function UserBtn({ showUserMenu, setShowUserMenu }: UserBtnProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setUserProfile({
              id: user.id,
              email: user.email || "",
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
            });
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setLoading(true);
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUserProfile({
              id: session.user.id,
              email: session.user.email || "",
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
            });
          }
          setLoading(false);
          router.refresh();
        }, 500);
      } else if (event === "SIGNED_OUT") {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    if (showUserMenu && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      );
    }
  }, [showUserMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, setShowUserMenu]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserProfile(null);
      setShowUserMenu(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getFirstName = (fullName: string) => {
    if (!fullName) return "مستخدم";
    return fullName.split(" ")[0];
  };

  if (loading) {
    return (
      <div className="p-2.5">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  const menuItems = [
    {
      href: "/profile",
      icon: User,
      label: "الملف الشخصي",
      bgColor: "bg-amber-100",
      hoverColor: "group-hover:bg-amber-200",
      iconColor: "text-amber-600",
    },
    {
      href: "/orders",
      icon: Package,
      label: "عمليات الشراء",
      bgColor: "bg-blue-100",
      hoverColor: "group-hover:bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      href: "/wishlist",
      icon: Heart,
      label: "قائمة الأمنيات",
      bgColor: "bg-pink-100",
      hoverColor: "group-hover:bg-pink-200",
      iconColor: "text-pink-600",
    },
    {
      href: "/cart",
      icon: ShoppingBag,
      label: "السلة",
      bgColor: "bg-green-100",
      hoverColor: "group-hover:bg-green-200",
      iconColor: "text-green-600",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "الإعدادات",
      bgColor: "bg-purple-100",
      hoverColor: "group-hover:bg-purple-200",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`relative p-1 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
          showUserMenu ? "ring-2 ring-amber-400 ring-offset-2" : ""
        }`}
      >
        {userProfile ? (
          <div className="relative">
            {userProfile.avatar_url ? (
              <Image
                width={10}
                height={10}
                src={userProfile.avatar_url}
                alt={userProfile.full_name}
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm border-2 border-amber-400 shadow-md">
                {getInitials(userProfile.full_name)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User size={20} className="text-gray-600" />
          </div>
        )}
      </button>

      {showUserMenu && (
        <div
          ref={menuRef}
          className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          {userProfile ? (
            <div>
              <div className="relative bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-5 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative flex items-center gap-3">
                  {userProfile.avatar_url ? (
                    <Image
                      width={10}
                      height={10}
                      src={userProfile.avatar_url}
                      alt={userProfile.full_name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border-3 border-white/50 shadow-xl">
                      {getInitials(userProfile.full_name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg truncate drop-shadow-sm">
                      مرحباً، {getFirstName(userProfile.full_name)}
                    </p>
                    <p className="text-sm text-white/90 truncate drop-shadow-sm">
                      {userProfile.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group relative overflow-hidden"
                  >
                    <div
                      className={`p-2 ${item.bgColor} rounded-lg ${item.hoverColor} transition-all duration-200`}
                    >
                      <item.icon size={18} className={item.iconColor} />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}

                <div className="border-t border-gray-100 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-all duration-200">
                    <LogOut size={18} className="text-red-600" />
                  </div>
                  <span className="font-medium text-red-600 group-hover:text-red-700 transition-colors">
                    تسجيل الخروج
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <p className="text-gray-700 font-semibold text-lg">مرحباً بك</p>
                <p className="text-gray-500 text-sm mt-1">
                  سجل دخولك للاستمتاع بمميزات الموقع
                </p>
              </div>

              <Link
                href="/auth?mode=login"
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <LogIn size={18} />
                <span className="font-semibold">تسجيل الدخول</span>
              </Link>

              <Link
                href="/auth?mode=signup"
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center justify-center gap-2 p-3.5 border-2 border-amber-400 text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus size={18} />
                <span className="font-semibold">إنشاء حساب جديد</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserBtn;
