import { createStore } from 'zustand/vanilla';

export type MsgState = {
  unreadCount: number;
};

export type MsgActions = {
  setUnreadCount: (count: number) => void;
};

export type MsgStore = MsgState & MsgActions;

export const defaultInitState: MsgState = {
  unreadCount: 0,
};

export const createMsgStore = (initState: MsgState = defaultInitState) => {
  return createStore<MsgStore>((set) => ({
    ...initState,
    setUnreadCount: (count) => set({ unreadCount: count }),
  }));
};
