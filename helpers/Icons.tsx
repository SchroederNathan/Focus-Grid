import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  Battery50Icon,
  BellIcon,
  BoltIcon,
  BookmarkIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CakeIcon,
  CalendarDaysIcon,
  CameraIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  FilmIcon,
  FireIcon,
  FolderIcon,
  HeartIcon,
  LanguageIcon,
  LightBulbIcon,
  ListBulletIcon,
  MoonIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  PencilIcon,
  PhoneXMarkIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  SparklesIcon,
  StarIcon,
  SunIcon,
  TrophyIcon,
  UserGroupIcon,
  WrenchIcon,
} from "react-native-heroicons/outline";


interface IconMapping {
  name: string;
  icon: any;
  category: string;
}

export const iconMappings: IconMapping[] = [
  // Physical Health & Fitness
  {
    name: "Exercise",
    icon: BoltIcon,
    category: "Fitness",
  },
  {
    name: "Activity",
    icon: FireIcon,
    category: "Fitness",
  },
  {
    name: "Weight",
    icon: ScaleIcon,
    category: "Fitness",
  },

  // Mental & Educational
  {
    name: "Reading",
    icon: BookOpenIcon,
    category: "Education",
  },
  {
    name: "Learning",
    icon: AcademicCapIcon,
    category: "Education",
  },
  {
    name: "Ideas",
    icon: LightBulbIcon,
    category: "Education",
  },
  {
    name: "Writing",
    icon: PencilIcon,
    category: "Education",
  },
  {
    name: "Bookmark",
    icon: BookmarkIcon,
    category: "Education",
  },
  {
    name: "Language",
    icon: LanguageIcon,
    category: "Education",
  },

  // Wellness & Mindfulness
  {
    name: "Sleep",
    icon: MoonIcon,
    category: "Wellness",
  },
  {
    name: "Meditation",
    icon: SparklesIcon,
    category: "Wellness",
  },
  {
    name: "Self Care",
    icon: HeartIcon,
    category: "Wellness",
  },
  {
    name: "Morning",
    icon: SunIcon,
    category: "Wellness",
  },
  {
    name: "Mood",
    icon: FaceSmileIcon,
    category: "Wellness",
  },

  // Nutrition & Health
  {
    name: "No Sugar",
    icon: CakeIcon,
    category: "Nutrition",
  },

  // Productivity & Goals
  {
    name: "Time",
    icon: ClockIcon,
    category: "Productivity",
  },
  {
    name: "Planning",
    icon: CalendarDaysIcon,
    category: "Productivity",
  },
  {
    name: "Tasks",
    icon: CheckCircleIcon,
    category: "Productivity",
  },
  {
    name: "Progress",
    icon: ArrowTrendingUpIcon,
    category: "Productivity",
  },
  {
    name: "Files",
    icon: FolderIcon,
    category: "Productivity",
  },
  {
    name: "Reminders",
    icon: BellIcon,
    category: "Productivity",
  },
  {
    name: "Todo List",
    icon: ListBulletIcon,
    category: "Productivity",
  },
  {
    name: "Phone",
    icon: DevicePhoneMobileIcon,
    category: "Productivity",
  },

  // Lifestyle & Habits
  {
    name: "Energy",
    icon: Battery50Icon,
    category: "Lifestyle",
  },
  {
    name: "Goals",
    icon: StarIcon,
    category: "Lifestyle",
  },
  {
    name: "Achievement",
    icon: TrophyIcon,
    category: "Lifestyle",
  },
  {
    name: "Digital Detox",
    icon: PhoneXMarkIcon,
    category: "Lifestyle",
  },
  {
    name: "Photography",
    icon: CameraIcon,
    category: "Lifestyle",
  },
  {
    name: "Film",
    icon: FilmIcon,
    category: "Lifestyle",
  },

  // Skills & Development
  {
    name: "Work",
    icon: BriefcaseIcon,
    category: "Skills",
  },
  {
    name: "Presentation",
    icon: PresentationChartLineIcon,
    category: "Skills",
  },
  {
    name: "Art",
    icon: PaintBrushIcon,
    category: "Skills",
  },
  {
    name: "Music",
    icon: MusicalNoteIcon,
    category: "Skills",
  },
  {
    name: "Coding",
    icon: CodeBracketIcon,
    category: "Skills",
  },
  {
    name: "DIY",
    icon: WrenchIcon,
    category: "Skills",
  },

  // Social & Communication
  {
    name: "Social",
    icon: UserGroupIcon,
    category: "Social",
  },
  {
    name: "Email",
    icon: EnvelopeIcon,
    category: "Social",
  },

  // Financial
  {
    name: "Savings",
    icon: BanknotesIcon,
    category: "Financial",
  },
  {
    name: "Expenses",
    icon: CreditCardIcon,
    category: "Financial",
  },
  {
    name: "Investments",
    icon: ChartBarIcon,
    category: "Financial",
  },
];

// Helper functions
export const getIconByName = (name: string) => {
  return iconMappings.find((mapping) => mapping.name === name)?.icon;
};

export const getIconsByCategory = (category: string) => {
  return iconMappings.filter((mapping) => mapping.category === category);
};

export const getAllCategories = () => {
  return [...new Set(iconMappings.map((mapping) => mapping.category))];
};

export const getAllIcons = () => {
  return iconMappings.map((mapping) => mapping.icon);
};

// For backward compatibility
export const heroIcons = iconMappings.map((mapping) => mapping.icon);
