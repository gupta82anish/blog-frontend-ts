'use client';
import { TLoginSchema, loginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function LoginForm() {
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
    console.log(responseData);
    /* if (!response.ok) {
      alert("submitting form failed");
      return;
    }

    if(responseData.errors) {
      const errors = responseData.errors;
      setError("email", {
        type: "server",
        message: responseData.error
      })
    } */
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input {...register("email")} 
      type="email"
      placeholder="Email"
      className="text-black px-4 py-2 rounded"/>
      {errors.email && (
        <span className='text-red-500'>${errors.email.message}</span>
      )}
      <input {...register("password")}
       type='password'
       placeholder='min. 8 character Password'
       className="text-black px-4 py-2 rounded"/>
       {errors.password && (
        <span className='text-red-500'>${errors.password.message}</span>
       )}
      <button disabled={isSubmitting} type="submit" className='bg-blue-500 disabled:bg-gray-500 py-2 rounded'>Submit</button>
    </form>
  );
}