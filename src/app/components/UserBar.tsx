'use client';

import { useEffect, useState } from 'react';

type ClientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string; // usually email/alias
  userRoles: string[];
} | null;

export default function UserBar() {
  const [user, setUser] = useState<ClientPrincipal>(null);

  useEffect(() => {
    fetch('/.auth/me')
      .then(r => r.json())
      .then(p => setUser(p?.clientPrincipal ?? null))
      .catch(() => setUser(null));
  }, []);

  const signedIn = !!user && user.userRoles?.includes('authenticated');

  return (
    <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #222'}}>
      <a href="/">Home</a>
      <a href="/dashboard">Dashboard</a>
      <span style={{marginLeft:'auto'}} />
      {signedIn ? (
        <>
          <span>Signed in as {user?.userDetails}</span>
          <a href="/.auth/logout">Sign out</a>
        </>
      ) : (
        <a href="/.auth/login/aad?post_login_redirect_uri=/dashboard">Sign in</a>
      )}
    </nav>
  );
}
