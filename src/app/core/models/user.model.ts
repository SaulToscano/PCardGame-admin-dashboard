export interface User {
  id: string;
  username: string;
  email: string;
  permission_level: number;
  validation_level: number;
  account_create_time?: string;
  last_login_time?: string;
  last_online_time?: string;
  coins: number;
  xp: number;
  elo: number;
  matches: number;
  victories: number;
  defeats: number;
  decks?: any[];
  cards?: any[];

  // Additional properties can be added here as needed
  avatar?: string;
  cardback?: string;
  avatars?: any[];
  cardbacks?: any[];
  rewards?: any[];
  friends?: any[];
  friends_requests?: any[];
  packs?: any[];
}