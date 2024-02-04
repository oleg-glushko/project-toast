import { useState } from 'react';
import Button from '../Button';
import ToastShelf from "../ToastShelf";

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("notice");
    const [notifications, setNotifications] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const newNotification = {
            id: crypto.randomUUID(),
            message,
            variant,
        }
        setNotifications([...notifications, newNotification]);
        setMessage("");
        setVariant("notice");
    }

    function handleDismiss(id) {
        const itemToDelete = notifications.findIndex(item => item.id == id);
        if (itemToDelete === -1)
            return;

        setNotifications([
            ...notifications.slice(0, itemToDelete),
            ...notifications.slice(itemToDelete + 1)]);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/assets/toast.png" />
                <h1>Toast Playground</h1>
            </header>

            {<ToastShelf notifications={notifications} handleDismiss={handleDismiss} />}

            <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
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
                            value={message} required={true}
                            onChange={(event) => setMessage(event.target.value)} />
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
                        <Button>Pop Toast!</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToastPlayground;
