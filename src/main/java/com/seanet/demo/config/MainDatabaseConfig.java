package com.seanet.demo.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

/**
 * Main 데이터베이스 연결 설정 클래스
 *
 * 연결 정보:
 * - 데이터베이스: SQL Server (localhost:1433)
 * - 스키마명: demo
 */
@Configuration
@Primary
@MapperScan(
        basePackages = "com.seanet.demo.mappers.main",
        sqlSessionFactoryRef = "mainSqlSessionFactory",
        sqlSessionTemplateRef = "mainSqlSessionTemplate"
)
public class MainDatabaseConfig {

    /**
     * main 데이터베이스용 HikariCP 설정 Bean
     * application.properties의 'main.datasource.hikari' 속성을 자동으로 바인딩
     */
    @Primary
    @Bean(name = "mainHikariConfig")
    @ConfigurationProperties(prefix = "main.datasource.hikari")
    public HikariConfig mainHikariConfig() {
        return new HikariConfig();
    }

    /**
     * main 데이터베이스용 DataSource Bean 생성
     * 이 DataSource를 기본으로 사용하도록 @Primary 어노테이션을 추가합니다.
     */
    @Primary
    @Bean(name = "mainDataSource")
    public DataSource mainDataSource() {
        return new HikariDataSource(mainHikariConfig());
    }

    /**
     * main 데이터베이스용 SqlSessionFactory Bean 생성
     * MyBatis와 Main DB를 연결하고 SQL 매퍼 파일을 로드
     */
    @Primary
    @Bean(name = "mainSqlSessionFactory")
    public SqlSessionFactory mainSqlSessionFactory(@Qualifier("mainDataSource") DataSource mainDataSource,
                                                   ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        // 1. Main 데이터소스 설정
        factoryBean.setDataSource(mainDataSource);
        // 2. MyBatis Mapper XML 파일 위치 지정
        factoryBean.setMapperLocations(applicationContext.getResources("classpath*:mappers/main/**/*.xml"));

        // 3. MyBatis Configuration 설정
        org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
        config.setMapUnderscoreToCamelCase(true);
        factoryBean.setConfiguration(config);

        return factoryBean.getObject();
    }

    /**
     * main 데이터베이스용 SqlSessionTemplate Bean 생성
     * MyBatis SQL 실행을 위한 템플릿 객체
     */
    @Primary
    @Bean(name = "mainSqlSessionTemplate")
    public SqlSessionTemplate mainSqlSessionTemplate(@Qualifier("mainSqlSessionFactory") SqlSessionFactory mainSqlSessionFactory) {
        return new SqlSessionTemplate(mainSqlSessionFactory);
    }

}
