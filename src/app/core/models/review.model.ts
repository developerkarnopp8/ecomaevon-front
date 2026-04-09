export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  rating: number;
  title: string;
  body: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface ReviewSummary {
  average: number;
  total: number;
  distribution: { [stars: number]: number };
}
