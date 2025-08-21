'use client'

import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailsContext';
import { TripContextType, TripDetailContext } from '@/context/TripDetailContext';
import { TripInfo } from './create-new-trip/_components/ChatBox';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createUserMutation = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  const createNewUser = async () => {
    if (user) {
      const result = await createUserMutation({
        email: user.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user.imageUrl,
        name: user.fullName ?? '',
      });
      setUserDetail(result);
    }
  };

  useEffect(() => {
    createNewUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const userUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useTripDetail = (): TripContextType => {
  const context = useContext(TripDetailContext);
  if (!context) {
    throw new Error("useTripDetail must be used inside TripDetailContext.Provider");
  }
  return context;
};
