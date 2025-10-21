// src/components/svg/TelegraphGauge.jsx
import React from 'react';

const TelegraphGauge = ({ needleRef }) => {
    return (
        <svg
            data-name="레이어 2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 297 717"
        >
            <defs>
                {/* 필터 정의 */}
                <filter id="outer-glow-1" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur" stdDeviation={5.67} />
                    <feFlood floodColor="#4096b6" floodOpacity={0.75} />
                    <feComposite in2="blur" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-2" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-2" stdDeviation={5.67} />
                    <feFlood floodColor="#bd4923" floodOpacity={0.75} />
                    <feComposite in2="blur-2" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-3" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-3" stdDeviation={2.83} />
                    <feFlood floodColor="#fff" floodOpacity={0.75} />
                    <feComposite in2="blur-3" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-4" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-4" stdDeviation={2.83} />
                    <feFlood floodColor="#fff" floodOpacity={0.75} />
                    <feComposite in2="blur-4" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-5" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-5" stdDeviation={2.83} />
                    <feFlood floodColor="#fff" floodOpacity={0.75} />
                    <feComposite in2="blur-5" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-6" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-6" stdDeviation={2.83} />
                    <feFlood floodColor="#fff" floodOpacity={0.75} />
                    <feComposite in2="blur-6" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <filter id="outer-glow-7" filterUnits="userSpaceOnUse">
                    <feOffset dx={0} dy={0} />
                    <feGaussianBlur result="blur-7" stdDeviation={2.83} />
                    <feFlood floodColor="#fff" floodOpacity={0.75} />
                    <feComposite in2="blur-7" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>

                {/* 그라디언트 정의 */}
                <radialGradient
                    id="gradient-65"
                    cx={66.59}
                    cy={358.12}
                    fx={66.59}
                    fy={358.12}
                    r={44.18}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#fff" />
                    <stop offset={0.1} stopColor="#f8f8f8" />
                    <stop offset={0.23} stopColor="#e5e5e5" />
                    <stop offset={0.4} stopColor="#c5c5c5" />
                    <stop offset={0.58} stopColor="#9a9a9a" />
                    <stop offset={0.78} stopColor="#626262" />
                    <stop offset={0.98} stopColor="#1f1f1f" />
                    <stop offset={1} stopColor="#1a1a1a" />
                </radialGradient>

                <linearGradient
                    id="gradient-68"
                    x1={14.85}
                    y1={358.13}
                    x2={118.32}
                    y2={358.13}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#3e3a39" />
                    <stop offset={1} stopColor="#fff" />
                </linearGradient>

                <linearGradient
                    id="gradient-37"
                    x1={99.14}
                    y1={341.44}
                    x2={99.14}
                    y2={374.81}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#fff11d" />
                    <stop offset={0.02} stopColor="#feed1a" />
                    <stop offset={0.2} stopColor="#fcdb0b" />
                    <stop offset={0.39} stopColor="#fbcf02" />
                    <stop offset={0.59} stopColor="#fbcc00" />
                    <stop offset={0.95} stopColor="#f0932e" />
                </linearGradient>

                <linearGradient
                    id="gradient-34"
                    x1={84.95}
                    y1={341.44}
                    x2={84.95}
                    y2={374.81}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#fff11d" />
                    <stop offset={0.01} stopColor="#feed1a" />
                    <stop offset={0.1} stopColor="#fcdb0b" />
                    <stop offset={0.19} stopColor="#fbcf02" />
                    <stop offset={0.28} stopColor="#fbcc00" />
                    <stop offset={0.74} stopColor="#f0932e" />
                </linearGradient>
            </defs>

            <g data-name="레이어 1">
                {/* 상단 파란색 박스 */}
                <path
                    fill="#409ec0"
                    stroke="#4096b6"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    filter="url(#outer-glow-1)"
                    d="m260.54,38.4H110.97c-4.68,0-8.5,3.94-8.5,8.76v277.58c0,4.82,3.83,8.76,8.5,8.76h149.57c4.68,0,8.5-3.94,8.5-8.76V47.16c0-4.82-3.83-8.76-8.5-8.76Zm-103.37,11.86c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77Zm0,57.27c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77Zm0,57.27c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77Zm91.74,157.32c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Zm.21-57.27c0,1.94-1.92,3.53-4.26,3.53h-83.43c-2.34,0-4.26-1.59-4.26-3.53v-42.77c0-1.94,1.92-3.53,4.26-3.53h83.43c2.34,0,4.26,1.59,4.26,3.53v42.77Z"
                />

                {/* 하단 빨간색 박스 */}
                <path
                    fill="#c64b23"
                    stroke="#d04b21"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    filter="url(#outer-glow-2)"
                    d="m260.54,382.74H110.97c-4.68,0-8.5,3.94-8.5,8.76v277.58c0,4.82,3.83,8.76,8.5,8.76h149.57c4.68,0,8.5-3.94,8.5-8.76v-277.58c0-4.82-3.83-8.76-8.5-8.76Zm-11.42,283.69c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Zm0-57.27c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Zm0-57.27c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Zm0-57.27c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Zm0-57.27c0,1.94-1.91,3.53-4.25,3.53h-83.24c-2.34,0-4.25-1.59-4.25-3.53v-42.77c0-1.94,1.91-3.53,4.25-3.53h83.24c2.34,0,4.25,1.59,4.25,3.53v42.77Z"
                />

                {/* 텍스트들 */}
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(170.74 136.4) scale(1.2 1)"
                >
                    FULL
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(169.66 193.68) scale(1.2 1)"
                >
                    HALF
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(167.45 250.95) scale(1.2 1)"
                >
                    SLOW
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={19.92}
                    transform="translate(172.52 296.6) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>DEAD</tspan>
                    <tspan x={-0.91} y={23.91}>SLOW</tspan>
                </text>

                {/* AHEAD 세로 텍스트 */}
                <text
                    fill="#fff"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={29.88}
                    transform="translate(120.04 154.67) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>A</tspan>
                    <tspan x={0} y={35.86}>H</tspan>
                    <tspan x={0} y={71.72}>E</tspan>
                    <tspan x={0} y={107.57}>A</tspan>
                    <tspan x={0} y={143.43}>D</tspan>
                </text>

                {/* ASTERN 영역 텍스트들 */}
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={19.92}
                    transform="translate(172.52 411.37) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>DEAD</tspan>
                    <tspan x={-0.91} y={23.91}>SLOW</tspan>
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(167.45 479.43) scale(1.2 1)"
                >
                    SLOW
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(169.66 538.36) scale(1.2 1)"
                >
                    HALF
                </text>
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={22.41}
                    transform="translate(171.13 595.63) scale(1.2 1)"
                >
                    FULL
                </text>

                {/* ASTERN 세로 텍스트 */}
                <text
                    fill="#fff"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={29.88}
                    transform="translate(120.04 420.05) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>A</tspan>
                    <tspan x={0} y={35.86}>S</tspan>
                    <tspan x={0} y={71.72}>T</tspan>
                    <tspan x={0} y={107.57}>E</tspan>
                    <tspan x={0} y={143.43}>R</tspan>
                    <tspan x={0} y={179.29}>N</tspan>
                </text>

                {/* STOP 영역 */}
                <g>
                    <text
                        fill="#585959"
                        fontFamily="DINPro-Bold, 'DIN Pro'"
                        fontWeight={700}
                        fontSize={29.05}
                        transform="translate(143.21 368.4) scale(1.2 1)"
                    >
                        STOP
                    </text>
                    <path
                        fill="#71c6d4"
                        stroke="#71c6d4"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        d="m260.54,338.46H110.97c-4.7,0-8.5,3.16-8.5,7.06v25.22c0,3.9,3.81,7.06,8.5,7.06h149.57c4.7,0,8.5-3.16,8.5-7.06v-25.22c0-3.9-3.81-7.06-8.5-7.06Zm-11.42,28.8c0,2.6-2.54,4.71-5.67,4.71h-113.74c-3.13,0-5.67-2.11-5.67-4.71v-18.26c0-2.6,2.54-4.71,5.67-4.71h113.74c3.13,0,5.67,2.11,5.67,4.71v18.26Z"
                    />
                </g>

                {/* 외부 프레임 */}
                <path
                    fill="#b7b6b6"
                    strokeWidth={0}
                    filter="url(#outer-glow-3)"
                    d="m278.75,8.72H38.76c-4.88,0-8.86,4.74-8.86,10.54v677.72c0,5.8,3.99,10.54,8.86,10.54h240c4.88,0,8.86-4.74,8.86-10.54V19.26c0-5.8-3.99-10.54-8.86-10.54Zm.84,665.32c0,5.4-3.74,9.83-8.31,9.83H46.23c-4.57,0-8.31-4.42-8.31-9.83V42.2c0-5.4,3.74-9.83,8.31-9.83h225.06c4.57,0,8.31,4.42,8.31,9.83v631.84Z"
                />

                {/* CRASH ASTERN 텍스트 */}
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={19.92}
                    transform="translate(168.36 639.97) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>CRASH</tspan>
                    <tspan x={-5.1} y={23.91}>ASTERN</tspan>
                </text>

                {/* NAV. FULL 텍스트 */}
                <text
                    fill="#585959"
                    fontFamily="DINPro-Bold, 'DIN Pro'"
                    fontWeight={700}
                    fontSize={19.92}
                    transform="translate(177.9 66.72) scale(1.2 1)"
                >
                    <tspan x={0} y={0}>NAV.</tspan>
                    <tspan x={-3.12} y={23.91}>FULL</tspan>
                </text>

                {/* 왼쪽 인디케이터들 */}
                <rect fill="#e0e0df" x={46.3} y={456.36} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={513.7} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={571.04} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={284.34} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={227} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={169.66} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={112.32} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={399.02} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={341.68} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={54.98} width={33.33} height={33.33} rx={5.67} ry={5.67} />
                <rect fill="#e0e0df" x={46.3} y={628.38} width={33.33} height={33.33} rx={5.67} ry={5.67} />

                {/* 바늘 그룹 */}
                <g id="needle" ref={needleRef}>
                    <g>
                        <path
                            fill="url(#gradient-65)"
                            stroke="#fff"
                            strokeMiterlimit={10}
                            filter="url(#outer-glow-4)"
                            d="m13.38,382.66h66.97s43.69-24.54,43.69-24.54l-43.69-24.54h0s-67.68,0-67.68,0c-1.96,0-3.55,1.59-3.55,3.55v41.27c0,2.35,1.9,4.25,4.25,4.25Zm31.97-36.37c0-3.12,2.55-5.67,5.67-5.67h23.66c3.12,0,5.67,2.55,5.67,5.67v23.66c0,3.12-2.55,5.67-5.67,5.67h-23.66c-3.12,0-5.67-2.55-5.67-5.67v-23.66Z"
                        />
                        <path
                            fill="url(#gradient-68)"
                            strokeWidth={0}
                            filter="url(#outer-glow-5)"
                            d="m78.51,336.2h0s-60.49,0-60.49,0c-1.75,0-3.17,1.42-3.17,3.17v36.89c0,2.1,1.7,3.8,3.8,3.8h59.86l39.81-21.93-39.81-21.93Zm-3.83,39.42h-23.66c-3.12,0-5.67-2.55-5.67-5.67v-23.66c0-3.12,2.55-5.67,5.67-5.67h23.66c3.12,0,5.67,2.55,5.67,5.67v23.66c0,3.12-2.55,5.67-5.67,5.67Z"
                        />
                        <polyline
                            fill="url(#gradient-37)"
                            strokeWidth={0}
                            filter="url(#outer-glow-6)"
                            points="83.99 341.44 83.99 374.81 114.28 358.12 83.99 341.44 83.99 341.44"
                        />
                        <polyline
                            fill="#f7d97d"
                            strokeWidth={0}
                            filter="url(#outer-glow-7)"
                            points="83.99 341.44 83.99 358.12 114.28 358.12 83.99 341.44 83.99 341.44"
                        />
                        <polygon
                            fill="url(#gradient-34)"
                            strokeWidth={0}
                            points="85.91 358.12 83.99 341.44 83.99 374.81 85.91 358.12"
                        />
                    </g>
                    <line
                        fill="none"
                        strokeWidth={0}
                        x1={62.97}
                        y1={358.12}
                        x2={185.75}
                        y2={358.12}
                    />
                    <image
                        width={140}
                        height={35}
                        transform="matrix(1.06 0 0 1.06 44.5 339.62)"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAjCAMAAABxVBI3AAABgFBMVEVMaXEAm0MAmUQAmUQAmUQAmUQAmUQAmUQAmUQAmUQAmUQAmUQAmUQAnEIAnUEAnkEAmUQAmUQAm0MAmkMAmkMAmUSOwx+NwiCMwiCKwiGIwSKJwSGFwCODvyOEwCN/viV4vCcAnkGHwSKAvyR8viYAoEBzuyl6vScAm0NpuC2BvyR+viVyuyp2vChmty57vSY+sTRctS8AoT9quCxlty5xuipuuSttuSt1uylHsjM6sDQAn0AYqTpDsTMgqzgMpT1YtTBWtDBvuitatTA4sDUaqTpRtDEhrDgQpjwlrDhJsjJNszJPszEPpjxsuSwvrjYrrTcRpztouC0prTcAnUIBoT9gti8fqzkFoz53vCgAnUFUtDELpD1eti8AmkMxrjY8sDQTpzsAn0EAoD8JpD0cqjkHoz4dqjkEoj4Opjw2rzUZqTpLszIAnEIUqDtjti8trjZAsTQeqzkAmkQKpD0Spzsbqjk0rzUVqDsnrTcCoj8Ioz0jrDhFsjMNpTwDoj5TvKpPAAAAFXRSTlMAgKBQ4DBgQIDA8CAQwMDA0JDAwIC1tfsEAAAACXBIWXMAAAsSAAALEgHS3X78AAADI0lEQVRYhc3YV3faQBAGUOLe0oMNqIOQEAjRe+/NGIyp7gYX3Evc0/56JAE2dpLXOfnetHrYe3YHdlYKhZi5yX9EAZ7xaeVwvg4/jMzBWiaepz5td2rd7i+7njIMhsZmIS2zM/1pNyn7+k7qIBxuHASXdzvV/vAHSMxIf9LVWvb24W475Mv7Qv5SJhjpnPZejAJixnpTBtZT5e2T2IZTEIRz25ovmbtvUvKbKUBMr2j12XCyYKt4XIzXy/DxJWfUt7W3LmumoTH65dxlTHAzpIU2mUw02+KXzheTV7IGGtMufg8lHDxJ6zAcR3HMSFhacWHNf7BbBcec7jasCQdj0WGoRoMgiEaLYgTJV9JHx7VNaIw9eLTGiRZUg6hVUtSIFidYl/OkvNwGxlQjubzTxYoWtWpBjkqFaHCCdNsuD7oGWIw+mIx6WgQuWebliBy1FjN5ucWLLAWKMTTDPidPY9oni8RRIaiOddu2jzugmOphOe0wEygyZBE1ag1GM05fuPkZEkPt3EU9pPHFwvSWhjBziyuRt5AYfdBvi1swjXrYMi9VjY5cWisV34FiUta6i8Y0LxZG2ietkfTEtpbf/zeYKDQmuL3h+mOb5nvbFCtlQbepfXaUcLNiAb+qGamAHdAFvFq8SDtaf/lp4yZGyGf2P0FiDN8yeScjFs2rPz2tkY1vWG/tsMeB/difcJPS0bSw8GSRFsbsSJduYI8DJXW4ciLwFiOKDA5K2aIj4/VQYx/4oFTWUv6ow0sbh1oI0cLylcXSTgC6n1mNZEI2j5nW4VqptxK7K7G5Yhku5t/rGsDbTv3Nim9jiWFNRgxHUbHv1NEkz0Wt4QgF3wNv2s/KPxJc3MzSJoIgTBbS6xZi1kwxANyQy/cmg30nZ03XOTfvNZvNXpenYiskG4eSRfkRENO7URr0xautUNp2XuE4TqgnCtZy6lq2KCcAMeP96y21f9a48IfyhUIhf5lc2cvWVns3f0DL81cIQ6CZDV5lcg+58N79z0dqUx6dGQfFKEbHBhxK/7h/fb3btAeq/a8008AWMZMTU4O8EfNl8DAKTPkNqn28R5w2WdMAAAAASUVORK5CYII="
                    />
                </g>
            </g>
        </svg>
    );
};

TelegraphGauge.displayName = 'TelegraphGauge';

export default TelegraphGauge;