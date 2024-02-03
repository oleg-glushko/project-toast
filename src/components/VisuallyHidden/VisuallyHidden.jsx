import { useState, useEffect } from 'react';

import styles from './VisuallyHidden.module.css';

const VisuallyHidden = ({
    children,
    className = '',
    ...delegated
}) => {
    const [forceShow, setForceShow] = useState(false);

    useEffect(() => {
        if (import.meta.env.NODE_ENV !== 'production') {
            const handleKeyDown = (ev) => {
                if (ev.key === 'Alt') {
                    setForceShow(true);
                }
            };

            const handleKeyUp = () => {
                setForceShow(false);
            };

            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
            };
        }
    }, []);

    if (forceShow) {
        return <span className={styles.showWrapper}>{children}</span>;
    }

    return (
        <span className={`${className} ${styles.wrapper}`} {...delegated}>
            {children}
        </span>
    );
};

export default VisuallyHidden;
