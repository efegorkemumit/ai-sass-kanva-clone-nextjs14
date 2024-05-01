import { Image } from "@prisma/client";

declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "zoompan";

declare type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
      prompt: string;
      removeShadow?: boolean;
      multiple?: boolean;
    };
    recolor?: {
      prompt?: string;
      to: string;
      multiple?: boolean;
    };
    zoompan?: boolean;
  };


declare type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownload?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
  };

declare type TransformationFormProps = {
    action: "Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?: Image | null;
    config?: Transformations | null;
  };

  
declare type AddImageParams = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationUrl: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
};