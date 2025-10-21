import React, { useState, useEffect, useRef } from 'react';
import { loadGaugeConfig, valueToAngle } from '../../utils/gaugeUtils';
import WindIndicator from '../../components/svg/WindIndicator';

// 설정 상수
const DEFAULT_CONFIG = {
    minValue: 0,
    maxValue: 360,
    minAngle: 0,
    maxAngle: 360
};

const API_ENDPOINT = '/api/animation/WIND_INDICATOR';

function Animation4() {
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
            setCurrentValue(config.minValue); // 초기값 설정 (0도, 북쪽)
            console.log('[True Wind] 게이지 초기화 완료');
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
            needleRef.current.style.transformOrigin = '184.59px 223.09px';
        }
    }, [currentValue, gaugeConfig]);

    /**
     * 값 적용 버튼 클릭
     */
    const handleSubmit = () => {
        const value = parseFloat(inputValue) || 0;
        // 0-360 범위 제한
        const clampedValue = Math.max(0, Math.min(360, value));
        setCurrentValue(clampedValue);
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
            <WindIndicator needleRef={needleRef} currentValue={currentValue} />

            <div className="row mt-3">
                <div className="col-md-4 mx-auto">
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="360"
                            step="1"
                            placeholder="0-360"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyUp={handleKeyUp}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            적용
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Animation4;
