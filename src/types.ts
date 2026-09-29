export type Town = 'Kitwe' | 'Ndola' | 'Chingola' | 'Lusaka' | 'Mufulira' | 'Luanshya';

export type Category = 
  | 'Building & Civil'
  | 'Heavy Equipment Hire'
  | 'Electrical & Solar'
  | 'Plumbing & Finishing';

export type NCCGrade = 
  | 'NCC Grade 1'
  | 'NCC Grade 2'
  | 'NCC Grade 3'
  | 'NCC Grade 4'
  | 'NCC Grade 5'
  | 'NCC Grade 6';

export type SubscriptionTier = 'Free Trial' | 'Starter' | 'Professional' | 'Enterprise';
export type SubscriptionStatus = 'Active Trial' | 'Paid' | 'Expired';

export interface ProjectPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  town: Town;
  category: Category;
  nccGrade: NCCGrade;
  rating: number;
  reviewsCount: number;
  shortBio: string;
  fullDescription: string;
  services: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  isVerified: boolean;
  isFeatured: boolean;
  status: SubscriptionStatus;
  plan: SubscriptionTier;
  trialDaysLeft: number;
  leadClicks: number;
  viewsCount: number;
  photos: ProjectPhoto[];
  joinedDate: string;
}

export interface UserAccount {
  fullName: string;
  email: string;
  phone: string;
  companyId?: string;
  isLoggedIn: boolean;
}

export type ActiveTab = 'storefront' | 'onboarding' | 'dashboard' | 'pricing' | 'admin';
