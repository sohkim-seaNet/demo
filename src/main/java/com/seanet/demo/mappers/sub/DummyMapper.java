package com.seanet.demo.mappers.sub;

import org.apache.ibatis.annotations.Mapper;

/**
 * smartship_db 데이터 액세스 담당
 * MyBatis Mapper 인터페이스
 */
@Mapper
public interface DummyMapper {

    /**
     * TB_Telegraph에서 가장 최근에 저장된 _order 값 조회
     * @return Integer _order
     */
    Integer findLatestTelegraphOrder();

}
