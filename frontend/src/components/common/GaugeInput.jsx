import React from 'react';

function GaugeInput({ value, onChange, onSubmit, min, max, step = "1" }) {

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="input-group justify-content-center" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input
                type="number"
                className="form-control"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                onKeyUp={handleKeyUp}
            />
            <button
                className="btn btn-primary"
                onClick={onSubmit}
            >
                적용
            </button>
        </div>
    );
}

export default GaugeInput;