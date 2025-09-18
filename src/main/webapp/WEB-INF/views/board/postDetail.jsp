<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8" />
    <title>게시글 상세조회</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/board/postDetail.js"></script>
    <script src="/js/board/postDelete.js"></script>
</head>
<body class="bg-light">
    <%@ include file="/WEB-INF/views/inc/header.jsp" %>

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
                    <a href="/board/list" class="btn btn-outline-secondary">글목록</a>
                    <!-- 권한 체크 후 표시할 버튼들 -->
                    <div id="authorButtons" style="display: none;">
                        <a href="#" id="btnEdit" class="btn btn-outline-primary">수정</a>
                        <button id="btnDelete" class="btn btn-outline-danger">삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%@ include file="/WEB-INF/views/inc/modalAlert.jsp" %>
</body>
</html>
