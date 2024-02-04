import { useState } from 'react';
import Button from '../Button';
import Toast from "../Toast";

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("notice");
    const [isVisible, setVisible] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setVisible(true);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/assets/toast.png" />
                <h1>Toast Playground</h1>
            </header>

            {isVisible && <Toast message={message} type={variant}
                handleDismiss={() => setVisible(false)} />}

            <div className={styles.controlsWrapper}>
                <div className={styles.row}>
                    <label
                        htmlFor="message"
                        className={styles.label}
                        style={{ alignSelf: 'baseline' }}
                    >
                        Message
                    </label>
                    <div className={styles.inputWrapper}>
                        <textarea id="message" className={styles.messageInput}
                            value={message} onChange={(event) => setMessage(event.target.value)} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}>Variant</div>
                    {VARIANT_OPTIONS.map((option, index) => (
                        <div key={index}
                            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                        >
                            <label htmlFor={`variant-${option}`}>
                                <input
                                    id={`variant-${option}`}
                                    type="radio"
                                    name="variant"
                                    value={option}
                                    checked={variant === option}
                                    onChange={() => setVariant(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}

                </div>

                <div className={styles.row}>
                    <div className={styles.label} />
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                    >
                        <Button onClick={handleSubmit}>Pop Toast!</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToastPlayground;
