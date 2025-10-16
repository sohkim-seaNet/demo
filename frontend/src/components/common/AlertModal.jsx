/**
 * AlertModal.jsx - 전역 알림/확인 모달
 */
import React, { useState, useEffect, useRef } from 'react';

// 전역 변수 선언
let showAlertFunction;
let showConfirmFunction;

function AlertModal() {

    // [상태 관리] 모달의 표시 여부 및 내용
    const [isOpen, setIsOpen] = useState(false);        // 모달 열림/닫힘 상태
    const [title, setTitle] = useState('알림');           // 모달 제옥
    const [message, setMessage] = useState('');          // 모달 내용
    const [type, setType] = useState('alert');           // 모달 타입: 'alert' 또는 'confirm'
    const [callback, setCallback] = useState(null);             // 확인 버튼 클릭 시 실행할 콜백
    const [cancelCallback, setCancelCallback] = useState(null); // 취소 버튼 클릭 시 실행할 콜백

    // [useRef] DOM 요소와 Bootstrap Modal 인스턴스를 저장
    // - 리렌더링되어도 값이 유지됨
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        // Bootstrap Modal 인스턴스 생성
        if (modalRef.current) {
            modalInstance.current = new window.bootstrap.Modal(modalRef.current);
        }

        // 전역 함수 등록 : showAlertFunction
        showAlertFunction = (msg, ttl = '알림', cb = null) => {
            setMessage(msg);
            setTitle(ttl);
            setType('alert');
            setCallback(() => cb);
            setIsOpen(true);
        };

        // 전역 함수 등록 : showConfirmFunction
        showConfirmFunction = (msg, ttl = '확인', okCb = null, cancelCb = null) => {
            setMessage(msg);
            setTitle(ttl);
            setType('confirm');
            setCallback(() => okCb);
            setCancelCallback(() => cancelCb);
            setIsOpen(true);
        };

        // [cleanup] 컴포넌트가 언마운트될 때 Bootstrap Modal 정리
        return () => {
            if (modalInstance.current) {
                modalInstance.current.dispose();
            }
        };
    }, []);

    // [useEffect - 모달 표시] isOpen 상태가 변경될 때마다 실행
    useEffect(() => {
        if (isOpen && modalInstance.current) {
            modalInstance.current.show();
        }
    }, [isOpen]);

    // [이벤트 핸들러] 확인 버튼 클릭
    const handleOk = () => {
        modalInstance.current.hide();

        const handleHidden = () => {
            modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
            setIsOpen(false);
            if (callback) callback();
        };

        modalRef.current.addEventListener('hidden.bs.modal', handleHidden);
    };

    // [이벤트 핸들러] 취소 버튼 클릭
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
                    {/* 모달 헤더 */}
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="닫기" />
                    </div>
                    {/* 모달 내용 */}
                    <div className="modal-body">{message}</div>
                    {/* 모달 푸터 - 타입에 따라 버튼 구성 변경 */}
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

/**
 * 전역 함수 export
 * - 다른 컴포넌트에서 import하여 사용
 */

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