import type { CallbackFunc } from '../main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: VoidFunction;
        on: (channel: string, func: CallbackFunc) => VoidFunction | undefined;
        once: (channel: string, func: CallbackFunc) => void;
      };
    };
  }
}

export {};
