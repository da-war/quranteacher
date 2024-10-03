import arrowDown from "../assets/icons/arrow-down.png";
import arrowUp from "../assets/icons/arrow-up.png";
import backArrow from "../assets/icons/back-arrow.png";
import chat from "../assets/icons/chat.png";
import checkmark from "../assets/icons/check.png";
import close from "../assets/icons/close.png";
import dollar from "../assets/icons/dollar.png";
import email from "../assets/icons/email.png";
import eyecross from "../assets/icons/eyecross.png";
import google from "../assets/icons/google.png";
import home from "../assets/icons/home.png";
import list from "../assets/icons/list.png";
import lock from "../assets/icons/lock.png";
import map from "../assets/icons/map.png";
import marker from "../assets/icons/marker.png";
import out from "../assets/icons/out.png";
import person from "../assets/icons/person.png";
import pin from "../assets/icons/pin.png";
import point from "../assets/icons/point.png";
import profile from "../assets/icons/profile.png";
import search from "../assets/icons/search.png";
import selectedMarker from "../assets/icons/selected-marker.png";
import star from "../assets/icons/star.png";
import target from "../assets/icons/target.png";
import to from "../assets/icons/to.png";
import check from "../assets/images/check.png";
import message from "../assets/images/message.png";
import noResult from "../assets/images/no-result.png";
import apple from '../assets/icons/apple.png';
import onboard from '../assets/images/onboard.png';
import q from '../quran/quran.json';
import qen from '../quran/quranEnglish.json';
import qurTq from '../quran/quranUrduQadari.json';
import qurJun from '../quran/quranUrduJunnaghar.json';
import qurMou from '../quran/quranUrduMoudodi.json';
import qurJalan from '../quran/qurdanUrduJalandari.json';
import qhi from '../quran/quranHindi.json';
import qin from '../quran/quranIndo.json';
import qfr from '../quran/quranFrench.json';
import logo from '../assets/images/logo.png';


import quranAnimation from '../assets/animations/quran.json';
import bis from '../assets/animations/bis.json';
import { Teacher } from "@/types/type";


export const animations={
  quranAnimation,
  bis,
}

export const images = {
  check,
  noResult,
  message,
  onboard,
    logo
};
export const quranAll={
  q,
  qen,
  qfr,
  qin,
  qhi,
  qurJun,
  qurMou,
  qurTq,
  qurJalan
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
export const FONTS = {
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};

export const translationEditions = [
  { id: 1, name: 'english', placeholderText: "English: by Muhammad Asad" },
  { id: 2, name: 'french', placeholderText: "French: by Muhammad Hamidullah" },
  { id: 3, name: 'hindi', placeholderText: "Hindi: by Suhel Farooq Khan and Saifur Rahman Nadwi" },
  { id: 4, name: 'indonesian', placeholderText: "Indonesian: by Quran.com" },
  { id: 5, name: 'urdu_maududi', placeholderText: "Urdu: (Maulana Maududi)" },
  { id: 6, name: 'urdu_qadri', placeholderText: "Urdu: (Dr Tahir ul Qadari)" },
  { id: 7, name: 'urdu_jalandhari', placeholderText: "Urdu: (Fateh Muhammad Jalandhari)" },
  { id: 8, name: 'urdu_junagarhi', placeholderText: "Urdu: Muhammad Junagarhi" },
];


export const colors={
  primary:"#4E2999",
}


// declare interface Teacher {
//     name: string;
//     phone: string;
//     address: string;
//     city: string;
//    gender: string;
//     hafiz: string;
//     teachingExperience: number;
//     availability?: string;
//     languages?: string[];
//     profilePicture?: string;
//     qualifications?: string[];
//     certificates?: string[];
//     videoIntro?:string;
//     bio?:string;
//     rating?:number;
//     verified?:boolean;
//     expoNotificationToken?:string;
//   }


export const teachers: Teacher[] = [
  {
    name: "Dawar",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=1",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Muhammad",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=2",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Ali",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=1323",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Alis",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=3463",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Alisaf",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=357",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Algdsfi",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=5673",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "Alwerwei",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=653",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "sdffsd",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=233",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
  {
    name: "fsdfds",
    phone: "0333-1234567",
    address: "House 123, Street 123, Area 123",
    city: "Karachi",
    gender: "male",
    hafiz: "yes",
    teachingExperience: 5,
    availability: "Full Time",
    languages: ["English", "Urdu", "Arabic"],
    profilePicture: "https://picsum.photos/200/300?random=324",
    qualifications: ["BS IT", "MS Islamiat"],
    certificates: ["Degree 1", "Degree 2"],
    videoIntro: "https://www.youtube.com/watch?v=123",
    bio: "I am a professional teacher with 5 years of experience",
    rating: 4.5,
    verified: true,
    expoNotificationToken: "ExponentPushToken[123]",
  },
];
 