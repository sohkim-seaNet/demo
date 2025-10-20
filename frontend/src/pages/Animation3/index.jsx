// src/pages/Animation3/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import GyroGauge from '../../components/svg/GyroGauge';
import './style.css';

const DEFAULT_CONFIG = {
    minValue: 0,
    maxValue: 360,
    minAngle: 0,
    maxAngle: 360
};
const API_ENDPOINT = '/api/animation/GYRO';

function Animation3() {
    const [inputValue, setInputValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [gaugeConfig, setGaugeConfig] = useState(null);

    /**
     * 페이지 로드 시 게이지 설정 로드
     */
    useEffect(() => {
        const initGauge = async () => {
            const config = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);
            setGaugeConfig(config);
            setCurrentValue(config.minValue); // 초기값 0
            console.log('[Gyro] 게이지 초기화 완료');
        };

        initGauge();
    }, []);

    /**
     * 회전 각도 계산
     */
    const getRotationAngle = () => {
        if (!gaugeConfig) return 0;
        const angle = valueToAngle(currentValue, gaugeConfig);
        return -angle; // 시계 반대 방향
    };

    /**
     * 각도 적용 버튼 클릭
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

            <GyroGauge
                rotationAngle={getRotationAngle()}
                displayAngle={gaugeConfig ? valueToAngle(currentValue, gaugeConfig).toFixed(2) : '0.00'}
            />

            <div className="text-center mt-3">
                <div className="input-group justify-content-center" style={{ maxWidth: '300px', margin: '0 auto' }}>
                    <input
                        type="number"
                        id="angleInput"
                        className="form-control"
                        placeholder="각도 입력 (0-360)"
                        min="0"
                        max="360"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                    <button
                        id="rotateBtn"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Animation3;