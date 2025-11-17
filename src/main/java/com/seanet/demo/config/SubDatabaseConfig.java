package com.seanet.demo.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.seanet.demo.repository.sub",
        entityManagerFactoryRef = "subEntityManagerFactory",
        transactionManagerRef = "subTransactionManager"
)
public class SubDatabaseConfig {

    /**
     * sub 데이터베이스용 HikariCP 설정 Bean
     * application.properties의 'sub.datasource.hikari' 설정 가져옴
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
    @Bean(name = "subEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean subEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("subDataSource") DataSource subDataSource) {

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "none");
        properties.put("hibernate.dialect", "org.hibernate.dialect.SQLServer2012Dialect");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");

        return builder
                .dataSource(subDataSource)
                .packages("com.seanet.demo.repository.sub")  // 엔티티 없어도 Repository 패키지는 필요
                .persistenceUnit("sub")
                .properties(properties)
                .build();
    }

    @Bean(name = "subTransactionManager")
    public PlatformTransactionManager subTransactionManager(
            @Qualifier("subEntityManagerFactory") EntityManagerFactory subEntityManagerFactory) {
        return new JpaTransactionManager(subEntityManagerFactory);
    }
}
