import { useContext } from 'react';
import Toast from '../Toast';
import { ToastContext } from '../ToastProvider';

import styles from './ToastShelf.module.css';

function ToastShelf() {

    const { notifications } = useContext(ToastContext);

    return (
        <ol className={styles.wrapper}>
            {notifications.map(({ id, message, variant }) => (
                <li key={id} className={styles.toastWrapper}>
                    <Toast id={id} variant={variant}>
                        {message}
                    </Toast>
                </li>
            ))}
        </ol>
    );
}

export default ToastShelf;
