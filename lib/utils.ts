import { aspectRatioOptions } from "@/constans";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AspectRatioKey = keyof typeof aspectRatioOptions;

// DEBOUNCE
// Belirli bir gecikme süresiyle bir fonksiyonu tetikleyen debounce fonksiyonu
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Resmin genişliği veya yüksekliğini alır
export const getImageSize = (
  type: string, // Resim tipi
  image: any, // Resim nesnesi
  dimension: "width" | "height" // Boyut - genişlik veya yükseklik
): number => {
  if (type === "fill") { // Eğer tip "fill" ise
    // İlgili en-boy oranına göre belirli boyutu al veya 1000 varsayılan değeri döndür
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  // Eğer tip "fill" değilse, resmin boyutunu al veya 1000 varsayılan değeri döndür
  return image?.[dimension] || 1000;
};

// RESMİ İNDİR
// Verilen URL'den resmi indiren fonksiyon
export const download = (url: string, filename: string) => {
  if (!url) { // Eğer URL yoksa
    throw new Error("Kaynak URL belirtilmedi! Bir tane sağlamanız gerekiyor");
  }

  // URL'den veri çeken fetch işlemi
  fetch(url)
    .then((response) => response.blob()) // Gelen yanıtı blob olarak al
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob); // Blob URL oluştur
      const a = document.createElement("a"); // <a> elementi oluştur
      a.href = blobURL; // URL'yi ayarla

      if (filename && filename.length) // Eğer dosya adı varsa
        a.download = `${filename.replace(" ", "_")}.png`; // İndirme adını ayarla
      document.body.appendChild(a); // <a> elementini belgeye ekle
      a.click(); // İndirme işlemini başlat
    })
    .catch((error) => console.log({ error })); // Hata durumunda konsola yazdır
};

// NESNELERİ DERİNLEMESİNE BİRLEŞTİR
// İki nesneyi birleştiren fonksiyon
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if(obj2 === null || obj2 === undefined) { // Eğer ikinci nesne yoksa
    return obj1; // İlk nesneyi döndür
  }

  let output = { ...obj2 }; // İkinci nesneyi temel alan bir çıktı nesnesi oluştur

  for (let key in obj1) { // İlk nesne üzerinde döngü
    if (obj1.hasOwnProperty(key)) { // Anahtar objeye aitse
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]); // İki nesneyi birleştir
      } else {
        output[key] = obj1[key]; // İki nesne birleştirilemiyorsa, ilk nesneyi al
      }
    }
  }

  return output; // Birleştirilmiş nesneyi döndür
};
