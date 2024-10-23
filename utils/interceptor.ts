export const interceptor = async (path: string, method: string, body: any) => {
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig();

  const accessToken = useCookie<string>("_token");
  const refreshToken = useCookie<string>("_refreshToken");
  const user = useCookie<string>("_user");

  let token = accessToken.value;

  try {
    const { data, error } = await useFetch(
      runtimeConfig.public.NUXT_SERVICES_API + path,
      {
        async onRequest({ options }: any) {
          options.method = method;
          options.headers = options.headers || {};
          options.headers.authorization = `Bearer ${token}`;
          options.headers["Accept"] = "application/json";
          options.body = body;
        },

        async onResponseError({ response }) {
          if (response.status === 401) {
            const refreshResponse = await useFetch(
              runtimeConfig.public.NUXT_SERVICES_API + "refresh",
              {
                async onRequest({ options }: any) {
                  options.method = "POST";
                  options.headers = options.headers || {};
                  options.headers.authorization = `Bearer ${refreshToken.value}`;
                },
              }
            );

            if (refreshResponse.data?.value) {
              accessToken.value = (
                refreshResponse.data.value as any
              ).access_token;
              token = accessToken.value;

              const retryResponse = await useFetch(
                runtimeConfig.public.NUXT_SERVICES_API + path,
                {
                  async onRequest({ options }: any) {
                    options.method = method;
                    options.headers = options.headers || {};
                    options.headers.authorization = `Bearer ${token}`;
                    options.headers["Accept"] = "application/json";
                    options.body = body;
                  },
                }
              );

              return retryResponse.data.value;
            } else {
              window.location.href = "/login";
              clearAuthCookies();
            }
          }
        },
      }
    );

    return data.value;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

  function clearAuthCookies() {
    accessToken.value = "";
    refreshToken.value = "";
    user.value = "";
  }
};
