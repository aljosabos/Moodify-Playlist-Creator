interface IMoodButtonProps {
  onClick: () => void;
  name: string;
  Icon: string;
}

export default function MoodButton({ name, onClick, Icon }: IMoodButtonProps) {
  return (
    <button onClick={onClick}>
      <Icon />
      <span>{name}</span>
    </button>
  );
}
