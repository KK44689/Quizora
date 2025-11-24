export const fetchQuizes = async () => {
  const res = await fetch('/api/quiz');
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    console.error(data.error);
  }
}