export const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
};

export const submitSignUp = async (email: string) => {
  if (email === "" || !isEmailValid(email)) return
  const id = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_LIST_ID;
  const endpoint = `/api/admin/SubscriptionCenter/ToggleGroupsAndList?listId=${id}&email=${email}`
  const res = await fetch(endpoint)
  const subscription = await res.json()
  return subscription
};
