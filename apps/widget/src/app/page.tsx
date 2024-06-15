"use client";

import type React from "react";
import { useState } from "react";
import Footer from "$components/Footer";
import Input from "$components/Input";
import { InputConfig, CLIENT_BASE_URL } from "$utils";
import type { State } from "$interfaces/state";
import { BiCopy, BiCodeAlt, BiCheck } from "react-icons/bi";
import styles from "$styles/modules/page.module.scss";

const initialState: State = {
  isCopied: false,
  userId: "65f77125e30a0dc98833ad21",
  radius: "25",
  headerColor: "#181926",
  bodyColor: "#1e2030",
  textColor: "#eaefff",
  accentColor: "#f5e48b",
  dueDate: false,
  priority: false,
  hideCompleted: true,
};

export default function Home() {
  const [state, setState] = useState<State>(initialState);
  const {
    userId,
    radius,
    headerColor,
    bodyColor,
    textColor,
    accentColor,
    dueDate,
    priority,
    hideCompleted,
    isCopied
  } = state;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    setState(prev => ({
      ...prev,
      [stateKey]: newValue,
    }));
  }

  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setState(prev => ({
      ...prev,
      isCopied: true,
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isCopied: false,
      }));
    }, 2000);
  }

  const encodeHexColor = (color: string) => {
    if (!color.startsWith("#")) {
      return `#${color}`;
    }

    return encodeURIComponent(color);
  }

  const HTMLWidget = ({
    userId,
    radius,
    headerColor,
    bodyColor,
    textColor,
    accentColor,
    dueDate,
    priority,
    hideCompleted,
  }: State) => {
    return `
    <iframe
      title="Vbusy Widget"
      src="${CLIENT_BASE_URL}/widget?userId=${userId}&borderRadius=${radius}&headerColor=${encodeHexColor(headerColor)}&bodyColor=${encodeHexColor(bodyColor)}&textColor=${encodeHexColor(textColor)}&accentColor=${encodeHexColor(accentColor)}&dueDates=${dueDate}&priorityLevels=${priority}&hideCompleted=${hideCompleted}"
      width="350"
      height="190"
      frameBorder="0"
    />
    `;
  };

  return (
    <div className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.heading}>Widget Builder</h1>
        <p className={styles.p}>Retrieve your unique user ID from your Vbusy account settings</p>
      </section>

      <section className={styles.settings}>
        <h2 className={styles.settingsHeading}>Settings</h2>

        <div className={styles.options}>
          <Input
            inputValues={state}
            handleInputChange={handleInputChange}
            inputConfig={InputConfig}
          />
        </div>
      </section>

      <section className={styles.preview}>
        <h2 className={styles.previewHeading}>Preview</h2>

        <iframe
          title="Vbusy Widget"
          src={`${CLIENT_BASE_URL}/widget?userId=${userId}&borderRadius=${radius}&headerColor=${encodeHexColor(headerColor)}&bodyColor=${encodeHexColor(bodyColor)}&textColor=${encodeHexColor(textColor)}&accentColor=${encodeHexColor(accentColor)}&dueDates=${dueDate}&priorityLevels=${priority}&hideCompleted=${hideCompleted}`}
          width="340"
          height="190"
          frameBorder="0"
        />
      </section>

      <section className={styles.iframeCode}>
        <div className={styles.iframeCodeHeader}>
          <h2 className={styles.iframeCodeHeading}>Raw HTML</h2>
        </div>

        <p className={styles.iframeCodeDesc}>Copy the code and paste onto your websites code</p>
        <pre className={styles.pre}>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className={styles.copyBtn} onClick={() => handleCopyToClipboard(HTMLWidget(state))}>
            {isCopied ? <BiCheck className={styles.copyBtnIcon} /> : <BiCopy className={styles.copyBtnIcon} />}
          </button>
          <code className={styles.code}>
            {HTMLWidget(state)}
          </code>
        </pre>
      </section>

      <Footer />
    </div>
  )
}
