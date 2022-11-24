import Tippy from "@tippyjs/react";

export default function Tooltip({ content, children, ...rest }) {
    return (
        <Tippy content={content} animateFill={true} theme="dbio" animation="shift-away" arrow={false} {...rest}>
            {children}
        </Tippy>
    );
}
