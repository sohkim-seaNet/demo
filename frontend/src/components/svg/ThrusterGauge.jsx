import React from 'react';

const ThrusterGauge = React.forwardRef(({ needleRef, minValue = 0, maxValue = 800 }, ref) => {
    // // Props로 받은 범위를 동적 계산 (5개 구간)
    const labels = [
        minValue,
        minValue + (maxValue - minValue) * 0.25,
        minValue + (maxValue - minValue) * 0.5,
        minValue + (maxValue - minValue) * 0.75,
        maxValue
    ];

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598.86 280.07" ref={ref}>
            <g id="THRUSTER">
                <g>
                    <text className="cls-8" transform="translate(0 261.25)">
                        <tspan x={0} y={0}>{Math.round(labels[0])}</tspan>
                    </text>
                    <text className="cls-8" transform="translate(96.06 86.05)">
                        <tspan x={0} y={0}>{Math.round(labels[1])}</tspan>
                    </text>
                    <text className="cls-8" transform="translate(274.63 26.55)">
                        <tspan x={0} y={0}>{Math.round(labels[2])}</tspan>
                    </text>
                    <text className="cls-8" transform="translate(453.83 86.05)">
                        <tspan x={0} y={0}>{Math.round(labels[3])}</tspan>
                    </text>
                    <text className="cls-8" transform="translate(534.34 261.25)">
                        <tspan x={0} y={0}>{Math.round(labels[4])}</tspan>
                    </text>
                </g>
                <g>
                    <path className="cls-1" d="M96.73 162.2L237.99 228.34" />
                    <circle className="cls-5" cx={299.14} cy={261.25} r={7.8} />
                    <path
                        className="cls-2"
                        d="M299.14 191.82c38.34 0 69.43 31.08 69.43 69.43h157.88c0-125.54-101.77-227.3-227.3-227.3s-227.3 101.77-227.3 227.3h157.88c0-38.34 31.08-69.43 69.43-69.43z"
                    />
                    <path className="cls-3" d="M71.83 259.25L229.71 259.25" />
                    <path className="cls-3" d="M368.56 259.25L526.44 259.25" />
                    <g id="needle" ref={needleRef}>
                        <g>
                            <path
                                className="cls-7"
                                d="M299.14 263.07c-3.08 0-5.95-1.33-8.08-3.74-2.36-2.67-3.46-6.31-3-9.97l3.88-31.25 5.14-163.42c.04-1.24.92-2.21 2.01-2.21s1.97.97 2.01 2.21l5.14 163.43 3.98 31.21c.47 3.67-.62 7.31-2.99 10-2.13 2.42-5 3.75-8.09 3.75z"
                            />
                            <path
                                className="cls-7"
                                d="M299.09 54.65s0 .06.01.1l5.14 163.33v.19l.03.19 3.96 31.11c.39 3.1-.52 6.17-2.5 8.42-1.74 1.98-4.09 3.07-6.59 3.07s-4.84-1.09-6.58-3.06c-1.98-2.25-2.9-5.31-2.52-8.4l3.87-31.16.02-.18v-.18l5.14-163.33c0-.04 0-.07.01-.1m0-4.17c-2.16 0-3.94 1.83-4.01 4.15l-5.14 163.33-3.87 31.16c-1.05 8.45 5.1 15.95 13.07 15.95s14.14-7.54 13.06-16l-3.96-31.11-5.14-163.33c-.07-2.31-1.85-4.15-4.01-4.15z"
                            />
                        </g>
                        <circle className="cls-4" cx={299.14} cy={261.73} r={7.32} />
                    </g>
                    <path className="cls-6" d="M12.23 250.07H586.62V280.07H12.23z" />
                </g>
            </g>
        </svg>
    );
});

ThrusterGauge.displayName = 'ThrusterGauge';

export default ThrusterGauge;