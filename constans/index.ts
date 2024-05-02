import { FiHome, FiImage, FiStar, FiScissors, FiMinus, FiFilter, FiCamera, FiUser, FiShoppingBag } from 'react-icons/fi';

export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: FiHome,
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: FiImage,
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: FiStar,
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: FiScissors,
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: FiFilter,
  },
  {
    label: "Zoompan",
    route: "/transformations/add/zoompan",
    icon: FiCamera,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: FiUser,
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: FiShoppingBag,
  },
];


export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const plans = [
  {
    _id: 1,
    name: "Free",
    price: 0,
    credits: 10,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    price: 35,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    price: 150,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const creditFee = -1;

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: FiImage,
  },
  zoompan: {
    type: "zoompan",
    title: "zoomPan",
    subTitle: "zoomPan of the image using AI",
    config: { zoompan: true },
    icon: FiCamera,
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: FiStar,
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: FiMinus,
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: FiFilter,
  },
};



export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};