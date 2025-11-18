import React, { useState, useEffect, useRef } from 'react';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import ThrusterGauge from '../../components/svg/ThrusterGauge';
import GaugeInput from "../../components/common/GaugeInput.jsx";
import './style.css';

const DEFAULT_CONFIG = {
    minValue: 0,
    maxValue: 800,
    minAngle: -90,
    maxAngle: 90
};

const API_ENDPOINT = '/api/animation/THRUSTER_GAUGE';

function Animation2() {

    // (1) DB에서 가져온 초기값
    const [dbConfig, setDbConfig] = useState(null);

    // (2) 사용자가 입력하는 임시값
    const [customMinValue, setCustomMinValue] = useState('');
    const [customMaxValue, setCustomMaxValue] = useState('');

    // (3) 실제로 사용되는 최종값
    const [activeConfig, setActiveConfig] = useState(null);

    // 게이지 바늘 값
    const [inputValue, setInputValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const needleRef = useRef(null);

    // 1. 초기 로드: DB 설정 가져오기
    useEffect(() => {
        const initGauge = async () => {
            const config = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);
            setDbConfig(config);
            setActiveConfig(config);
            setCurrentValue(config.minValue);
            console.log('[Thruster] 게이지 초기화 완료:', config);
        };
        initGauge();
    }, []);

    // 2. 바늘 회전 (activeConfig 변경 시 재계산)
    useEffect(() => {
        if (activeConfig && needleRef.current) {
            const angle = valueToAngle(currentValue, activeConfig);
            needleRef.current.style.transform = `rotate(${angle}deg)`;
            needleRef.current.style.transformOrigin = '299.14px 261.73px';
            needleRef.current.style.transition = 'transform 0.5s ease-out';
        }
    }, [currentValue, activeConfig]);

    // 3. 사용자가 범위를 변경
    const handleRangeUpdate = () => {
        const newMin = parseFloat(customMinValue);
        const newMax = parseFloat(customMaxValue);

        if (isNaN(newMin) || isNaN(newMax)) {
            alert('올바른 숫자를 입력하세요');
            return;
        }

        if (newMin >= newMax) {
            alert('최소값은 최대값보다 작아야 합니다');
            return;
        }

        const newConfig = {
            ...activeConfig,    // 기존 객체 복사
            minValue: newMin,
            maxValue: newMax
        };
        setActiveConfig(newConfig);

        setInputValue('');
        setCurrentValue(newMin);  // 새 범위의 최소값으로 이동

        console.log('[Thruster] 범위 업데이트:', newConfig);
    };

    // 4. DB 기본값으로 리셋
    const resetToDbConfig = () => {
        setActiveConfig(dbConfig);
        setCustomMinValue('');
        setCustomMaxValue('');
        setCurrentValue(dbConfig.minValue);

        setInputValue('');
        setCurrentValue(dbConfig.minValue);

        console.log('[Thruster] DB 기본값으로 리셋');
    };

    // 5. 바늘 값 적용
    const handleSubmit = () => {
        const value = parseFloat(inputValue) || 0;
        setCurrentValue(value);
    };

    if (!activeConfig) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {/* 범위 설정 UI */}
            <div className="range-controls mb-3">
                <h5>게이지 범위 설정</h5>
                <div className="d-flex gap-2 mb-2">
                    <input
                        type="number"
                        className="form-control"
                        value={customMinValue}
                        onChange={(e) => setCustomMinValue(e.target.value)}
                        placeholder={`최소값 (현재: ${activeConfig.minValue})`}
                    />
                    <input
                        type="number"
                        className="form-control"
                        value={customMaxValue}
                        onChange={(e) => setCustomMaxValue(e.target.value)}
                        placeholder={`최대값 (현재: ${activeConfig.maxValue})`}
                    />
                    <button className="btn btn-primary" onClick={handleRangeUpdate}>
                        범위 적용
                    </button>
                    <button className="btn btn-secondary" onClick={resetToDbConfig}>
                        리셋
                    </button>
                </div>
                <small className="text-muted">
                    현재 범위: {activeConfig.minValue} ~ {activeConfig.maxValue}
                </small>
            </div>

            {/* 게이지 SVG */}
            <ThrusterGauge
                needleRef={needleRef}
                minValue={activeConfig.minValue}
                maxValue={activeConfig.maxValue}
            />

            {/* 바늘 값 입력 */}
            <div className="controls">
                <GaugeInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSubmit={handleSubmit}
                    min={activeConfig.minValue}
                    max={activeConfig.maxValue}
                />
            </div>
        </div>
    );
}

export default Animation2;
