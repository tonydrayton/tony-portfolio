interface CircleProps {
    color: string;
    diameter?: number;
}

const Circle: React.FC<CircleProps> = ({ color, diameter = 100 }) => {
    const circleStyle = {
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        backgroundColor: color,
    };

    return <div style={circleStyle}></div>;
};

export default Circle;
