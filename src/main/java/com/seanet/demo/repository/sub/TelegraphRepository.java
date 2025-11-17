package com.seanet.demo.repository.sub;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;

/**
 * Telegraph 데이터 액세스 (Sub DB)
 * 엔티티 없이 Native Query만 사용
 */
@Repository
public class TelegraphRepository {

    private final EntityManager entityManager;

    // Sub DB의 EntityManager 주입
    public TelegraphRepository(@Qualifier("subEntityManagerFactory") EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * 최신 _order 값 조회 (Native Query)
     * @return 가장 최근의 order 값
     */
    public Integer findLatestOrder() {
        Query query = entityManager.createNativeQuery(
                "SELECT TOP 1 _order FROM TB_Telegraph ORDER BY SaveTime DESC"
        );
        Object result = query.getSingleResult();
        return result != null ? ((Number) result).intValue() : null;
    }
}
