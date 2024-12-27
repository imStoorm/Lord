"use client";

import { useState, useEffect } from "react";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCardContent } from "./ui/hover-card";
import { Input } from "./ui/input";

const DynamicAvatar = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSubmitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        localStorage.setItem("userProfileImage", base64String);
        setProfileImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarImage src={profileImage || "https://ph.pinterest.com/hotaro_/no-pfp/"} alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            max="1"
            onChange={handleSubmitInput}
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default DynamicAvatar;
