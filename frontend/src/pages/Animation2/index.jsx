// src/pages/Animation2/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import ThrusterGauge from '../../components/svg/ThrusterGauge';
import './style.css';

// 설정 상수
const DEFAULT_CONFIG = {
    minValue: 0,
    maxValue: 800,
    minAngle: -90,
    maxAngle: 90
};

const API_ENDPOINT = '/api/animation/THRUSTER_GAUGE';

function Animation2() {

    const [inputValue, setInputValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [gaugeConfig, setGaugeConfig] = useState(null);
    const needleRef = useRef(null);

    /**
     * 페이지 로드 시 게이지 설정 로드
     */
    useEffect(() => {
        const initGauge = async () => {
            const config = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);
            setGaugeConfig(config);
            setCurrentValue(config.minValue); // 초기값 설정
            console.log('[Thruster] 게이지 초기화 완료');
        };

        initGauge();
    }, []);

    /**
     * 각도가 변경될 때마다 바늘 회전
     */
    useEffect(() => {
        if (gaugeConfig && needleRef.current) {
            const angle = valueToAngle(currentValue, gaugeConfig);
            needleRef.current.style.transform = `rotate(${angle}deg)`;
            needleRef.current.style.transformOrigin = '299.14px 261.73px';
        }
    }, [currentValue, gaugeConfig]);

    /**
     * 값 적용 버튼 클릭
     */
    const handleSubmit = () => {
        const value = parseFloat(inputValue) || 0;
        setCurrentValue(value);
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
            <div className="d-flex justify-content-end mb-3">
                <Link to="/board/list" className="btn btn-outline-info btn-sm">
                    게시판으로
                </Link>
            </div>

            <div className="controls">
                <input
                    type="number"
                    min="0"
                    max="800"
                    placeholder="0 ~ 800"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button onClick={handleSubmit}>적용</button>
            </div>
            <ThrusterGauge needleRef={needleRef} />
        </div>
    );
}

export default Animation2;