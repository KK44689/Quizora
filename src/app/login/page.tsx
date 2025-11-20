'use client';

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { LoginInfo } from "../lib/definition";
import * as Yup from 'yup';
import useLoginSubmit from "../hooks/useSubmit";

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
        <br />

        <label>Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
        <br />
        {response.type === 'error' ? <div>{response.message}</div> : null}
        <button type="submit">Login</button>
      </form>
    </div >
  );
}