export interface UserData {
    user_id: string;
    username: string;
    email: string;
    profileImg: string;
    current_level: string;
    next_level: string;
    level: number;
    referral_code: string;
    emailIsVerified: boolean;
    emailIsLinked: boolean;
    profileIsHidden: boolean;
    is_verified: boolean;
    status: 'active' | 'disabled';
}