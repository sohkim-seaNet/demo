<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8" />
    <title>게시글 상세조회</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/postDelete.js"></script>
    <script src="/js/postDetail.js"></script>
</head>
<body class="bg-light">
    <div class="container mt-5">

        <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
                <h3 id="pstTtl">글 제목</h3>
            </div>
            <div class="card-body">
                <p id="pstCn" class="mb-4" style="white-space: pre-wrap;">글 내용이 여기에 표시됩니다.</p>
                <div class="mb-3 text-muted">
                    <span>작성자: <strong id="pblrNm"></strong></span> |
                    <span>작성일: <strong id="regDt"></strong></span>
                </div>
                <div class="d-flex gap-2 justify-content-end">
                    <a href="/post" class="btn btn-outline-secondary">글목록</a>
                    <a href="#" id="btnEdit" class="btn btn-outline-primary">수정</a>
                    <button id="btnDelete" class="btn btn-outline-danger">삭제</button>
                </div>
            </div>
        </div>
    </div>

    <%-- 비밀번호 입력 modal --%>
    <div class="modal fade" id="passwordInputModal" tabindex="-1" aria-hidden="true" aria-labelledby="passwordInputModalLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="passwordInputModalLabel">비밀번호 입력</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
                </div>
                <div class="modal-body">
                    <input type="password" id="inputPassword" class="form-control" placeholder="비밀번호를 입력하세요" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                    <button type="button" id="passwordSubmitBtn" class="btn btn-primary">확인</button>
                </div>
            </div>
        </div>
    </div>
    <%@ include file="/WEB-INF/views/inc/modalAlert.jsp" %>
</body>
</html>
