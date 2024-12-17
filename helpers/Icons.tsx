import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  Battery100Icon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CameraIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  EyeIcon,
  FaceSmileIcon,
  FilmIcon,
  FireIcon,
  GiftIcon,
  GlobeAltIcon,
  HandThumbUpIcon,
  HeartIcon,
  HomeIcon,
  LightBulbIcon,
  MoonIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  PencilIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  SunIcon,
  TrophyIcon,
  TruckIcon,
  UserGroupIcon,
  WalletIcon,
  WrenchIcon,
} from "react-native-heroicons/outline";

export const heroIcons = [
  HomeIcon,
  ChartBarIcon,
  EyeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  TruckIcon,
  WalletIcon,
  WrenchIcon,
  ChatBubbleBottomCenterTextIcon,
  FaceSmileIcon,
  UserGroupIcon,
  HandThumbUpIcon,
  PaintBrushIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  CameraIcon,
  FilmIcon,
  GiftIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  BoltIcon,
  TrophyIcon,
  Battery100Icon,
  MoonIcon,
  SunIcon,
  ScaleIcon,
  SparklesIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ClockIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
  LightBulbIcon,
  PencilIcon,
  PencilSquareIcon,
  BookOpenIcon,
];

import React, { useMemo } from "react";

interface IconWrapperProps {
  Icon: React.ComponentType<any>; // Accepts any icon component
  size?: number;
  strokeWidth?: number;
  color?: string;
  onPress?: () => void;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  Icon,
  size = 24,
  strokeWidth = 2,
  color = "black",
}) => {
  return <Icon size={size} strokeWidth={strokeWidth} color={color} />;
};

export default IconWrapper;
