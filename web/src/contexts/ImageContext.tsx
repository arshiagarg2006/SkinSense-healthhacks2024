import { useContext, createContext, useState } from "react";

interface ImageContext {
  image: FormData | null;
  setImage: React.Dispatch<React.SetStateAction<FormData | null>>;
}

const ImageContext = createContext<ImageContext | undefined>(undefined);

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<FormData | null>(null);
  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
