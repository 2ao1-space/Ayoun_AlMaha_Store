"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showOnlineStatus?: boolean;
  className?: string;
}

interface UserProfile {
  full_name: string;
  avatar_url?: string;
}

export function UserAvatar({
  size = "md",
  showOnlineStatus = false,
  className = "",
}: UserAvatarProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const supabase = createClient();

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const onlineIndicatorSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-5 h-5",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserProfile(profile);
        }
      }
    };

    fetchUserProfile();
  }, [supabase]);

  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!userProfile) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-gray-200 animate-pulse ${className}`}
      ></div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {userProfile.avatar_url ? (
        <img
          src={userProfile.avatar_url}
          alt={userProfile.full_name}
          className={`${sizes[size]} rounded-full object-cover border-2 border-amber-500`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold border-2 border-amber-500`}
        >
          {getInitials(userProfile.full_name)}
        </div>
      )}
      {showOnlineStatus && (
        <div
          className={`absolute bottom-0 right-0 ${onlineIndicatorSizes[size]} bg-green-500 rounded-full border-2 border-white`}
        ></div>
      )}
    </div>
  );
}
