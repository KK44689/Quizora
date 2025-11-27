'use client';

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { LoginInfo } from "../lib/definition";
import * as Yup from 'yup';
import useLoginSubmit from "../hooks/useSubmit";
import { poppins } from "../ui/font";
import Image from "next/image";

export default function Page() {
  const { isLoading, response, submit } = useLoginSubmit();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const data: LoginInfo = { email: values.email, password: values.password };
      submit(data);
    },
    validationSchema:
      Yup.object({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required.")
      })
  });

  return (
    <div className={`${poppins.className} flex md:flex-row h-screen`}>
      <div className="flex md:flex-col gap-8 items-center justify-center relative overflow-hidden h-screen md:w-1/2">
        <Image
          src='/quizora-white.png'
          alt={"Quizora Logo"}
          width={435}
          height={89}
          className="relative z-10 w-32 sm:w-48 md:w-64 lg:w-80 h-auto"
        />
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/login-bg.png')] blur-md scale-110"></div>
        <div className="absolute inset-0 bg-[var(--theme-blue)]/50"></div>
        <p className={`text-base text-white text-center md:text-3xl relative z-10 p-6`}>
          Used this info to try it yourself!<br /><br />
          <b>Email:</b> lunaDuck@gmail.com<br />
          <b>Password:</b> lunaDuck123456<br />
        </p>
      </div>

      <div className="flex flex-col gap-8 items-center justify-center md:w-1/2 md:h-screen relative">
        <Image
          src="/quizora-blue.png"
          alt="quizola logo"
          width={435}
          height={89}
          className="w-48 md:w-36 h-auto absolute top-18 left-29"
        />

        <div className="flex flex-col w-106">
          <h1 className={`text-[var(--theme-blue)] font-bold text-3xl`}>Login to your Account</h1>
          <h2 className={`text-[var(--theme-blue)] text-lg`}>with your registered Email Address</h2><br /><br />
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <span className="flex flex-col gap-3">
              <label className={`text-[var(--theme-grey)] text-base font-semibold`}>Email address*</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter email address"
                className="h-16 w-106 pl-8 text-sm text-[var(--theme-blue)] font-semibold shadow-xl rounded-lg"
              />
              {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            </span>

            <span className="flex flex-col gap-3">
              <label className={`text-[var(--theme-grey)] text-base font-semibold`}>Enter password*</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                className="h-16 pl-8 text-sm text-[var(--theme-blue)] font-semibold shadow-xl rounded-lg"
              />
              {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
            </span>
            {response.type === 'error' ? <div>{response.message}</div> : null}<br /><br />

            <button
              type="submit"
              className="bg-[var(--theme-blue)] text-white text-lg h-16 rounded-lg p-4"
            >Login</button>
          </form>
        </div>

      </div>

    </div >
  );
}