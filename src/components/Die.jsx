export default function Die(props) {
  return (
    <button onClick={props.onClick} id={props.id} className={props.isHeld ? "die held" : "die"}>{props.value}</button>
  );
}