interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const ChatContainer: React.FC<ContainerProps> = ({
	children,
	className = '',
}) => {
	return (
		<div
			className={`pt-8 rounded-t-3xl bg-white ${className}`}
			style={{ boxShadow: '0 0px 8px rgba(0, 0, 0, .09' }}
		>
			{children}
		</div>
	);
};

export default ChatContainer;
