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

@Configuration
@MapperScan(
        basePackages = "com.seanet.demo.mappers.sub",
        sqlSessionFactoryRef = "subSqlSessionFactory",
        sqlSessionTemplateRef = "subSqlSessionTemplate"
)
public class SubDatabaseConfig {

    /**
     * sub 데이터베이스용 HikariCP 설정 Bean
     * application.properties의 'sub.datasource.hikari' 설정을 가져옵니다.
     */
    @Bean(name = "subHikariConfig")
    @ConfigurationProperties(prefix = "sub.datasource.hikari")
    public HikariConfig subHikariConfig() {
        return new HikariConfig();
    }

    /**
     * sub 데이터베이스용 DataSource Bean
     */
    @Bean(name = "subDataSource")
    public DataSource subDataSource() {
        return new HikariDataSource(subHikariConfig());
    }

    /**
     * sub 데이터베이스용 SqlSessionFactory Bean
     */
    @Bean(name = "subSqlSessionFactory")
    public SqlSessionFactory subSqlSessionFactory(@Qualifier("subDataSource") DataSource subDataSource,
                                                  ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(subDataSource);
        factoryBean.setMapperLocations(applicationContext.getResources("classpath*:mappers/sub/**/*.xml"));

        // Configuration 객체를 여기서 직접 생성하고 설정
        org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
        config.setMapUnderscoreToCamelCase(true); // 프로퍼티 설정을 코드로 직접 반영
        factoryBean.setConfiguration(config);

        return factoryBean.getObject();
    }

    /**
     * sub 데이터베이스용 SqlSessionTemplate Bean
     */
    @Bean(name = "subSqlSessionTemplate")
    public SqlSessionTemplate subSqlSessionTemplate(@Qualifier("subSqlSessionFactory") SqlSessionFactory subSqlSessionFactory) {
        return new SqlSessionTemplate(subSqlSessionFactory);
    }

}
