document.getElementById('btnSubmit').addEventListener('click', () => {

    const title = document.getElementById('pstTtl').value.trim();
    const content = document.getElementById('pstCn').value.trim();
    const writer = document.getElementById('pblrNm').value.trim();
    const password = document.getElementById('pstPswd').value.trim();

    if (!title) {
        showAlert('제목을 입력해주세요.');
        return;
    }
    if (!content) {
        showAlert('내용을 입력해주세요.');
        return;
    }
    if (!writer) {
        showAlert('작성자를 입력해주세요.');
        return;
    }
    if (!password) {
        showAlert('비밀번호를 입력해주세요.');
        return;
    }

    const data = {
        pstTtl: title,
        pstCn: content,
        pblrNm: writer,
        pstPswd: password
    };

    fetch('/api/post/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 201) {
                showAlert('글 작성이 완료되었습니다.', 'Success', () => {
                    window.location.href = '/post'; // 글 목록 페이지 이동
                });
            } else {
                throw new Error('글 작성에 실패했습니다.');
            }
        })
        .catch(err => alert(err.message));
});
