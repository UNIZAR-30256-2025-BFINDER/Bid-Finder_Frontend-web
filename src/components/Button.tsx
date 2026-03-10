import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    fullWidth = false,
    children,
    className = '',
    ...props
}) => {
    const baseClass = `btn btn-${variant}`;
    const widthClass = fullWidth ? 'w-full' : '';
    const combinedClasses = `${baseClass} ${widthClass} ${className}`.trim();

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};
