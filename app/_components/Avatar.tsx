"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { FaPen } from "react-icons/fa";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const DynamicAvatar = () => {
  const [userData, setUserData] = useState({
    name: "",
    profileImage: "",
  })
  const { profileImage } = userData
  const [name, setName] = useState("")
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfileData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const handleSubmitInput = (e: React.ChangeEvent<HTMLInputElement> | { name?: string; profileImage?: string }) => {
    if ("target" in e) {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          const updatedData = { ...userData, profileImage: base64String };
          localStorage.setItem("userProfileData", JSON.stringify(updatedData));
          setUserData(updatedData);
        };
        reader.readAsDataURL(file);
      }
    } else {
      const updatedData = {
        ...userData,
        ...e,
      };
      localStorage.setItem("userProfileData", JSON.stringify(updatedData));
      setUserData(updatedData);
    }
  };
  const handleDeleteProfile = () => {
    localStorage.removeItem("userProfileData");
    setUserData({ name: "", profileImage: "" });
  }
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Avatar className="w-12 h-12 cursor-pointer">
            <AvatarImage
              src={profileImage || "https://ph.pinterest.com/hotaro_/no-pfp/"}
              alt="@user"
              className="object-cover w-full h-full"
            />
            <AvatarFallback>{userData.name[0] || "U"}</AvatarFallback>
          </Avatar>
        </SheetTrigger>

        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Seu Perfil</SheetTitle>
          </SheetHeader>
          <div className="flex item-center py-5 border-b border-solid gap-3 justify-between" >
            {userData.name ? (
              <div className="flex items-center py-5 border-b border-solid gap-3 justify-center">
              <div className="relative group">
                <Avatar className={`w-24 h-24 ${userData.name ? "cursor-pointer" : "cursor-default"}`}>
                  <AvatarImage
                    src={profileImage || "https://ph.pinterest.com/hotaro_/no-pfp/"}
                    alt="@user"
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback>{userData.name[0] || "U"}</AvatarFallback>
                </Avatar>
                <Badge className="absolute top-0 right-0 hidden group-hover:flex text-white bg-primary-foreground rounded-full w-8 h-8">
                  <FaPen className="w-6 h-6" />
                </Badge>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleSubmitInput}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{userData.name}</p>
              </div>
            </div>
            ) : (
              <div className="mx-auto justify-items-center gap-y-2">
                <p className="text-center text-sm text-gray-400 mt-4">
                  Clique abaixo para criar o seu perfil.
                </p>
                  <Dialog>
                    <DialogTrigger asChild>
                    <Button variant="default" className="mt-3">
                      Criar Perfil
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] rounded-xl">
                      <DialogTitle>Criar Perfil</DialogTitle>
                      <div className="">
                      <div className="relative group justify-items-center">
                        <Avatar className="w-44 h-44">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Preview da Imagem"
                              className="object-cover w-full h-full rounded-full"
                            />
                          ) : (
                            <AvatarFallback>Definir Imagem</AvatarFallback>
                          )}
                        </Avatar>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleSubmitInput}
                        />
                      </div>
                        <div className="mt-5">
                          <Input
                            placeholder="Digite seu nome"
                            value={name}
                            maxLength={12} // Limita a entrada a 12 caracteres
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="mt-5 flex justify-end">
                          <Button
                            variant="default"
                            onClick={() => {
                              if(!name) return;
                              handleSubmitInput({ name: name, profileImage: userData.profileImage });
                            }}
                          >
                            Concluir Perfil
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          {userData.name && (
            <SheetFooter>
              <div className="flex w-full">
                <Button variant="destructive" onClick={handleDeleteProfile} className="w-full h=full">
                  Deletar Perfil
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DynamicAvatar;
