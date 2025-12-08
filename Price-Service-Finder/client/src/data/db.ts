
export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  deliveryTime?: string;
  requirements?: string;
  tag?: string; // New field for tags like NON-DROP, LIFETIME
  provider: string;
  link: string;
  image?: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'social' | 'subscription';
}

export const categories: Category[] = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'from-pink-500 via-red-500 to-yellow-500', type: 'social' },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: 'from-red-600 to-red-500', type: 'social' },
  { id: 'spotify', name: 'Spotify', icon: 'Music', color: 'from-green-500 to-emerald-500', type: 'social' },
  { id: 'netflix', name: 'Netflix', icon: 'Tv', color: 'from-red-900 to-red-600', type: 'subscription' },
  { id: 'prime', name: 'Prime Video', icon: 'Video', color: 'from-blue-500 to-cyan-400', type: 'subscription' },
  { id: 'jiohotstar', name: 'JioHotstar', icon: 'Tv', color: 'from-blue-700 to-blue-500', type: 'subscription' },
  { id: 'crunchyroll', name: 'Crunchyroll', icon: 'Zap', color: 'from-orange-500 to-amber-500', type: 'subscription' },
  { id: 'canva', name: 'Canva Pro', icon: 'Palette', color: 'from-purple-500 to-cyan-500', type: 'subscription' },
  { id: 'ytpremium', name: 'YouTube Premium', icon: 'PlayCircle', color: 'from-red-600 to-rose-600', type: 'subscription' },
];

export const services: ServiceItem[] = [
  // YouTube Services
  {
    id: 'yt-1',
    name: 'YouTube Indian Subscribers',
    category: 'youtube',
    price: '₹3500/1k',
    tag: 'NON-DROP',
    description: 'High quality Indian subscribers for organic growth.',
    deliveryTime: '24-48 Hours',
    requirements: 'Channel Link',
    features: ['Monetization Safe', 'Real Indian Users', 'Organic Growth'],
    provider: 'TubeBoost',
    link: 'https://youtube.com'
  },
  {
    id: 'yt-2',
    name: 'YouTube Views',
    category: 'youtube',
    price: '₹160/1k',
    tag: 'NON-DROP',
    description: 'High retention views suitable for ranking.',
    deliveryTime: '12-24 Hours',
    requirements: 'Video Link',
    features: ['High Retention', 'Suggested Traffic', 'Ads Safe'],
    provider: 'TubeBoost',
    link: 'https://youtube.com',
    popular: true
  },
  {
    id: 'yt-3',
    name: 'YouTube Likes',
    category: 'youtube',
    price: '₹130/1k',
    description: 'Instant likes to boost engagement rate.',
    deliveryTime: 'Instant',
    requirements: 'Video Link',
    features: ['Real Likes', 'Lifetime Guarantee', 'Instant Start'],
    provider: 'TubeBoost',
    link: 'https://youtube.com'
  },
  {
    id: 'yt-4',
    name: 'YouTube Comments',
    category: 'youtube',
    price: '₹900/1k',
    description: 'Engaging comments related to your content.',
    deliveryTime: '24 Hours',
    requirements: 'Video Link',
    features: ['Custom Comments', 'English/Hindi', 'Real Users'],
    provider: 'TubeBoost',
    link: 'https://youtube.com'
  },
  {
    id: 'yt-5',
    name: 'YouTube Shorts Views',
    category: 'youtube',
    price: '₹550/100k',
    description: 'Massive views package for Shorts viral potential.',
    deliveryTime: 'Instant',
    requirements: 'Shorts Link',
    features: ['Feed Traffic', 'Fast Delivery', 'Ranking Boost'],
    provider: 'TubeBoost',
    link: 'https://youtube.com'
  },

  // Instagram Services
  {
    id: 'ig-1',
    name: 'Instagram Indian Followers',
    category: 'instagram',
    price: '₹315/1k',
    tag: 'LIFETIME',
    description: 'Premium Indian followers with lifetime guarantee.',
    deliveryTime: '0-1 Hours',
    requirements: 'Profile URL',
    features: ['Real Profiles', 'Lifetime Refill', 'Instant Start'],
    provider: 'SMMKing',
    link: 'https://instagram.com',
    popular: true
  },
  {
    id: 'ig-2',
    name: 'Instagram Real Followers',
    category: 'instagram',
    price: '₹420/1k',
    tag: '365 DAYS',
    description: 'Top quality real followers with 1 year guarantee.',
    deliveryTime: 'Instant',
    requirements: 'Profile URL',
    features: ['Non-Drop', 'Active Profiles', '365 Days Refill'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-3',
    name: 'Instagram Reels Likes',
    category: 'instagram',
    price: '₹150/1k',
    description: 'Optimized likes for Reels algorithm.',
    deliveryTime: 'Instant',
    requirements: 'Reel URL',
    features: ['Algorithm Safe', 'High Quality', 'Instant Start'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-4',
    name: 'Instagram Reels Views',
    category: 'instagram',
    price: '₹35/1k',
    tag: 'NON-DROP',
    description: 'High speed views for Reels visibility.',
    deliveryTime: 'Instant',
    requirements: 'Reel URL',
    features: ['Viral Boost', 'High Retention', 'Instant Delivery'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-5',
    name: 'Instagram Impressions',
    category: 'instagram',
    price: '₹90/1k',
    description: 'Boost your reach and impression stats.',
    deliveryTime: '1 Hour',
    requirements: 'Post URL',
    features: ['Profile Visits', 'Explore Reach', 'Insights Boost'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-6',
    name: 'Instagram Comments',
    category: 'instagram',
    price: '₹850/1k',
    description: 'Real comments to boost post engagement.',
    deliveryTime: '2-4 Hours',
    requirements: 'Post URL',
    features: ['Custom Text', 'Real Accounts', 'Emoji Support'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-7',
    name: 'Instagram Saves',
    category: 'instagram',
    price: '₹55/1k',
    description: 'Saves help rank your posts on hashtags.',
    deliveryTime: 'Instant',
    requirements: 'Post URL',
    features: ['Ranking Boost', 'High Quality', 'Permanent'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-8',
    name: 'Instagram Reach Boost',
    category: 'instagram',
    price: '₹60/1k',
    description: 'Increase unique account reach.',
    deliveryTime: '24 Hours',
    requirements: 'Post URL',
    features: ['Unique Reach', 'Viral Chances', 'Safe Method'],
    provider: 'SMMKing',
    link: 'https://instagram.com'
  },

  // Spotify Services
  {
    id: 'sp-1',
    name: 'Spotify Followers',
    category: 'spotify',
    price: '₹70/1k',
    tag: 'NON-DROP',
    description: 'Stable followers for Artist or Playlist.',
    deliveryTime: '24 Hours',
    requirements: 'Profile Link',
    features: ['Real Profiles', 'Non-Drop', 'Stable'],
    provider: 'MusicPro',
    link: 'https://spotify.com'
  },
  {
    id: 'sp-2',
    name: 'Spotify Track Plays',
    category: 'spotify',
    price: '₹90/1k',
    description: 'Premium plays for your tracks.',
    deliveryTime: '12-24 Hours',
    requirements: 'Track Link',
    features: ['Premium Plays', 'Royalty Safe', 'Algorithm Boost'],
    provider: 'MusicPro',
    link: 'https://spotify.com'
  },

  // Netflix
  {
    id: 'nf-1',
    name: 'Monthly Subscription',
    category: 'netflix',
    price: '₹130/mo',
    description: 'Shared premium account, 4K UHD supported.',
    deliveryTime: 'Instant (Email)',
    requirements: 'Email Address',
    features: ['4K Ultra HD', '1 Screen', 'Download Supported'],
    provider: 'CheapStream',
    link: 'https://netflix.com',
    popular: true
  },
  {
    id: 'nf-2',
    name: 'Annual Subscription',
    category: 'netflix',
    price: '₹1150/yr',
    description: 'Yearly shared premium access.',
    deliveryTime: 'Instant (Email)',
    requirements: 'Email Address',
    features: ['4K Ultra HD', '1 Screen', 'Warranty'],
    provider: 'CheapStream',
    link: 'https://netflix.com'
  },
  {
    id: 'nf-3',
    name: 'Private Subscription',
    category: 'netflix',
    price: '₹190/mo',
    description: 'Private profile access.',
    deliveryTime: '1-2 Hours',
    requirements: 'Your Email',
    features: ['Private Profile', 'PIN Lock', '4K UHD'],
    provider: 'CheapStream',
    link: 'https://netflix.com'
  },

  // Prime Video
  {
    id: 'pv-1',
    name: 'Monthly Subscription',
    category: 'prime',
    price: '₹120/mo',
    description: 'Prime Video + Music + Shopping.',
    deliveryTime: 'Instant',
    requirements: 'Email',
    features: ['Full Prime', '4K HDR', 'Ad-Free Music'],
    provider: 'PrimeReseller',
    link: 'https://primevideo.com'
  },
  {
    id: 'pv-2',
    name: 'Annual Subscription',
    category: 'prime',
    price: '₹1250/yr',
    description: 'Yearly Prime membership.',
    deliveryTime: 'Instant',
    requirements: 'Email',
    features: ['Full Prime', '4K HDR', 'Best Value'],
    provider: 'PrimeReseller',
    link: 'https://primevideo.com'
  },

  // JioHotstar
  {
    id: 'jh-1',
    name: 'Monthly Subscription',
    category: 'jiohotstar',
    price: '₹125/mo',
    description: 'Premium sports and entertainment.',
    deliveryTime: 'Instant',
    requirements: 'Phone Number',
    features: ['Live Sports', '4K Quality', 'Ad-Free Movies'],
    provider: 'JioHotstar',
    link: 'https://hotstar.com',
    popular: true
  },
  {
    id: 'jh-2',
    name: 'Annual Subscription',
    category: 'jiohotstar',
    price: '₹1399/yr',
    description: 'Yearly premium access.',
    deliveryTime: 'Instant',
    requirements: 'Phone Number',
    features: ['Live Sports', '4K Quality', 'Best Value'],
    provider: 'JioHotstar',
    link: 'https://hotstar.com'
  },

  // Crunchyroll
  {
    id: 'cr-1',
    name: 'Monthly Fan',
    category: 'crunchyroll',
    price: '₹120/mo',
    description: 'Ad-free anime streaming.',
    deliveryTime: 'Instant',
    requirements: 'Email',
    features: ['No Ads', 'Simulcast', 'HD Streaming'],
    provider: 'Crunchyroll',
    link: 'https://crunchyroll.com'
  },
  {
    id: 'cr-2',
    name: 'Annual Fan',
    category: 'crunchyroll',
    price: '₹450/yr',
    description: 'Yearly ad-free anime.',
    deliveryTime: 'Instant',
    requirements: 'Email',
    features: ['No Ads', 'Simulcast', 'Offline Viewing'],
    provider: 'Crunchyroll',
    link: 'https://crunchyroll.com'
  },

  // Canva Pro
  {
    id: 'cp-1',
    name: 'Monthly Subscription',
    category: 'canva',
    price: '₹130/mo',
    description: 'Join a Pro team for full access.',
    deliveryTime: 'Instant',
    requirements: 'Canva Email',
    features: ['Pro Templates', 'Magic Resize', 'Brand Kit'],
    provider: 'Canva',
    link: 'https://canva.com'
  },
  {
    id: 'cp-2',
    name: 'Annual Subscription',
    category: 'canva',
    price: '₹399/yr',
    description: 'Yearly Pro team access.',
    deliveryTime: 'Instant',
    requirements: 'Canva Email',
    features: ['Pro Templates', 'Magic Resize', 'Brand Kit'],
    provider: 'Canva',
    link: 'https://canva.com'
  },

  // YouTube Premium
  {
    id: 'yp-1',
    name: 'Monthly Subscription',
    category: 'ytpremium',
    price: '₹90/mo',
    description: 'Ad-free YouTube & Music.',
    deliveryTime: 'Instant',
    requirements: 'Google Email',
    features: ['No Ads', 'Background Play', 'Downloads'],
    provider: 'Google',
    link: 'https://youtube.com'
  },
  {
    id: 'yp-2',
    name: 'Family Plan',
    category: 'ytpremium',
    price: '₹199/mo',
    description: 'Share with up to 5 family members.',
    deliveryTime: 'Instant',
    requirements: 'Google Email',
    features: ['5 Accounts', 'No Ads', 'Best Value'],
    provider: 'Google',
    link: 'https://youtube.com'
  }
];
