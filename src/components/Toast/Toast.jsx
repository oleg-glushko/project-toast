import {
    AlertOctagon,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
} from 'lucide-react';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';
import { useContext } from 'react';
import { ToastContext } from '../ToastProvider';

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
};

function Toast({ id, children, variant = "notice" }) {
    const Icon = ICONS_BY_VARIANT[variant];
    if (Icon == null)
        throw new Error(`Unknown variant ${variant}, expected ${ICONS_BY_VARIANT}`);


    const { dismissNotification } = useContext(ToastContext);

    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            <div className={styles.iconContainer}>
                <Icon size={24} />
            </div>
            <VisuallyHidden>{`${variant} - `}</VisuallyHidden>
            <p className={styles.content}>{children}</p>
            <button className={styles.closeButton}
                aria-label="Dismiss message" aria-live="off"
                onClick={() => dismissNotification(id)}
            >
                <X size={24} />
            </button>
        </div>
    );
}

export default Toast;
