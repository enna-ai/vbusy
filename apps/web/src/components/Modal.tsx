"use client";

import axios from "axios";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL, ENDPOINTS } from "../utils/consts";
import styles from "../styles/modules/onboarding.module.scss";
import "react-toastify/ReactToastify.css";

interface FormValues {
  bio: string;
  pronouns: string;
  profilePhoto: string;
};

export const Modal: React.FC<{ onCloseModal: () => void}> = ({ onCloseModal }) => {
  const initialValues: FormValues = {
    bio: "",
    pronouns: "",
    profilePhoto: "",
  };

  const handleOnboarding = async (values: FormValues) => {
    try {
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("userInfo");
      const userInfo = data ? JSON.parse(data) : {};

      await axios.post(`${API_BASE_URL}${ENDPOINTS.Onboarding}/${userInfo._id}`, {
        bio: values.bio,
        pronouns: values.pronouns,
        profilePhoto: values.profilePhoto,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      onCloseModal();

      values.bio = "";
      values.pronouns = "";
      values.profilePhoto = "";
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Error during onboarding:", error.response);
      }
    }
  };

  return (
    <>
      <div className={styles.modalPopupContainer}>
        <div className={styles.modalPopupWrapper}>
          <div className={styles.modalPopup}>
            <h2 className={styles.heading}>Setup your profile</h2>

            <Formik
              initialValues={initialValues}
              onSubmit={handleOnboarding}
              validationSchema={Yup.object({
                bio: Yup.string().max(150),
                pronouns: Yup.string().max(30),
              })}
            >
              <Form className={styles.formContainer}>
                <div className={styles.formInputFields}>
                  <label>Pronouns</label>
                  <Field type="text" id="pronouns" name="pronouns" placeholder="Add your pronouns" maxLength={30} />
                </div>
                <div className={styles.formInputFields}>
                  <label>Bio</label>
                  <Field as="textarea" id="bio" name="bio" placeholder="Tell us about yourself..." maxLength={150} />
                </div>
                <div className={styles.btnContainer}>
                  <button type="submit">Finish</button>
                </div>
                <ToastContainer />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
};
