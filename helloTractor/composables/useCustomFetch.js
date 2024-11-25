export const useCustomFetch = async (url, options, type = '') => {
  const config = useRuntimeConfig();
  const { token, signOut } = useAuth();

  let mainUrl = config.public.apiURL;

  if (!url.startsWith('/') && !mainUrl.endsWith('/')) {
    url = '/' + url;
  }
  else if (url.startsWith('/') && mainUrl.endsWith('/')) {
    url = url.substring(1);
  }

  try {
    const data = await $fetch(mainUrl + url, {
      headers: {
        Authorization: token.value,
        ...options?.headers,
      },
      ...options,
    });
    if (data?.status === 401) {
      // useAuth().signOut();
      await signOut({ callbackUrl: '/auth/login' });
    }
    return data;
  }
  catch (e) {
    if (e?.status === 401) {
      // useAuth().signOut();
      await signOut({ callbackUrl: '/auth/login' });
    }
    throw e;
  }
};
