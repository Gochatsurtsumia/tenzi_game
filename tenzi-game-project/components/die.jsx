export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };
  return (
    <button onClick={props.hold} style={styles}>
      {props.value}
    </button>
  );
}
