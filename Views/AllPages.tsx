import React from 'react';
import AuthPages from './Auth/Index';
import Pages from '.';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export default function AppScreens() {
  // useSelector must be called inside the component
  const passHome = useSelector((state: RootState) => state.passHome.value);

  return (
    passHome ? <Pages /> : <AuthPages />
  );
}