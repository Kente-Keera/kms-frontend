export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("_token");

  console.log(!token.value);

  if (!token.value) {
    return navigateTo({ path: "/login" });
  }
});
