import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";
import m from "@/assets/images/m.png";
import m1 from "@/assets/images/m1.png";
import m2 from "@/assets/images/m2.png";
import quran from '@/assets/images/quran.png';

import apple from '@/assets/icons/apple.png';


import q from '../quran.json';
import qen from '../quranEnglish.json';
import qur from '../quranUrdu.json';
import qfr from '../quranFrench.json';
import qhi from '../quranHindi.json';
import qin from '../quranIndo.json';


export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  signUpCar,
  check,
  noResult,
  message,
  m,
  m1,
  m2,
  quran
};

export const quranAll={
  q,
  qen,
  qur,
  qfr,
  qin,
  qhi,
}

export const icons = {
  apple,
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};


export const onboarding = [
  {
    id: 2,
    
    title: "Explore the Quran in Your Language!",
    
      description:
      "Read and understand the Quran in your language with ease.",
    image: images.m1,
  },
  {
    id: 1,
    title: "Connect with Quran Teachers",
    description:
    "Find knowledgeable teachers to guide you and your family in Quranic learning.",
    image: images.m,
  },
  {
    id: 3,
    title: "Enhance Your Quranic Journey",
    description:
      "Access a wealth of resources to support and enrich your Quranic studies.",
    image: images.m2,
  },
];


export const data = {
  onboarding,
};




export const FONTS = {
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};