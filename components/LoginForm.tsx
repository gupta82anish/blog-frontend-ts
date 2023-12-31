'use client';
import { useUserContext } from '@/contexts/user-context';
import { TLoginSchema, loginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormProps = {
  hasCookie: boolean;
}

export default function LoginForm({ hasCookie }: LoginFormProps) {

  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [ success, setSuccess ] = useState({
    loginSuccess: false,
    serverError: false
  });
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  });
  
  const onSubmit = async (data: TLoginSchema) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if(responseData.failure) {
      setSuccess({loginSuccess: true, serverError: false});
    } 
    else if(responseData.serverError) {
      setSuccess({...success, serverError: true});
    }
    else {
      localStorage.setItem('user', JSON.stringify(responseData.response));
      setUser(responseData.response);
      reset();
      router.push('/posts');
    }
    
 
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-y-2 container mx-auto p-2 lg:w-full md:w-full sm:w-full "
    >
      <input 
        {...register("email")} 
        type="email"
        placeholder="Email"
        className="text-black p-4 text-lg rounded border-2 w-full focus:border-blue-500 lg:text-xl md:text-lg"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}

      <input 
        {...register("password")} 
        type="password"
        placeholder="min. 8 character Password"
        className="text-black p-4 text-lg rounded border-2 w-full focus:border-blue-500 lg:text-xl md:text-lg"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
      { success.loginSuccess && (
        <span className="text-red-500 text-sm">Incorrect Email or password</span>
      )}
      { success.serverError && (
        <span className="text-red-500 text-sm">Server Error. Please try again in a while</span>
      )}
      <button 
        disabled={isSubmitting} 
        type="submit" 
        className="bg-blue-500 text-lg hover:bg-blue-600 disabled:bg-gray-500 py-2 rounded text-white w-full"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
  
}