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
     * application.properties의 'main.datasource.hikari' 설정을 가져옵니다.
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
    @Bean(name = "mainSqlSessionFactory")
    public SqlSessionFactory mainSqlSessionFactory(@Qualifier("mainDataSource") DataSource mainDataSource,
                                                   ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(mainDataSource);
        factoryBean.setMapperLocations(applicationContext.getResources("classpath*:mappers/main/**/*.xml"));

        // Configuration 객체를 여기서 직접 생성하고 설정
        org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
        config.setMapUnderscoreToCamelCase(true); // 프로퍼티 설정을 코드로 직접 반영
        factoryBean.setConfiguration(config);

        return factoryBean.getObject();
    }

    /**
     * main 데이터베이스용 SqlSessionTemplate Bean
     */
    @Primary
    @Bean(name = "mainSqlSessionTemplate")
    public SqlSessionTemplate mainSqlSessionTemplate(@Qualifier("mainSqlSessionFactory") SqlSessionFactory mainSqlSessionFactory) {
        return new SqlSessionTemplate(mainSqlSessionFactory);
    }

}
