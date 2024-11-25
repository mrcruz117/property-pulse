'use client';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { createMsgStore, type MsgStore } from '@/stores/msg-store';

export type MsgStoreApi = ReturnType<typeof createMsgStore>;

export const MsgStoreContext = createContext<MsgStoreApi | undefined>(
  undefined
);

export interface MsgStoreProviderProps {
  children: ReactNode;
}

export const MsgStoreProvider = ({ children }: MsgStoreProviderProps) => {
  const storeRef = useRef<MsgStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createMsgStore();
  }
  return (
    <MsgStoreContext.Provider value={storeRef.current}>
      {children}
    </MsgStoreContext.Provider>
  );
};

export const useMsgStore = <T,>(selector: (store: MsgStore) => T): T => {
  const msgStoreContext = useContext(MsgStoreContext);
  if (!msgStoreContext) {
    throw new Error('useMsgStore must be used within a MsgStoreProvider');
  }
  return useStore(msgStoreContext, selector);
};
