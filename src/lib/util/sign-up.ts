export const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
};

export const submitSignUp = async (email: string) => {
  if (email === '' || !isEmailValid(email)) return;
  const res = await fetch('/api/submitSignUp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  const subscription = await res.json();
  return subscription;
};
