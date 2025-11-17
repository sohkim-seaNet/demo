package com.seanet.demo.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * Main 데이터베이스 JPA 설정
 */
@Configuration
@Primary
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.seanet.demo.repository.main",
        entityManagerFactoryRef = "mainEntityManagerFactory",
        transactionManagerRef = "mainTransactionManager"
)
public class MainDatabaseConfig {

    /**
     * main 데이터베이스용 HikariCP 설정 Bean
     * application.properties의 'main.datasource.hikari' 설정 가져옴
     */
    @Primary
    @Bean(name = "mainHikariConfig")
    @ConfigurationProperties(prefix = "main.datasource.hikari")
    public HikariConfig mainHikariConfig() {
        return new HikariConfig();
    }

    /**
     * main 데이터베이스용 DataSource Bean
     * 이 DataSource를 기본으로 사용하도록 @Primary 어노테이션을 추가합니다.
     */
    @Primary
    @Bean(name = "mainDataSource")
    public DataSource mainDataSource() {
        return new HikariDataSource(mainHikariConfig());
    }

    /**
     * main 데이터베이스용 SqlSessionFactory Bean
     */
    @Primary
    @Bean(name = "mainEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean mainEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("mainDataSource") DataSource mainDataSource) {

        Map<String, Object> properties = new HashMap<>();

        // Hibernate 설정
        properties.put("hibernate.hbm2ddl.auto", "none");  // validate, update, create, create-drop
        properties.put("hibernate.dialect", "org.hibernate.dialect.SQLServer2012Dialect");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");
        properties.put("hibernate.use_sql_comments", "true");

        // 네이밍 전략 (컬럼명 매핑 방식)
        properties.put("hibernate.physical_naming_strategy",
                "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");

        // 배치 처리 최적화
        properties.put("hibernate.jdbc.batch_size", "20");
        properties.put("hibernate.order_inserts", "true");
        properties.put("hibernate.order_updates", "true");

        return builder
                .dataSource(mainDataSource)
                .packages("com.seanet.demo.domain")  // Entity 패키지
                .persistenceUnit("main")
                .properties(properties)
                .build();
    }

    /**
     * main 데이터베이스용 TransactionManager Bean
     */
    @Primary
    @Bean(name = "mainTransactionManager")
    public PlatformTransactionManager mainTransactionManager(
            @Qualifier("mainEntityManagerFactory") EntityManagerFactory mainEntityManagerFactory) {
        return new JpaTransactionManager(mainEntityManagerFactory);
    }
}
