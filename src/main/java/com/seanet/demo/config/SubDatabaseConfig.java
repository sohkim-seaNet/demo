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

import javax.sql.DataSource;

/**
 * Sub 데이터베이스 연결 설정 클래스
 *
 * 연결 정보:
 * - 데이터베이스: SQL Server (192.168.7.123:10000)
 * - 스키마명: smartship_db
 */
@Configuration
@MapperScan(
        basePackages = "com.seanet.demo.mappers.sub",
        sqlSessionFactoryRef = "subSqlSessionFactory",
        sqlSessionTemplateRef = "subSqlSessionTemplate"
)
public class SubDatabaseConfig {

    /**
     * Sub 데이터베이스용 HikariCP 설정 Bean 생성
     * application.properties의 'sub.datasource.hikari' 속성을 자동으로 바인딩
     */
    @Bean(name = "subHikariConfig")
    @ConfigurationProperties(prefix = "sub.datasource.hikari")
    public HikariConfig subHikariConfig() {
        return new HikariConfig();
    }

    /**
     * sub 데이터베이스용 DataSource Bean 생성
     */
    @Bean(name = "subDataSource")
    public DataSource subDataSource() {
        return new HikariDataSource(subHikariConfig());
    }

    /**
     * sub 데이터베이스용 SqlSessionFactory Bean 생성
     */
    @Bean(name = "subSqlSessionFactory")
    public SqlSessionFactory subSqlSessionFactory(@Qualifier("subDataSource") DataSource subDataSource,
                                                  ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        // 1. Sub 데이터소스 설정 (192.168.7.123:10000/smartship_db)
        factoryBean.setDataSource(subDataSource);
        // 2. MyBatis Mapper XML 파일 위치 지정
        factoryBean.setMapperLocations(applicationContext.getResources("classpath*:mappers/sub/**/*.xml"));

        // 3. MyBatis Configuration 설정
        org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
        config.setMapUnderscoreToCamelCase(true); // 프로퍼티 설정을 코드로 직접 반영
        factoryBean.setConfiguration(config);

        return factoryBean.getObject();
    }

    /**
     * sub 데이터베이스용 SqlSessionTemplate Bean 생성
     * MyBatis SQL 실행을 위한 템플릿 객체
     */
    @Bean(name = "subSqlSessionTemplate")
    public SqlSessionTemplate subSqlSessionTemplate(@Qualifier("subSqlSessionFactory") SqlSessionFactory subSqlSessionFactory) {
        return new SqlSessionTemplate(subSqlSessionFactory);
    }

}
