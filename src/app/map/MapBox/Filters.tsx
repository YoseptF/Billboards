"use client";

import { D, Field, Form, FormikErrors, FormikProps, withFormik } from "formik";

import classNames from "classnames";
import { mexicanStatesNames } from "@/utils/geoJson";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormValues {
  state: string;
  municipality: string;
  interest: string;
}
const FilterFields = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, values } = props;

  const router = useRouter();

  useEffect(() => {
    // Only update the URL if the state has a value
    if (values.state) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("state", values.state);
      const newRelativePathQuery = `${window.location.pathname }?${ queryParams.toString()}`;
      router.push(newRelativePathQuery);
    }
  }, [values.state, router]);

  return (
    <Form className={
      classNames(
        "h-screen flex flex-col p-2 justify-between shadow-md text-[#0D3B66] bg-[#0D3B66]",
        "[&>section>*]:border [&>section>*]border-gray-400 [&>section>*]rounded [&>section>*]p-2 [&>section>*]mb-2 [&>section>*]:rounded-[4px] [&>section>*]:w-56 [&>section>*]:h-10",
        "[&>section>*]:p-2",
      )
    }>
      <section className="flex flex-col gap-2">
        <Field as="select" name="state">
          <option value="">Select a state</option>
          {mexicanStatesNames.map((state) => (
            <option key={state.name_raw} value={state.name_raw}>
              {state.name}
            </option>
          ))}
        </Field>
        {touched.state && errors.state && <div>{errors.state}</div>}


        <Field type="text" name="municipality" />
        {touched.municipality && errors.municipality && <div>{errors.municipality}</div>}

        <Field type="text" name="interest" />
        {touched.interest && errors.interest && <div>{errors.interest}</div>}
      </section>

      <button
        className={
          classNames(
            "text-[#0D3B66] bg-[#4596C4] border border-[#4596C4] font-bold py-2 px-4 rounded",
            "hover:border-[#4596C4] hover:text-[#4596C4] hover:bg-[#0D3B66]"
          )
        }
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </Form>
  );
};

interface FiltersProps {
  initialState: string;
  initialMunicipality: string;
  initialInterest: string;
}

const Filters = withFormik<FiltersProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    state: props.initialState || "",
    municipality: props.initialMunicipality || "",
    interest: props.initialInterest || "",
  }),

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.state) {
      errors.state = "Required";
    }
    return errors;
  },

  handleSubmit: values => {
    console.debug(values);
  },
})(FilterFields);

export default Filters;