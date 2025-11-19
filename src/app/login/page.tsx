'use client';

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      router.push('/dashboard');
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  }

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch("/api/logout", {
      method: 'POST'
    });

    router.push('/');
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Login</button>
      </form>
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  );
}