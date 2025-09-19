package com.seanet.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 사용자(User) 정보를 담는 Value Object (VO)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVO {

    private String userId;              // 사용자ID
    private String userPwd;             // 사용자비밀번호
    private String userNm;              // 사용자명
    private String nickname;            // 닉네임
    private LocalDateTime regDt;        // 등록일시
    private String delYn;               // 삭제여부

}
