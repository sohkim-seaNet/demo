<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/postList.js" defer></script>
</head>
<body>
    <div class="container mt-4">

        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>게시판 목록</h2>
        </div>

        <div class="d-flex justify-content-end mb-3">
            <div class="input-group" style="width: auto; max-width: 400px;">
                <select class="form-select" id="searchType" style="flex: 0 0 120px;">
                    <option value="title" selected>제목</option>
                    <option value="titleContent">제목+내용</option>
                    <option value="writer">작성자</option>
                </select>
                <input type="text" id="searchKeyword" class="form-control" placeholder="검색어를 입력하세요">
                <button id="btnSearch" class="btn btn-primary">검색</button>
            </div>
        </div>

        dd


        <table class="table table-striped">
            <thead class="table-light">
            <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">등록일</th>
            </tr>
            </thead>
            <tbody id="postsList">
            </tbody>
        </table>

        <div class="d-flex justify-content-end mt-3 mb-5">
            <a href="/post/write" class="btn btn-primary">글 작성</a>
        </div>

        <%-- 페이징 --%>
        <div class="d-flex justify-content-center">
            <ul class="pagination">
                <li class="page-item disabled">
                    <a class="page-link" href="#">&laquo;</a>
                </li>
                <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">4</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">5</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                </li>
            </ul>
        </div>
    </div>
    <%@ include file="/WEB-INF/views/inc/modalAlert.jsp" %>
</body>
</html>
