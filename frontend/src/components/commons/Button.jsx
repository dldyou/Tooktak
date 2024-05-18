export function Button({ children, onClick, color="green"}) {
  // Define a mapping from color props to CSS classes
  const colorClasses = {
    green: "is-success",
    red: "is-danger",
    blue: "is-info",
    purple: "is-link"
  };

  // Use the color prop to get the corresponding class, defaulting to 'is-success' if not found
  const buttonClass = `button ${colorClasses[color] || "is-success"}`;
  return (
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
  );
}
export function LoginButton({ children, onClick}) {
  // Define a mapping from color props to CSS classes
  return (
      <button className="button is-success is-midium is-rounded is-size-5 is-fullwidth" onClick={onClick}>
        {children}
      </button>
  );
}