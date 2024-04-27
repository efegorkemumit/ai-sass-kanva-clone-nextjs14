import { FiHome, FiImage, FiStar, FiScissors, FiFilter, FiCamera, FiUser, FiShoppingBag } from 'react-icons/fi';

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
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
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
