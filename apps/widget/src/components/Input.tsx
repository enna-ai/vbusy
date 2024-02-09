/* eslint-disable no-unused-vars */
import React from "react";
import { InputConfig } from "../utils/input";
import styles from "../styles/modules/page.module.scss";

interface InputProps {
    inputValues: any;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, stateKey: string) => void;
    inputConfig: typeof InputConfig;
}

const Input: React.FC<InputProps> = ({ inputValues, handleInputChange, inputConfig }) => {
    return (
        <>
            {inputConfig.map((config, index) => (
                <div key={index}>
                    <label className={styles.labels}>
                        {config.type === "checkbox" ? (
                            <div className={styles.checkbox}>
                                <input
                                    className={styles.input}
                                    type={config.type}
                                    checked={inputValues[config.state]}
                                    onChange={(e) => handleInputChange(e, config.state)}
                                />
                                <div className={styles.inputCheckboxLabel}>
                                    {config.label}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.inputText}>
                                <h4 className={styles.inputTextLabel}>
                                    {config.label}
                                </h4>
                                <input
                                    className={styles.input}
                                    type={config.type}
                                    value={inputValues[config.state]}
                                    onChange={(e) => handleInputChange(e, config.state)}
                                />
                            </div>
                        )}
                    </label>
                </div>
            ))}
        </>
    );
};

export default Input;
