// src/components/common/AlertModal.jsx
import React, { useState, useEffect, useRef } from 'react';

let showAlertFunction;
let showConfirmFunction;

function AlertModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('알림');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('alert');
    const [callback, setCallback] = useState(null);
    const [cancelCallback, setCancelCallback] = useState(null);

    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        // Bootstrap Modal 인스턴스 생성
        if (modalRef.current) {
            modalInstance.current = new window.bootstrap.Modal(modalRef.current);
        }

        // 전역 함수 등록
        showAlertFunction = (msg, ttl = '알림', cb = null) => {
            setMessage(msg);
            setTitle(ttl);
            setType('alert');
            setCallback(() => cb);
            setIsOpen(true);
        };

        showConfirmFunction = (msg, ttl = '확인', okCb = null, cancelCb = null) => {
            setMessage(msg);
            setTitle(ttl);
            setType('confirm');
            setCallback(() => okCb);
            setCancelCallback(() => cancelCb);
            setIsOpen(true);
        };

        return () => {
            if (modalInstance.current) {
                modalInstance.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (isOpen && modalInstance.current) {
            modalInstance.current.show();
        }
    }, [isOpen]);

    const handleOk = () => {
        modalInstance.current.hide();

        const handleHidden = () => {
            modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
            setIsOpen(false);
            if (callback) callback();
        };

        modalRef.current.addEventListener('hidden.bs.modal', handleHidden);
    };

    const handleCancel = () => {
        modalInstance.current.hide();

        const handleHidden = () => {
            modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
            setIsOpen(false);
            if (cancelCallback) cancelCallback();
        };

        modalRef.current.addEventListener('hidden.bs.modal', handleHidden);
    };

    return (
        <div className="modal fade" id="alertModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="닫기" />
                    </div>
                    <div className="modal-body">{message}</div>
                    <div className="modal-footer">
                        {type === 'alert' ? (
                            <button type="button" className="btn btn-primary" onClick={handleOk}>
                                확인
                            </button>
                        ) : (
                            <>
                                <button type="button" className="btn btn-primary" onClick={handleOk}>
                                    확인
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                    취소
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// 전역 함수 export
export const showAlert = (message, title = '알림', callback) => {
    if (showAlertFunction) {
        showAlertFunction(message, title, callback);
    }
};

export const showConfirm = (message, title = '확인', okCallback, cancelCallback) => {
    if (showConfirmFunction) {
        showConfirmFunction(message, title, okCallback, cancelCallback);
    }
};

export default AlertModal;