function Button({ classes, text, handleClick }) {
    return <button className={classes} onClick={handleClick}>{text}</button>
}

export default Button;