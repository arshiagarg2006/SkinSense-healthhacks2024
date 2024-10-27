import { useContext, createContext, useState } from "react";

interface ImageContext {
  image: FormData | null;
  setImage: React.Dispatch<React.SetStateAction<FormData | null>>;
  filename: string;
  setFilename: React.Dispatch<React.SetStateAction<string>>;
}

const ImageContext = createContext<ImageContext | undefined>(undefined);

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<FormData | null>(null);
  const [filename, setFilename] = useState<string>("");
  return (
    <ImageContext.Provider value={{ image, setImage, filename, setFilename }}>
      {children}
    </ImageContext.Provider>
  );
};
