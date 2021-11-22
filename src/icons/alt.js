export default function alt({ dir }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dir === 'up' ? (
        <path
          d="M7.70002 12.6L6.30002 12.6L6.30003 4.19997L3.50003 6.99997L2.10003 6.29997L7.00003 1.39997L11.9 6.29998L10.5 6.99998L7.70003 4.19997L7.70002 12.6Z"
          fill="#15CE4E"
          className="green"
        />
      ) : (
        <path
          d="M6.29998 1.40002H7.69998V9.80002L10.5 7.00002L11.9 7.70002L6.99998 12.6L2.09998 7.70002L3.49998 7.00002L6.29998 9.80002V1.40002Z"
          fill="#15CE4E"
          className="green"
        />
      )}
    </svg>
  );
}
