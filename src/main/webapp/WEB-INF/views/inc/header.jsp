<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">홈</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/board/list">게시판</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/animation/1">애니메이션1</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/animation/2">애니메이션2</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/animation/3">애니메이션3</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/animation/4">애니메이션4</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/animation/5">애니메이션5</a>
                </li>
            </ul>

            <ul class="navbar-nav">
                <%-- 로그인 안 한 상태 --%>
                <sec:authorize access="isAnonymous()">
                    <li class="nav-item">
                        <a class="nav-link" href="/user/login">로그인</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/signup">회원가입</a>
                    </li>
                </sec:authorize>

                <%-- 로그인 한 상태 --%>
                <sec:authorize access="isAuthenticated()">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <sec:authentication property="name"/>님
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/logout">로그아웃</a></li>
                        </ul>
                    </li>
                </sec:authorize>
            </ul>
        </div>
    </div>
</nav>
