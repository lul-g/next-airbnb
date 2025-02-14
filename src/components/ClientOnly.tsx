'use client';

import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

//wrapper-component to check if child component has mounted
//:makes use of useEffect to update state and 'check' if it has mounted or not
//:great way to solve page-loading problems (loading state till component has mounted) unless ofc next has a way for this
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
