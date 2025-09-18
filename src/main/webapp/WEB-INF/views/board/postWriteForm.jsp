<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/board/postWrite.js" defer></script>
</head>
<body>
    <%@ include file="/WEB-INF/views/inc/header.jsp" %>
    <div class="container mt-4">

        <h2>글 작성</h2>

        <form method="post" id="postForm">
            <div class="mb-3">
                <label for="pstTtl" class="form-label">제목</label>
                <input type="text" class="form-control" id="pstTtl" name="pstTtl" required>
            </div>

            <div class="mb-3">
                <label for="pstCn" class="form-label">내용</label>
                <textarea class="form-control" id="pstCn" name="pstCn" rows="5" required></textarea>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="pblrNm" class="form-label">작성자</label>
                    <input type="text" class="form-control" id="pblrNm" name="pblrNm" required>
                </div>
                <div class="col">
                    <label for="pstPswd" class="form-label">패스워드</label>
                    <input type="password" class="form-control" id="pstPswd" name="pstPswd" required>
                </div>
            </div>

            <div class="d-flex justify-content-end mt-3">
                <button type="button" class="btn btn-secondary me-2" onclick="history.back()">취소</button>
                <button type="button" id="btnSubmit" class="btn btn-primary">작성 완료</button>
            </div>
        </form>
    </div>
    <%@ include file="/WEB-INF/views/inc/modalAlert.jsp" %>
</body>
</html>
