import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore - Importing from root components
import DynamicText from '../../../components/kokonutui/dynamic-text';

export default function WelcomeSplash() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if we've already shown the splash screen in this session
        const hasShown = sessionStorage.getItem('welcome_shown');
        if (hasShown) {
            setShouldRender(false);
            return;
        }

        // Trigger entrance animation
        setIsVisible(true);
    }, []);

    const handleFinish = () => {
        setTimeout(() => {
            setIsVisible(false);
            // Wait for exit animation to finish before unmounting
            setTimeout(() => {
                setShouldRender(false);
                sessionStorage.setItem('welcome_shown', 'true');
            }, 1000); // 1s duration matches the exit transition
        }, 500); // Small delay after text finishes
    };

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Bezier for smooth "curtain" feel
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-green-600"
                >
                    <DynamicText className="text-white" onFinish={handleFinish} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
