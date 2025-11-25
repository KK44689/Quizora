export const fetchCurrentUser = async () => {
  const res = await fetch('/api/user');
  const data = await res.json();

  if (res.ok) {
    return data;
  }
  else {
    console.error(data.error);
  }
}