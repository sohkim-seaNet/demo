import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import './style.css';

// 설정 상수
const DEFAULT_CONFIG = {
    minValue: -40,
    maxValue: 40,
    minAngle: -120,
    maxAngle: 120
};

const API_ENDPOINT = '/api/animation/DEG_PITCH';

function Animation1() {

    const [angleInput, setAngleInput] = useState('');
    const [currentAngle, setCurrentAngle] = useState(0);
    const [gaugeConfig, setGaugeConfig] = useState(null);
    const needleRef = useRef(null);

    /**
     * 페이지 로드 시 게이지 설정 로드
     */
    useEffect(() => {
        const initGauge = async () => {
            const config = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);
            setGaugeConfig(config);
            console.log('[Pitch] 게이지 초기화 완료');
        };

        initGauge();
    }, []);

    /**
     * 각도가 변경될 때마다 바늘 회전
     */
    useEffect(() => {
        if (gaugeConfig && needleRef.current) {
            const angle = valueToAngle(currentAngle, gaugeConfig);
            needleRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
        }
    }, [currentAngle, gaugeConfig]);

    /**
     * 각도 적용 버튼 클릭
     */
    const handleSubmit = () => {
        const value = parseFloat(angleInput) || 0;
        setCurrentAngle(value);
    };

    /**
     * Enter 키 입력
     */
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="gauge-container">
                {/* 게이지 이미지 */}
                <img
                    src="/img/Deg_pitch.png"
                    alt="게이지 배경"
                    className="gauge-background"
                />

                {/* 바늘 이미지 */}
                <img
                    src="/img/bow.png"
                    alt="게이지 바늘"
                    className="gauge-needle"
                    ref={needleRef}
                />
            </div>

            {/* 컨트롤러 UI */}
            <div className="controller">
                <input
                    type="number"
                    placeholder="각도 입력 (예: -40 ~ 40)"
                    value={angleInput}
                    onChange={(e) => setAngleInput(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button onClick={handleSubmit}>적용</button>
            </div>
        </div>
    );
}

export default Animation1;