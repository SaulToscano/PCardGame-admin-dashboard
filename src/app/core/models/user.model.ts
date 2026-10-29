export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  permission_level: number;
  validation_level: number;
  account_create_time: Date | null;
  last_login_time: Date | null;
  last_online_time: Date | null;
  refresh_key: string;
  proof_key: string;
  email_confirm_key: string;
  password_recovery_key: string;
  avatar: string;
  cardback: string;
  coins: number;
  xp: number;
  elo: number;
  matches: number;
  victories: number;
  defeats: number;
  cards: UserCard[];
  packs: UserPack[];
  decks: Record<string, any>[];
  avatars: string[];
  cardbacks: string[];
  rewards: string[];
  friends: string[];
  friends_requests: string[];
}

export interface UserCard {
  tid: string;
  variant: string;
  quantity: number;
  stars: number;
}

export interface UserPack {
  tid: string;
  quantity: number;
}