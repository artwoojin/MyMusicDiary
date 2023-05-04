export interface DiaryData {
  diaryId: number;
  title: string;
  body: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  comments: CommentData[];
  playlists: PlaylistData[];
  tags: string[];
  imageUrl: string;
}

export interface DiaryDataProps {
  list: DiaryData;
}

export interface PlaylistData {
  channelId?: number;
  title?: number;
  thumbnail?: string;
  url?: string;
}

export interface PlaylistDataProps {
  list: PlaylistData;
}

export interface CommentData {
  commentId: number;
  diaryId: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  imageUrl: string;
}

export interface CommentDataProps {
  list: CommentData;
}

export interface UserData {
  userId: number;
  nickname: string;
  email: string;
  password: string;
  imageUrl?: string;
  likeDiaries?: DiaryData[];
}

export interface FormValue {
  nickname?: string;
  email: string;
  password: string;
}

export interface ModalValue {
  title: string;
  text: string;
  confirmText: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
}
