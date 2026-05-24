import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { env, hasSupabaseEnv, missingSupabaseConfigMessage } from './env';

const authConfig = {
  storage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
};

function createMissingConfigClient() {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(missingSupabaseConfigMessage);
      },
    },
  ) as ReturnType<typeof createClient>;
}

export const supabase = hasSupabaseEnv()
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: authConfig,
    })
  : createMissingConfigClient();
