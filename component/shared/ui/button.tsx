import React from 'react';
import { ButtonProps } from '@/types/shared-ui/button';

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    onClick,
    className,
    disabled,
    isLoading,
    icon,
    iconPosition = 'left',
    size = 'md',
    variant = 'primary',
    block,
    rounded,
    shadow,
    outline,
    href,
    target,
    rel,
    download,
    as: Component = 'button',
    to,
    replace,
    innerRef,
    exact,
    strict,
    isActive,
    activeClassName,
    activeStyle,
    style,
    role,
}) => {
	const disabledClasses = 'opacity-30 cursor-not-allowed';
	const classes = `btn transition-all-100 ${size} ${icon && 'flex items-center justify-center gap-4'} ${disabled ? disabledClasses : '' } ${variant} ${className || ''} ${block ? 'block' : ''} ${rounded ? 'rounded' : ''} ${shadow ? 'shadow' : ''} ${outline ? 'outline' : ''}`;
    const Tag = href ? 'a' : Component;

    return (
        <Tag
            type={!href ? type : undefined}
            onClick={disabled ? undefined : onClick} // Prevent click event when disabled
            className={classes}
            disabled={disabled}
            href={href}
            target={target}
            rel={rel}
            download={download}
            ref={innerRef}
            role={role}
            style={style}
        >
            {isLoading ? (
                <div className='flex items-center justify-center'>
                 
                </div>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="icon">{icon}</span>}
                    {children}
                    {icon && iconPosition === 'right' && <span className="icon">{icon}</span>}
                </>
            )}
        </Tag>
    );
};

export default Button;