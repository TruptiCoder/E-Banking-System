export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-wrap">
      <div className="loader-ring-outer" />
      <p className="loader-msg">{message}</p>
    </div>
  );
}
