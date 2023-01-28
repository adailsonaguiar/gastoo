import {create} from 'zustand';
import Realm from 'realm';

type UseRealmProps = {
  realm: Realm | null;
  setRealm: (realm: Realm) => void;
};

export const useRealm = create<UseRealmProps>(set => ({
  realm: null,
  setRealm: (realm: Realm) => set({realm}),
}));
