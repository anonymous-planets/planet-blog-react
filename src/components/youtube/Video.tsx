
interface VideoProps {
  playerId : string
}
export default function Video({ playerId } : VideoProps ) {
  return (
    <div id={playerId}></div>
  );
};