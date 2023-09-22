'use client';
import { useUserContext } from '@/contexts/user-context';
import { TSignUpSchema, signUpSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';

export default function SignupForm() {
  const { user, setUser } = useUserContext();
  const [ success, setSuccess ] = useState(true);
  const router = useRouter();
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  });
  
  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if(responseData.failure) {
      console.log(responseData)
      setSuccess(false);
    } else {
      localStorage.setItem('user', JSON.stringify(responseData.response)); 
      setUser(responseData.response);
      reset();
      router.push('/posts')
    }
  
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input {...register("name")}
        type="text"
        placeholder="Name"
        className="text-black p-4 text-lg rounded border-2 w-full focus:border-blue-500 lg:text-xl md:text-lg"/>
        {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
        )}
      <input {...register("email")} 
        type="email"
        placeholder="Email"
        className="text-black p-4 text-lg rounded border-2 w-full focus:border-blue-500 lg:text-xl md:text-lg"/>
      {errors.email && (
        <span className='text-red-500'>{errors.email.message}</span>
      )}
      <input {...register("password")}
       type='password'
       placeholder='min. 8 character Password'
       className="text-black p-4 text-lg rounded border-2 w-full focus:border-blue-500 lg:text-xl md:text-lg"/>
       {errors.password && (
        <span className='text-red-500'>{errors.password.message}</span>
       )}
       {!success && (
         <span className='text-red-500'>Email already exists</span> )}
      <button disabled={isSubmitting} type="submit" className='bg-blue-500 text-lg hover:bg-blue-600 disabled:bg-gray-500 py-2 rounded text-white w-full'>Submit</button>
    </form>
  );
}