import {
    AlertOctagon,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
} from 'lucide-react';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
};

function Toast({ handleDismiss, id, children, variant = "notice" }) {
    const Icon = ICONS_BY_VARIANT[variant];
    if (Icon == null)
        throw new Error(`Unknown variant ${variant}, expected ${ICONS_BY_VARIANT}`);

    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            <div className={styles.iconContainer}>
                <Icon size={24} />
            </div>
            <p className={styles.content}>{children}</p>
            <button className={styles.closeButton}
                onClick={() => handleDismiss(id)}
            >
                <X size={24} />
                <VisuallyHidden>Dismiss message</VisuallyHidden>
            </button>
        </div>
    );
}

export default Toast;
