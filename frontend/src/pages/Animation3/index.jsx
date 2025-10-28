import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import GyroGauge from '../../components/svg/GyroGauge';
import './style.css';
import GaugeInput from "../../components/common/GaugeInput.jsx";

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

    return (
        <div className="container mt-5">
            <GyroGauge
                rotationAngle={getRotationAngle()}
                displayAngle={gaugeConfig ? valueToAngle(currentValue, gaugeConfig).toFixed(2) : '0.00'}
            />

            <div className="text-center mt-3">
                <GaugeInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSubmit={handleSubmit}
                    min={0}
                    max={360}
                />
            </div>
        </div>
    );
}

export default Animation3;